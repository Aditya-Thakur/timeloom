// imageUtils.ts - Enhanced for mobile sharing
import html2canvas from 'html2canvas';

/**
 * Generates an image from a React ref with robust error handling and mobile optimization
 * @param ref - React ref to the element to convert to image
 * @param setIsGenerating - Optional state setter to track generation status
 * @returns Promise with the image URL or null
 */
export const generateImageFromRef = async (
  ref: React.RefObject<HTMLDivElement | null>,
  setIsGenerating?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string | null> => {
  if (!ref.current) return null;
  
  if (setIsGenerating) setIsGenerating(true);
  
  try {
    // Give time for all content to fully render and styles to apply
    // Add more wait time on mobile devices
    const isMobile = window.innerWidth < 768;
    await new Promise(resolve => setTimeout(resolve, isMobile ? 1000 : 800));
    
    // Detect if we need high-DPI rendering
    const pixelRatio = window.devicePixelRatio || 1;
    const scale = Math.min(pixelRatio * 1.5, 3); // Cap at 3x for performance reasons
    
    // Approach 1: Direct capture with optimized settings
    const canvas = await html2canvas(ref.current, {
      scale: scale, // Higher quality based on device
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      // Important optimization - don't try to render iframes
      ignoreElements: (element) => {
        return element.tagName === 'IFRAME' || 
               element.classList.contains('no-export');
      },
      // For mobile, reduce size to improve performance
      width: isMobile ? ref.current.offsetWidth * 0.9 : ref.current.offsetWidth,
      height: isMobile ? ref.current.offsetHeight * 0.9 : ref.current.offsetHeight,
      // Critical for SVG rendering
      onclone: (elementClone) => {
        // Fix SVGs by ensuring they have explicit dimensions
        const svgs = elementClone.querySelectorAll('svg');
        svgs.forEach(svg => {
          if (!svg.getAttribute('width')) {
            svg.setAttribute('width', '40');
          }
          if (!svg.getAttribute('height')) {
            svg.setAttribute('height', '40');
          }
          
          // Ensure all paths and elements in SVGs have their styles inline
          const svgElements = svg.querySelectorAll('*');
          svgElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            
            // Copy critical SVG styling properties
            if (computedStyle.fill && el.getAttribute('fill') !== computedStyle.fill) {
              el.setAttribute('fill', computedStyle.fill);
            }
            if (computedStyle.stroke && el.getAttribute('stroke') !== computedStyle.stroke) {
              el.setAttribute('stroke', computedStyle.stroke);
            }
            if (computedStyle.strokeWidth && el.getAttribute('stroke-width') !== computedStyle.strokeWidth) {
              el.setAttribute('stroke-width', computedStyle.strokeWidth);
            }
          });
        });
        
        // Fix Tailwind-style gradient backgrounds that might not be captured correctly
        const elementsWithBg = elementClone.querySelectorAll('[class*="bg-"]');
        elementsWithBg.forEach(el => {
          const htmlEl = el as HTMLElement;
          const computedStyle = window.getComputedStyle(htmlEl);
          
          // Set explicit background color if it's using a gradient or not set directly
          if (computedStyle.backgroundImage !== 'none' && !htmlEl.style.backgroundImage) {
            htmlEl.style.backgroundImage = computedStyle.backgroundImage;
          }
          if (computedStyle.backgroundColor && !htmlEl.style.backgroundColor) {
            htmlEl.style.backgroundColor = computedStyle.backgroundColor;
          }
        });
        
        // Set all text elements to have better rendering
        const textElements = elementClone.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        textElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          // Add a slight shadow to text for better readability on mobile
          if (!htmlEl.style.textShadow) {
            htmlEl.style.textRendering = 'optimizeLegibility';
          }
        });
      }
    });
    
    // Optimize image quality for mobile sharing
    let imageUrl: string;
    
    // On mobile, use JPEG for better performance, PNG for desktop
    const isMobileDevice = window.innerWidth < 768;
    if (isMobileDevice) {
      imageUrl = canvas.toDataURL('image/jpeg', 0.95); // High quality JPEG for mobile
    } else {
      imageUrl = canvas.toDataURL('image/png'); // PNG for desktop
    }
    
    // Validate that we got a real image (not blank)
    if (imageUrl === 'data:,' || imageUrl === 'data:image/png;base64,' || imageUrl === 'data:image/jpeg;base64,') {
      throw new Error('Generated image is blank');
    }
    
    if (setIsGenerating) setIsGenerating(false);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image (primary method):', error);
    
    // Mobile-optimized fallback method
    try {
      console.log('Attempting fallback capture method...');
      
      // Create an invisible clone of the element
      const original = ref.current;
      const clone = original.cloneNode(true) as HTMLElement;
      
      // Ensure the clone has the same styling applied
      const originalStyle = window.getComputedStyle(original);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = originalStyle.width;
      clone.style.height = originalStyle.height;
      clone.style.backgroundColor = originalStyle.backgroundColor;
      clone.style.padding = originalStyle.padding;
      clone.style.margin = '0';
      clone.style.border = originalStyle.border;
      clone.style.borderRadius = originalStyle.borderRadius;
      clone.style.transform = 'none'; // Reset any transforms
      clone.style.filter = 'none'; // Reset any filters
      
      // Append to body, capture, then remove
      document.body.appendChild(clone);
      
      // Give browser time to paint the clone - longer for mobile
      const isMobile = window.innerWidth < 768;
      await new Promise(resolve => setTimeout(resolve, isMobile ? 800 : 500));
      
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: true, // Enable logging for debugging
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });
      
      // Remove the clone from DOM
      document.body.removeChild(clone);
      
      // Choose format based on device
      let imageUrl: string;
      if (isMobile) {
        imageUrl = canvas.toDataURL('image/jpeg', 0.9);
      } else {
        imageUrl = canvas.toDataURL('image/png');
      }
      
      if (setIsGenerating) setIsGenerating(false);
      return imageUrl;
    } catch (fallbackError) {
      console.error('Fallback capture also failed:', fallbackError);
      
      // Return null and let the UI handle the error
      if (setIsGenerating) setIsGenerating(false);
      return null;
    }
  }
};

