
/**
 * Validates if a file is an acceptable image
 */
export const validateImageFile = (file: File): boolean => {
  // Check if file is an image
  if (!file.type.startsWith('image/')) {
    return false;
  }
  
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
};

/**
 * Creates an object URL for a file
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Revokes an object URL to prevent memory leaks
 */
export const revokeImagePreview = (previewUrl: string): void => {
  if (previewUrl.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl);
  }
};
