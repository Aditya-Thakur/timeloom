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
    
    // Make a clone of the element to modify colors without affecting the UI
    const clone = ref.current.cloneNode(true) as HTMLElement;
    
    // Find and replace problematic color functions (oklch) with fallback colors
    const elementsWithStyles = clone.querySelectorAll('[style*="oklch"]');
    elementsWithStyles.forEach((element) => {
      const el = element as HTMLElement;
      const style = el.getAttribute('style');
      if (style && style.includes('oklch')) {
        // Replace oklch with a safe fallback (hex or rgb)
        const newStyle = style.replace(/oklch\([^)]+\)/g, '#6366f1'); // indigo-500 as fallback
        el.setAttribute('style', newStyle);
      }
    });
    
    // Also check for classes that might use oklch colors via Tailwind
    // This is a basic solution - a more comprehensive approach would map specific classes
    
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher quality
      backgroundColor: null,
      logging: false,
      useCORS: true,
      allowTaint: true
    });
    
    const imageUrl = canvas.toDataURL('image/png');
    if (setIsGenerating) setIsGenerating(false);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
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