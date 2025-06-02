import html2canvas from 'html2canvas';

// Function to download the meme as an image
export const downloadMemeAsImage = async (elementId: string, filename: string = 'meme.png'): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      scale: 2, // Higher quality
    });

    // Add signature to canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.textAlign = 'end';
      ctx.fillText('Created by Chanchal Chaudhary - IGDTUW Delhi', canvas.width - 10, canvas.height - 10);
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Failed to download meme:', error);
    throw error;
  }
};

// Function to share the meme
export const shareMeme = async (elementId: string, title: string = 'Check out my meme!'): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      scale: 2,
    });

    // Add signature to canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.textAlign = 'end';
      ctx.fillText('Created by Chanchal Chaudhary - IGDTUW Delhi', canvas.width - 10, canvas.height - 10);
    }

    canvas.toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }

      const file = new File([blob], 'meme.png', { type: 'image/png' });

      // Use native Web Share API if available
      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            text: 'Meme created with Vibe & Meme Magic by Chanchal Chaudhary (IGDTUW Delhi)',
            files: [file]
          });
        } catch (error) {
          // Fallback to email sharing if Web Share API fails or is cancelled
          shareViaEmail(canvas.toDataURL('image/png'));
        }
      } else {
        // Fallback to email sharing if Web Share API is not available
        shareViaEmail(canvas.toDataURL('image/png'));
      }
    }, 'image/png');
  } catch (error) {
    console.error('Failed to share meme:', error);
    throw error;
  }
};

// Function to share via email
export const shareViaEmail = (dataUrl: string): void => {
  const mailtoLink = `mailto:?subject=Check out my meme!&body=I created this meme with Vibe & Meme Magic by Chanchal Chaudhary (IGDTUW Delhi).%0A%0A${encodeURIComponent(dataUrl)}`;
  window.location.href = mailtoLink;
};