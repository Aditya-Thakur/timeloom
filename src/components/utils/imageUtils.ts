// imageUtils.ts - Utility functions for image generation and sharing
import html2canvas from 'html2canvas';

/**
 * Generates an image from a React ref
 * @param ref - React ref to the element to convert to image
 * @returns Promise with the image URL or null
 */
export const generateImageFromRef = async (
  ref: React.RefObject<HTMLDivElement>,
  setIsGenerating?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string | null> => {
  if (!ref.current) return null;
  
  if (setIsGenerating) setIsGenerating(true);
  
  try {
    // Add a slight delay to ensure styles are applied
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const canvas = await html2canvas(ref.current, {
      scale: 2, // Higher quality
      backgroundColor: null,
      logging: false
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