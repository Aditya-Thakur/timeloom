// imageUtils.ts - Comprehensive solution for reliable image generation
import html2canvas from 'html2canvas';

/**
 * Generates an image from a React ref with robust error handling and fallbacks
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Approach 1: Direct capture of the original element
    const canvas = await html2canvas(ref.current, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      // Important optimization - don't try to render iframes
      ignoreElements: (element) => {
        return element.tagName === 'IFRAME' || 
               element.classList.contains('no-export');
      },
      // Critical for SVG rendering
      onclone: (documentClone, elementClone) => {
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
      }
    });
    
    const imageUrl = canvas.toDataURL('image/png');
    
    // Validate that we got a real image (not blank)
    if (imageUrl === 'data:,' || imageUrl === 'data:image/png;base64,') {
      throw new Error('Generated image is blank');
    }
    
    if (setIsGenerating) setIsGenerating(false);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image (primary method):', error);
    
    // Fallback method - create an off-screen clone and render that
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
      
      // Append to body, capture, then remove
      document.body.appendChild(clone);
      
      // Give browser time to paint the clone
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: true, // Enable logging for debugging
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });
      
      // Remove the clone from DOM
      document.body.removeChild(clone);
      
      const imageUrl = canvas.toDataURL('image/png');
      if (setIsGenerating) setIsGenerating(false);
      return imageUrl;
    } catch (fallbackError) {
      console.error('Fallback capture also failed:', fallbackError);
      
      // Final fallback - use a different rendering approach
      try {
        console.log('Attempting emergency rendering method...');
        
        // Create a canvas directly matching the dimensions
        const element = ref.current;
        const { width, height } = element.getBoundingClientRect();
        
        // Create canvas at 2x for high DPI displays
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        
        canvas.width = width * 2;
        canvas.height = height * 2;
        ctx.scale(2, 2);
        
        // Fill the background
        const computedStyle = window.getComputedStyle(element);
        ctx.fillStyle = computedStyle.backgroundColor || 'white';
        ctx.fillRect(0, 0, width, height);
        
        // Render HTML to XML, then to image via SVG
        // This is a hack but can work when all else fails
        const data = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <foreignObject width="100%" height="100%" x="0" y="0">
              <div xmlns="http://www.w3.org/1999/xhtml">
                ${element.outerHTML}
              </div>
            </foreignObject>
          </svg>
        `;
        
        const img = new Image();
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data);
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          // Set a timeout to avoid hanging
          setTimeout(resolve, 3000);
        });
        
        // Draw the image to the canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        const imageUrl = canvas.toDataURL('image/png');
        if (setIsGenerating) setIsGenerating(false);
        return imageUrl;
      } catch (emergencyError) {
        console.error('All capture methods failed:', emergencyError);
        if (setIsGenerating) setIsGenerating(false);
        return null;
      }
    }
  }
};

/**
 * Downloads an image from a URL with reliable handling
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
    // Create a temporary link element
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
 * Share image to social media with improved error handling
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
        // Instagram requires the app and doesn't have a direct web share URL
        alert('To share on Instagram, please download the image and upload it through the Instagram app.');
        return true;
    }
    
    // Open in new window with error handling
    const newWindow = window.open(shareUrl, '_blank');
    if (!newWindow) {
      alert('Your browser blocked the popup. Please check your popup settings to share.');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sharing to social media:', error);
    return false;
  }
};