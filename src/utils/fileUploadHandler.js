// File upload handler for Google Drive integration
export const uploadToGoogleDrive = async (files, options = {}) => {
  const { folderName, webhookUrl } = options;
  
  try {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderName', folderName || 'Dental_Lab_Uploads');
      formData.append('fileName', file.name);
      formData.append('fileType', file.type);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed for ${file.name}: ${response.status}`);
      }
      
      const result = await response.json();
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        url: result.fileUrl || result.url,
        driveId: result.fileId || result.id,
        uploadedAt: new Date().toISOString()
      };
    });
    
    const uploadedFiles = await Promise.all(uploadPromises);
    console.log('Files uploaded successfully:', uploadedFiles);
    return uploadedFiles;
    
  } catch (error) {
    console.error('File upload error:', error);
    
    // Fallback: convert files to base64 for webhook submission
    const fallbackFiles = await Promise.all(
      files.map(async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: file.name,
              size: file.size,
              type: file.type,
              data: reader.result,
              uploadMethod: 'base64_fallback',
              uploadedAt: new Date().toISOString()
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );
    
    console.log('Using fallback base64 encoding for files');
    return fallbackFiles;
  }
};

// Validate file types and sizes
export const validateFiles = (files, options = {}) => {
  const {
    maxSize = 10485760, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxFiles = 5
  } = options;
  
  const errors = [];
  
  if (files.length > maxFiles) {
    errors.push(`Maximum ${maxFiles} files allowed`);
  }
  
  files.forEach((file, index) => {
    if (file.size > maxSize) {
      errors.push(`File ${index + 1} (${file.name}) exceeds ${Math.round(maxSize / 1048576)}MB limit`);
    }
    
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File ${index + 1} (${file.name}) has unsupported type: ${file.type}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Generate secure file names
export const generateSecureFileName = (originalName, prefix = '') => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  const baseName = originalName.split('.').slice(0, -1).join('.');
  const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
  
  return `${prefix}${timestamp}_${randomString}_${sanitizedBaseName}.${extension}`;
};
