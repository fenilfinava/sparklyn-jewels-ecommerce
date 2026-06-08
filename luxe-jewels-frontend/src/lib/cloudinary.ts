import { api } from './api';

export const uploadImageToCloudinary = async (file: File): Promise<{ url: string; publicId: string }> => {
  // In a full stack setup, we usually send the file to our backend
  // which then uploads to Cloudinary with its secure API Secret.
  // We'll use our backend's /api/admin/upload endpoint as defined in the PRD.
  
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Backend upload failed:', error);
    throw error;
  }
};
