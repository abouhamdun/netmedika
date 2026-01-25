import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PharmacyColors, CommonStyles } from '../constants/Colors';

export default function ProductDetailScreen() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample product data (in real app, this would come from route params or API)
  const product = {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 500,
    originalPrice: 550,
    discount: 10,
    rating: 4.5,
    reviews: 128,
    image: '💊',
    stock: 50,
    prescription: false,
    description: 'Paracetamol is used to treat pain and fever. It works by blocking the production of prostaglandins, which are released by the body in response to illness and injury.',
    dosage: 'Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.',
    warnings: [
      'Do not exceed the recommended dose',
      'Avoid alcohol consumption',
      'Consult doctor if symptoms persist',
    ],
    ingredients: 'Paracetamol 500mg, Microcrystalline cellulose, Starch, Povidone',
    manufacturer: 'PharmaCorp Ltd',
    expiry: '12/2025',
  };

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, quantity + change)));
  };

  const addToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
    // Add to cart logic here
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PharmacyColors.primary} />
      
      {/* Custom Header */}
      <LinearGradient
        colors={PharmacyColors.gradientPrimary}
        style={styles.customHeader}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={PharmacyColors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? PharmacyColors.error : PharmacyColors.white} 
          />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Text style={styles.productEmoji}>{product.image}</Text>
          
          {/* Badges */}
          {product.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
          
          {product.prescription && (
            <View style={styles.prescriptionBadge}>
              <Ionicons name="document-text" size={16} color={PharmacyColors.white} />
              <Text style={styles.prescriptionText}>Prescription Required</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{product.category}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₦{product.price}</Text>
              {product.originalPrice > product.price && (
                <Text style={styles.originalPrice}>₦{product.originalPrice}</Text>
              )}
            </View>
            <View style={styles.stockContainer}>
              <Ionicons 
                name="checkmark-circle" 
                size={18} 
                color={product.stock > 20 ? PharmacyColors.success : PharmacyColors.warning} 
              />
              <Text style={[
                styles.stockText,
                product.stock < 20 && styles.lowStockText
              ]}>
                {product.stock < 20 ? `Only ${product.stock} left` : 'In Stock'}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{product.description}</Text>
          </View>

          {/* Dosage */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dosage & Administration</Text>
            <Text style={styles.sectionText}>{product.dosage}</Text>
          </View>

          {/* Warnings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Warnings & Precautions</Text>
            {product.warnings.map((warning, index) => (
              <View key={index} style={styles.warningItem}>
                <Ionicons name="alert-circle-outline" size={16} color={PharmacyColors.warning} />
                <Text style={styles.warningText}>{warning}</Text>
              </View>
            ))}
          </View>

          {/* Additional Info */}
          <View style={styles.additionalInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ingredients:</Text>
              <Text style={styles.infoValue}>{product.ingredients}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Manufacturer:</Text>
              <Text style={styles.infoValue}>{product.manufacturer}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Expiry Date:</Text>
              <Text style={styles.infoValue}>{product.expiry}</Text>
            </View>
          </View>
        </View>

        {/* Spacing for fixed footer */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        {/* Quantity Selector */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(-1)}
            >
              <Ionicons name="remove" size={20} color={PharmacyColors.accent} />
            </TouchableOpacity>
            
            <Text style={styles.quantityValue}>{quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(1)}
            >
              <Ionicons name="add" size={20} color={PharmacyColors.accent} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={addToCart}
          style={styles.addToCartContainer}
        >
          <LinearGradient
            colors={PharmacyColors.gradientAccent}
            style={styles.addToCartButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="cart" size={22} color={PharmacyColors.white} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
            <Text style={styles.addToCartPrice}>₦{product.price * quantity}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PharmacyColors.background,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: PharmacyColors.white,
    paddingVertical: 40,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  productEmoji: {
    fontSize: 120,
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: PharmacyColors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: PharmacyColors.white,
  },
  prescriptionBadge: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PharmacyColors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  prescriptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: PharmacyColors.white,
    marginLeft: 6,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 14,
    color: PharmacyColors.accent,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: PharmacyColors.textPrimary,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 13,
    color: PharmacyColors.textSecondary,
    marginLeft: 4,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginBottom: 16,
    lineHeight: 32,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PharmacyColors.accent,
  },
  originalPrice: {
    fontSize: 18,
    color: PharmacyColors.gray,
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PharmacyColors.success + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stockText: {
    fontSize: 13,
    fontWeight: '600',
    color: PharmacyColors.success,
    marginLeft: 4,
  },
  lowStockText: {
    color: PharmacyColors.warning,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: PharmacyColors.textSecondary,
    lineHeight: 22,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    marginLeft: 8,
    lineHeight: 20,
  },
  additionalInfo: {
    backgroundColor: PharmacyColors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    ...CommonStyles.shadow,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: PharmacyColors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: PharmacyColors.textPrimary,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: PharmacyColors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: PharmacyColors.borderGray,
    ...CommonStyles.shadowLarge,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: PharmacyColors.textPrimary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: PharmacyColors.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartContainer: {
    width: '100%',
  },
  addToCartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 30,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.white,
    marginLeft: 8,
    marginRight: 12,
  },
  addToCartPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.white,
  },
});