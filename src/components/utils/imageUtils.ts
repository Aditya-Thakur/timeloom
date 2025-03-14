// imageUtils.ts - Enhanced for reliable mobile image generation
import html2canvas from 'html2canvas';

/**
 * Generates an image from a React ref with specific optimizations for mobile
 * 
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
    // Get the contentElement - find the actual content inside our container
    const contentElement = ref.current.querySelector('[style*="transform"]') || ref.current;
    const isMobile = window.innerWidth < 768;
    
    // Give time for all content to fully render and styles to apply
    // Mobile devices need more time due to processing limitations
    await new Promise(resolve => setTimeout(resolve, isMobile ? 1000 : 500));
    
    // Save original transforms before capture (we'll restore these later)
    let originalTransform = '';
    let originalHeight = '';
    let originalWidth = '';
    
    // Prepare element for capture
    if (contentElement instanceof HTMLElement) {
      // Store original styles
      originalTransform = contentElement.style.transform;
      originalHeight = contentElement.style.height;
      originalWidth = contentElement.style.width;
      
      // Temporarily reset any scaling to ensure full quality capture
      contentElement.style.transform = 'none';
      
      // Ensure element has explicit dimensions for proper capture
      if (!contentElement.style.width || !contentElement.style.height) {
        // If no explicit dimensions, try to use computed styles
        const computedStyle = window.getComputedStyle(contentElement);
        if (computedStyle.width !== 'auto') contentElement.style.width = computedStyle.width;
        if (computedStyle.height !== 'auto') contentElement.style.height = computedStyle.height;
      }
    }
    
    // Prepare capture options
    const captureOptions = {
      scale: isMobile ? 2 : 2.5, // Balance quality and performance
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      imageTimeout: 15000, // Extended timeout for image loading
      // Don't let html2canvas resize our element
      width: contentElement instanceof HTMLElement ? contentElement.offsetWidth : undefined,
      height: contentElement instanceof HTMLElement ? contentElement.offsetHeight : undefined,
      // Don't attempt to render iframes or no-export elements
      ignoreElements: (element: Element) => {
        return element.tagName === 'IFRAME' || 
               element.classList.contains('no-export');
      },
      // Handle SVGs and other special elements
      onclone: (documentClone: Document) => {
        // Fix SVGs by ensuring they have explicit dimensions
        const svgs = documentClone.querySelectorAll('svg');
        svgs.forEach(svg => {
          if (!svg.getAttribute('width')) svg.setAttribute('width', '100%');
          if (!svg.getAttribute('height')) svg.setAttribute('height', '100%');
          
          // Ensure SVG has viewBox if missing
          if (!svg.getAttribute('viewBox') && 
              svg.getAttribute('width') && 
              svg.getAttribute('height')) {
            svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
          }
          
          // Fix SVG colors by explicitly setting fill/stroke attributes
          const paths = svg.querySelectorAll('path, circle, rect, line, polygon, polyline');
          paths.forEach(path => {
            if (!path.getAttribute('fill') && 
                window.getComputedStyle(path).fill !== 'none') {
              path.setAttribute('fill', window.getComputedStyle(path).fill);
            }
            if (!path.getAttribute('stroke') && 
                window.getComputedStyle(path).stroke !== 'none') {
              path.setAttribute('stroke', window.getComputedStyle(path).stroke);
            }
          });
        });
      }
    };
    
    // Use html2canvas for capture
    const canvas = await html2canvas(
      contentElement instanceof HTMLElement ? contentElement : ref.current, 
      captureOptions
    );
    
    // Restore original styles
    if (contentElement instanceof HTMLElement) {
      contentElement.style.transform = originalTransform;
      contentElement.style.height = originalHeight;
      contentElement.style.width = originalWidth;
    }
    
    // Generate image URL - use JPEG for mobile (smaller file size)
    const imageUrl = isMobile 
      ? canvas.toDataURL('image/jpeg', 0.92) 
      : canvas.toDataURL('image/png');
    
    if (setIsGenerating) setIsGenerating(false);
    
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    
    // Fallback approach for more reliable capture
    try {
      console.log('Attempting fallback capture method...');
      
      // Get the root element and its content
      const element = ref.current;
      const isMobile = window.innerWidth < 768;
      
      // Create a clean clone for capture
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Reset any transforms that might affect rendering
      const allElements = clone.querySelectorAll('*');
      allElements.forEach(el => {
        if (el instanceof HTMLElement) {
          // Store the computed style to apply directly
          const style = window.getComputedStyle(el);
          
          // Apply important computed styles directly
          el.style.position = style.position;
          el.style.transform = 'none';
          el.style.transition = 'none';
          el.style.animation = 'none';
          
          // Ensure opacity and visibility
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        }
      });
      
      // Style the clone for optimal rendering
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.transform = 'none';
      clone.style.maxWidth = 'none';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';
      clone.style.backgroundColor = 'white';
      
      // Append to body, capture, then remove
      document.body.appendChild(clone);
      
      // Give browser time to render the clone
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Capture the clone
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true, // Enable logging to help debug issues
        backgroundColor: 'white',
        // Don't let html2canvas resize the element
        width: clone.offsetWidth,
        height: clone.offsetHeight
      });
      
      // Remove the clone
      document.body.removeChild(clone);
      
      // Generate image URL - use JPEG for mobile (smaller file size)
      const imageUrl = isMobile 
        ? canvas.toDataURL('image/jpeg', 0.9) 
        : canvas.toDataURL('image/png');
      
      if (setIsGenerating) setIsGenerating(false);
      return imageUrl;
    } catch (fallbackError) {
      console.error('Fallback capture also failed:', fallbackError);
      
      // Show error to user
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
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile, open the image in a new tab with instructions
      const tab = window.open('', '_blank');
      if (tab) {
        tab.document.write(`
          <html>
            <head>
              <title>Save Image - TimeLoom</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; background: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
                .header { padding: 12px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
                .content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; overflow: auto; }
                img { max-width: 100%; max-height: 80vh; object-fit: contain; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .instructions { margin: 16px 0; font-family: system-ui, sans-serif; color: #4b5563; text-align: center; max-width: 320px; }
                .button { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; }
              </style>
            </head>
            <body>
              <div class="header">
                <h3 style="margin: 0; color: #4f46e5; font-family: system-ui, sans-serif;">TimeLoom - Save Image</h3>
              </div>
              <div class="content">
                <img src="${imageUrl}" alt="TimeLoom Image" />
                <div class="instructions">
                  <p><strong>To save this image:</strong></p>
                  <p>On iPhone: Press and hold on the image → tap "Save to Photos"</p>
                  <p>On Android: Press and hold → tap "Download image"</p>
                  <p>Or take a screenshot of this page</p>
                </div>
              </div>
            </body>
          </html>
        `);
        tab.document.close();
        return true;
      }
    } else {
      // Desktop approach - use download attribute
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Remove after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    }
    
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
    // Check if Web Share API is available (most mobile browsers)
    const canUseWebShare = navigator.share !== undefined;
    
    if (canUseWebShare && ['whatsapp', 'instagram'].includes(platform)) {
      navigator.share({
        title: 'My TimeLoom Journey',
        text: shareText,
        url: appUrl,
      }).catch(error => {
        console.warn('Web Share API failed, falling back to regular sharing:', error);
      });
      
      return true;
    }
    
    // For platforms where direct sharing isn't possible, provide guidance or use traditional share links
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
    
    // Open in new window
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
    
    return true;
  } catch (error) {
    console.error('Error sharing to social media:', error);
    return false;
  }
};