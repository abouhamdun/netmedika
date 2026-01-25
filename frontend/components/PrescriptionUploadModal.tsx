import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { PharmacyColors } from '../constants/Colors';
import { useCustomAlert } from './CustomAlert';
import { uploadPrescriptionImages } from '../utils/uploadPrescription';

interface PrescriptionUploadModalProps {
  visible: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
}

export default function PrescriptionUploadModal({
  visible,
  onClose,
  onUploadSuccess,
}: PrescriptionUploadModalProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const { showAlert, AlertComponent } = useCustomAlert();

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      showAlert({
        type: 'error',
        title: 'Permission Denied',
        message: 'Camera permission is required to take photos',
      });
      return false;
    }
    return true;
  };

  
  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlert({
        type: 'error',
        title: 'Permission Denied',
        message: 'Gallery permission is required to select photos',
      });
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImages([...selectedImages, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('Camera error:', error);
      showAlert({
        type: 'error',
        title: 'Error',
        message: 'Failed to take photo',
      });
    }
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });

      if (!result.canceled && result.assets) {
        const uris = result.assets.map(asset => asset.uri);
        setSelectedImages([...selectedImages, ...uris].slice(0, 5));
      }
    } catch (error) {
      console.error('Gallery error:', error);
      showAlert({
        type: 'error',
        title: 'Error',
        message: 'Failed to select images',
      });
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (result.assets) {
        const uris = result.assets.map(asset => asset.uri);
        setSelectedImages([...selectedImages, ...uris].slice(0, 5));
      }
    } catch (error) {
      console.error('Document picker error:', error);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      showAlert({
        type: 'warning',
        title: 'No Images',
        message: 'Please select at least one prescription image',
      });
      return;
    }

    showAlert({
      type: 'question',
      title: 'Upload Prescription?',
      message: `Upload ${selectedImages.length} ${selectedImages.length === 1 ? 'image' : 'images'}?`,
      confirmText: 'Upload',
      cancelText: 'Cancel',
      showCancel: true,
      onConfirm: async () => {
        try {
          setUploading(true);

          // Simulate upload (Replace with actual Appwrite storage upload)
          await new Promise(resolve => setTimeout(resolve, 2000));

          // TODO: Upload to Appwrite Storage
          // const storage = new Storage(client);
          // for (const imageUri of selectedImages) {
          //   const file = await fetch(imageUri).then(r => r.blob());
          //   await storage.createFile('prescriptions', ID.unique(), file);
          // }

          setUploading(false);
          showAlert({
            type: 'success',
            title: 'Success!',
            message: 'Prescription uploaded successfully. Our pharmacist will review it shortly.',
            onConfirm: () => {
              setSelectedImages([]);
              onClose();
              onUploadSuccess?.();
            },
          });
        } catch (error) {
          setUploading(false);
          showAlert({
            type: 'error',
            title: 'Upload Failed',
            message: 'Failed to upload prescription. Please try again.',
          });
        }
      },
    });
  };

  const handleClose = () => {
    if (selectedImages.length > 0) {
      showAlert({
        type: 'warning',
        title: 'Discard Changes?',
        message: 'You have unsaved images. Are you sure you want to close?',
        confirmText: 'Discard',
        cancelText: 'Cancel',
        showCancel: true,
        onConfirm: () => {
          setSelectedImages([]);
          onClose();
        },
      });
    } else {
      onClose();
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Upload Prescription</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={PharmacyColors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Instructions */}
              <View style={styles.instructionCard}>
                <Ionicons name="information-circle" size={24} color={PharmacyColors.info} />
                <View style={styles.instructionText}>
                  <Text style={styles.instructionTitle}>How to upload:</Text>
                  <Text style={styles.instructionDescription}>
                    • Take a clear photo of your prescription{'\n'}
                    • Make sure all text is readable{'\n'}
                    • You can upload up to 5 images{'\n'}
                    • Supported formats: JPG, PNG, PDF
                  </Text>
                </View>
              </View>

              {/* Upload Options */}
              <View style={styles.uploadOptions}>
                <TouchableOpacity style={styles.uploadOption} onPress={takePhoto}>
                  <LinearGradient
                    colors={PharmacyColors.gradientAccent}
                    style={styles.uploadOptionGradient}
                  >
                    <Ionicons name="camera" size={32} color={PharmacyColors.white} />
                  </LinearGradient>
                  <Text style={styles.uploadOptionText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.uploadOption} onPress={pickFromGallery}>
                  <LinearGradient
                    colors={PharmacyColors.gradientSuccess}
                    style={styles.uploadOptionGradient}
                  >
                    <Ionicons name="images" size={32} color={PharmacyColors.white} />
                  </LinearGradient>
                  <Text style={styles.uploadOptionText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.uploadOption} onPress={pickDocument}>
                  <LinearGradient
                    colors={PharmacyColors.gradientPrimary}
                    style={styles.uploadOptionGradient}
                  >
                    <Ionicons name="document" size={32} color={PharmacyColors.white} />
                  </LinearGradient>
                  <Text style={styles.uploadOptionText}>Documents</Text>
                </TouchableOpacity>
              </View>

              {/* Selected Images */}
              {selectedImages.length > 0 && (
                <View style={styles.selectedImagesContainer}>
                  <Text style={styles.selectedImagesTitle}>
                    Selected Images ({selectedImages.length}/5)
                  </Text>
                  <View style={styles.imageGrid}>
                    {selectedImages.map((uri, index) => (
                      <View key={index} style={styles.imagePreview}>
                        <Image source={{ uri }} style={styles.previewImage} />
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeImage(index)}
                        >
                          <Ionicons name="close-circle" size={24} color={PharmacyColors.error} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Upload Button */}
              {selectedImages.length > 0 && (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleUpload}
                  disabled={uploading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={PharmacyColors.gradientAccent}
                    style={styles.uploadButtonGradient}
                  >
                    {uploading ? (
                      <Text style={styles.uploadButtonText}>Uploading...</Text>
                    ) : (
                      <>
                        <Ionicons name="cloud-upload" size={20} color={PharmacyColors.white} />
                        <Text style={styles.uploadButtonText}>Upload Prescription</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <AlertComponent />
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: PharmacyColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: PharmacyColors.borderGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
  },
  closeButton: {
    padding: 4,
  },
  instructionCard: {
    flexDirection: 'row',
    backgroundColor: PharmacyColors.info + '10',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  instructionText: {
    flex: 1,
    marginLeft: 12,
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginBottom: 8,
  },
  instructionDescription: {
    fontSize: 13,
    color: PharmacyColors.textSecondary,
    lineHeight: 20,
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  uploadOption: {
    alignItems: 'center',
  },
  uploadOptionGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadOptionText: {
    fontSize: 13,
    color: PharmacyColors.textPrimary,
    fontWeight: '600',
  },
  selectedImagesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  selectedImagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginBottom: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imagePreview: {
    width: '30%',
    aspectRatio: 1,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: PharmacyColors.lightGray,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: PharmacyColors.white,
    borderRadius: 12,
  },
  uploadButton: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 30,
    overflow: 'hidden',
  },
  uploadButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.white,
  },
});