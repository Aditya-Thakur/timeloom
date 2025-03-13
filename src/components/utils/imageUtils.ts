// imageUtils.ts - Utility functions for image generation and sharing
import html2canvas from 'html2canvas';

/**
 * Generates an image from a React ref
 * @param ref - React ref to the element to convert to image
 * @returns Promise with the image URL or null
 */
export const generateImageFromRef = async (
  ref: React.RefObject<HTMLDivElement | null>,
  setIsGenerating?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string | null> => {
  if (!ref.current) return null;
  
  if (setIsGenerating) setIsGenerating(true);
  
  try {
    // Add a slight delay to ensure styles are applied
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Create a deep clone of the element to avoid modifying the visible DOM
    const original = ref.current;
    const clone = original.cloneNode(true) as HTMLElement;
    
    // Apply the clone's styles directly to ensure they're captured correctly
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.opacity = '0';
    clone.style.pointerEvents = 'none';
    clone.style.zIndex = '-1';
    
    // Fix for SVG elements inside the clone
    const svgs = clone.querySelectorAll('svg');
    svgs.forEach(svg => {
      if (!svg.getAttribute('width') && !svg.getAttribute('height')) {
        svg.setAttribute('width', '40');
        svg.setAttribute('height', '40');
      }
    });
    
    // Process problematic color values
    const elementsWithStyles = clone.querySelectorAll('[style*="oklch"], [class*="bg-"], [class*="text-"]');
    elementsWithStyles.forEach((element) => {
      const el = element as HTMLElement;
      
      // Replace any inline styles with oklch
      if (el.style && el.style.cssText.includes('oklch')) {
        const newStyle = el.style.cssText.replace(/oklch\([^)]+\)/g, '#6366f1');
        el.style.cssText = newStyle;
      }
      
      // For elements with Tailwind color classes, add explicit colors via inline styles
      if (el.className && (el.className.includes('bg-') || el.className.includes('text-'))) {
        // Only add fallback colors if no inline color is present
        if (el.className.includes('bg-') && !el.style.backgroundColor) {
          el.style.backgroundColor = '#ffffff'; // Default white background
        }
        if (el.className.includes('text-') && !el.style.color) {
          el.style.color = '#000000'; // Default black text
        }
      }
    });
    
    // Append the clone to body temporarily
    document.body.appendChild(clone);
    
    // Capture the image
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      // Disable the iframe approach that's causing the error
      foreignObjectRendering: false, 
      removeContainer: true,
      ignoreElements: (element) => {
        // Ignore any problematic elements that might cause issues
        return element.tagName === 'IFRAME';
      }
    });
    
    // Remove the clone
    document.body.removeChild(clone);
    
    const imageUrl = canvas.toDataURL('image/png');
    if (setIsGenerating) setIsGenerating(false);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    
    // Fallback approach if the clone method fails
    if (ref.current) {
      try {
        console.log('Attempting direct capture fallback...');
        const canvas = await html2canvas(ref.current, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          foreignObjectRendering: false
        });
        
        const imageUrl = canvas.toDataURL('image/png');
        if (setIsGenerating) setIsGenerating(false);
        return imageUrl;
      } catch (fallbackError) {
        console.error('Fallback capture also failed:', fallbackError);
      }
    }
    
    if (setIsGenerating) setIsGenerating(false);
    return null;
  }
};

/**
 * Downloads an image from a URL
 * @param imageUrl - URL of the image to download
 * @param filename - Filename for the downloaded image
 */
export const downloadImage = (imageUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Share image to social media
 * @param platform - Social media platform
 * @param imageUrl - URL of the image
 * @param shareText - Text to share
 * @param appUrl - Current app URL
 */
export const shareToSocialMedia = (
  platform: 'instagram' | 'facebook' | 'twitter' | 'whatsapp',
  imageUrl: string | null,
  shareText: string
): void => {
  if (!imageUrl) return;
  
  const appUrl = window.location.href;
  let shareUrl = '';
  
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
      return;
  }
  
  window.open(shareUrl, '_blank');
};