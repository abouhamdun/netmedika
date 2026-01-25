// utils/uploadPrescription.ts
import { Storage, ID } from 'appwrite';
import { client } from '../config/appwriteConfig';

const storage = new Storage(client);
const BUCKET_ID = 'prescriptions'; // Create this bucket in Appwrite

export const uploadPrescriptionImages = async (imageUris: string[]) => {
  const uploadedFiles = [];

  for (const uri of imageUris) {
    try {
      // Fetch the image as a blob
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Create a File object
      const file = new File([blob], `prescription_${Date.now()}.jpg`, {
        type: 'image/jpeg',
      });

      // Upload to Appwrite
      const result = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );

      uploadedFiles.push(result);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  return uploadedFiles;
};