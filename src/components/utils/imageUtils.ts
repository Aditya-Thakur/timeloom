// imageUtils.ts - Simple but reliable approach for image generation
import html2canvas from 'html2canvas';

/**
 * Generates an image from a React ref with a simpler, more reliable approach
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
    // First, wait for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple direct capture approach
    const canvas = await html2canvas(ref.current, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      // Don't worry about scrolling content
      scrollX: 0,
      scrollY: 0,
      // Handle SVGs and other special elements
      onclone: (documentClone: Document) => {
        // Find the cloned element in the document clone
        const clonedElement = documentClone.querySelector(`[data-id="${ref.current?.dataset.id}"]`) 
          || documentClone.getElementById(ref.current?.id || '')
          || documentClone.querySelector('[class*="share-image"]');
          
        // If we found the element, ensure it's ready for capture
        if (clonedElement instanceof HTMLElement) {
          // Remove transforms and make sure it's visible
          clonedElement.style.transform = 'none';
          clonedElement.style.transformOrigin = 'top left';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.opacity = '1';
        }
        
        // Fix SVGs
        const svgs = documentClone.querySelectorAll('svg');
        svgs.forEach(svg => {
          if (!svg.getAttribute('width')) svg.setAttribute('width', '100%');
          if (!svg.getAttribute('height')) svg.setAttribute('height', '100%');
        });
      }
    });
    
    // Generate image URL
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