/**
 * Downloads an image from a URL with mobile-friendly handling
 * @param imageUrl - URL of the image to download
 * @param filename - Filename for the downloaded image
 * @returns Boolean indicating success
 */
export const downloadImage = (imageUrl: string, filename: string): boolean => {
  if (!imageUrl || imageUrl === 'data:,' || imageUrl.length < 100) {
    console.error('Invalid image URL for download:', imageUrl);
    return false;
  }

  try {
    // For mobile devices, use a different approach to download
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile, open the image in a new tab which shows browser's native save options
      const tab = window.open();
      if (tab) {
        tab.document.write(`
          <html>
            <head>
              <title>Save Image - TimeLoom</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; background: #f8fafc; }
                .header { padding: 12px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
                .content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; }
                img { max-width: 100%; max-height: 80vh; object-fit: contain; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                p { margin: 16px 0; font-family: system-ui, sans-serif; color: #4b5563; text-align: center; }
                .button { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; }
              </style>
            </head>
            <body>
              <div class="header">
                <h3 style="margin: 0; color: #4f46e5; font-family: system-ui, sans-serif;">TimeLoom - Save Image</h3>
              </div>
              <div class="content">
                <img src="${imageUrl}" alt="TimeLoom Image" />
                <p>Press and hold on the image to download<br>Or screenshot this page</p>
              </div>
            </body>
          </html>
        `);
        tab.document.close();
        return true;
      }
    }
    
    // Desktop approach - use download attribute
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Remove after a short delay
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Error downloading image:', error);
    return false;
  }
};

/**
 * Share image to social media with mobile optimizations
 * @param platform - Social media platform
 * @param imageUrl - URL of the image
 * @param shareText - Text to share
 * @returns Boolean indicating success
 */
export const shareToSocialMedia = (
  platform: 'instagram' | 'facebook' | 'twitter' | 'whatsapp',
  imageUrl: string | null,
  shareText: string
): boolean => {
  if (!imageUrl) {
    console.error('No image URL provided for sharing');
    return false;
  }
  
  const appUrl = window.location.href;
  let shareUrl = '';
  
  try {
    // On mobile, for certain platforms, first try to use Web Share API
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && navigator.share && (platform === 'whatsapp' || platform === 'instagram')) {
      // For mobile sharing where direct image sharing is difficult, try native share
      navigator.share({
        title: 'My TimeLoom Journey',
        text: shareText,
        url: appUrl,
      }).catch(error => {
        console.warn('Mobile share failed, falling back to regular share:', error);
        // Continue with regular sharing methods below
      });
      
      // Return true regardless as we've triggered the share dialog
      return true;
    }
    
    // Regular sharing URLs as fallback
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + appUrl)}`;
        break;
      case 'instagram':
        // Instagram special handling - open a helpful dialog
        alert('To share on Instagram:\n\n1. Download the image\n2. Open Instagram\n3. Tap + icon at the top\n4. Select the downloaded image\n5. Share to your Story or Feed');
        return true;
    }
    
    // Open in new window with error handling
    if (shareUrl) {
      const newWindow = window.open(shareUrl, '_blank');
      if (!newWindow) {
        alert('Your browser blocked the popup. Please check your popup settings to share.');
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error sharing to social media:', error);
    return false;
  }
};