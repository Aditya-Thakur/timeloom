// imageUtils.ts - Improved utility functions for image generation and sharing
import html2canvas from 'html2canvas';

/**
 * Generates an image from a React ref with improved handling
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
    // Add a delay to ensure all styles are fully applied
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create a clone of the element to avoid modifying the visible DOM
    const original = ref.current;
    const clone = original.cloneNode(true) as HTMLElement;
    
    // Set explicit dimensions for the clone
    const rect = original.getBoundingClientRect();
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    
    // Hide the clone but keep it in the document flow
    clone.style.position = 'fixed';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.zIndex = '-9999';
    clone.style.opacity = '0';
    clone.style.pointerEvents = 'none';
    
    // Make the clone a standalone element with explicit styling
    clone.style.backgroundColor = original.style.backgroundColor || 'white';
    clone.style.borderRadius = original.style.borderRadius || '0.5rem';
    clone.style.padding = original.style.padding || '1.5rem';
    
    // Convert any SVGs in the clone to have explicit dimensions
    const svgs = clone.querySelectorAll('svg');
    svgs.forEach(svg => {
      if (!svg.hasAttribute('width')) {
        svg.setAttribute('width', '40');
      }
      if (!svg.hasAttribute('height')) {
        svg.setAttribute('height', '40');
      }
    });
    
    // Fix Tailwind color classes by converting them to inline styles
    const elementsWithClasses = clone.querySelectorAll('*');
    elementsWithClasses.forEach((element) => {
      const el = element as HTMLElement;
      
      // Extract Tailwind classes and apply equivalent inline styles
      if (el.className) {
        const classList = el.className.toString().split(' ');
        
        // Fix background colors
        if (classList.some(c => c.startsWith('bg-'))) {
          if (!el.style.backgroundColor) {
            // Apply fallback colors based on common Tailwind classes
            if (classList.includes('bg-white')) el.style.backgroundColor = '#ffffff';
            else if (classList.includes('bg-gray-50')) el.style.backgroundColor = '#f9fafb';
            else if (classList.includes('bg-gray-100')) el.style.backgroundColor = '#f3f4f6';
            else if (classList.includes('bg-blue-50')) el.style.backgroundColor = '#eff6ff';
            else if (classList.includes('bg-green-50')) el.style.backgroundColor = '#ecfdf5';
            else if (classList.includes('bg-amber-50')) el.style.backgroundColor = '#fffbeb';
            else if (classList.includes('bg-indigo-50')) el.style.backgroundColor = '#eef2ff';
            else el.style.backgroundColor = '#ffffff'; // Default fallback
          }
        }
        
        // Fix text colors
        if (classList.some(c => c.startsWith('text-'))) {
          if (!el.style.color) {
            // Apply fallback colors based on common Tailwind classes
            if (classList.includes('text-gray-700')) el.style.color = '#374151';
            else if (classList.includes('text-gray-600')) el.style.color = '#4b5563';
            else if (classList.includes('text-indigo-600')) el.style.color = '#4f46e5';
            else if (classList.includes('text-amber-600')) el.style.color = '#d97706';
            else el.style.color = '#000000'; // Default fallback
          }
        }
      }
    });
    
    // Append clone to the body
    document.body.appendChild(clone);
    
    // Capture the image with improved settings
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      foreignObjectRendering: false,
      removeContainer: true,
      // Extra options for better rendering
      ignoreElements: (element) => {
        return element.tagName === 'IFRAME' || 
               element.classList.contains('no-export');
      },
      onclone: (clonedDoc) => {
        // Additional processing on the cloned document if needed
        return clonedDoc;
      }
    });
    
    // Remove the clone
    document.body.removeChild(clone);
    
    const imageUrl = canvas.toDataURL('image/png');
    if (setIsGenerating) setIsGenerating(false);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    
    // Fallback approach for direct capture
    if (ref.current) {
      try {
        console.log('Attempting direct capture fallback...');
        const canvas = await html2canvas(ref.current, {
          scale: 2,
          logging: true, // Enable logging for debugging
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
 * Downloads an image from a URL with error handling
 * @param imageUrl - URL of the image to download
 * @param filename - Filename for the downloaded image
 */
export const downloadImage = (imageUrl: string, filename: string): void => {
  if (!imageUrl || imageUrl === 'data:,') {
    console.error('Invalid image URL for download');
    alert('Could not generate image. Please try again.');
    return;
  }

  try {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Small delay before removing
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  } catch (error) {
    console.error('Error downloading image:', error);
    alert('Error downloading image. Please try again.');
  }
};

/**
 * Share image to social media with improved error handling
 * @param platform - Social media platform
 * @param imageUrl - URL of the image
 * @param shareText - Text to share
 */
export const shareToSocialMedia = (
  platform: 'instagram' | 'facebook' | 'twitter' | 'whatsapp',
  imageUrl: string | null,
  shareText: string
): void => {
  if (!imageUrl) {
    console.error('No image URL provided for sharing');
    alert('Could not generate image for sharing. Please try again.');
    return;
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
        return;
    }
    
    // Open in new window with error handling
    const newWindow = window.open(shareUrl, '_blank');
    if (!newWindow) {
      alert('Your browser blocked the popup. Please check your popup settings to share.');
    }
  } catch (error) {
    console.error('Error sharing to social media:', error);
    alert('Error sharing to social media. Please try again.');
  }
};