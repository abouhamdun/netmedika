import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PharmacyColors, CommonStyles } from '../../constants/Colors';
import Toast from 'react-native-toast-message';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: keyof typeof Ionicons.glyphMap;
  prescription: boolean;
}

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Paracetamol 500mg', price: 500, quantity: 2, image: 'medical', prescription: false },
    { id: 2, name: 'Vitamin C 1000mg', price: 1200, quantity: 1, image: 'fitness', prescription: false },
    { id: 3, name: 'Hand Sanitizer 500ml', price: 800, quantity: 3, image: 'medical-outline', prescription: false },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (!itemToRemove) return;

    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            Toast.show({
              type: 'info',
              text1: 'Cancelled',
              text2: 'Item was not removed from your cart',
              position: 'top',
              visibilityTime: 2000,
            });
          }
        },
        {
          text: 'Yes, Remove',
          style: 'destructive',
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            Toast.show({
              type: 'success',
              text1: 'Item Removed',
              text2: `${itemToRemove.name} has been removed from your cart`,
              position: 'top',
              visibilityTime: 2000,
            });
          }
        }
      ],
      {
        cancelable: true
      }
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const deliveryFee = 500;
  const discount = 200;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee - discount;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Cart Empty',
        text2: 'Please add items to your cart to proceed',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    
    Toast.show({
      type: 'success',
      text1: 'Order Placed Successfully',
      text2: `Total amount: Rs. ${total}. We'll confirm your order shortly.`,
      position: 'top',
      visibilityTime: 3000,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PharmacyColors.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={PharmacyColors.gradientPrimary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSubtitle}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </LinearGradient>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={PharmacyColors.accent} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Add medicines to get started</Text>
          <TouchableOpacity>
            <LinearGradient
              colors={PharmacyColors.gradientAccent}
              style={styles.shopButton}
            >
              <Text style={styles.shopButtonText}>Shop Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Cart Items */}
            <View style={styles.itemsContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  {/* Item Image */}
                  <View style={styles.itemImage}>
                    <View style={styles.iconContainer}>
                      <LinearGradient
                        colors={PharmacyColors.gradientAccent}
                        style={styles.iconBackground}
                      >
                        <Ionicons name={item.image} size={24} color={PharmacyColors.white} />
                      </LinearGradient>
                    </View>
                    {item.prescription && (
                      <View style={styles.rxBadge}>
                        <Text style={styles.rxText}>Rx</Text>
                      </View>
                    )}
                  </View>

                  {/* Item Details */}
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                    
                    {/* Quantity Controls */}
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Ionicons name="remove" size={16} color={PharmacyColors.accent} />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Ionicons name="add" size={16} color={PharmacyColors.accent} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Item Total & Remove */}
                  <View style={styles.itemActions}>
                    <Text style={styles.itemTotal}>Rs. {item.price * item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color={PharmacyColors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Price Breakdown */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>Rs. {subtotal}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>Rs. {deliveryFee}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>-Rs. {discount}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>Rs. {total}</Text>
              </View>
            </View>

            {/* Delivery Info */}
            <View style={styles.deliveryInfo}>
              <Ionicons name="time-outline" size={20} color={PharmacyColors.success} />
              <Text style={styles.deliveryText}>Estimated delivery: 30-45 mins</Text>
            </View>
          </ScrollView>

          {/* Checkout Button */}
          <View style={styles.footer}>
            <View style={styles.footerInfo}>
              <Text style={styles.footerLabel}>Total Amount</Text>
              <Text style={styles.footerTotal}>Rs. {total}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCheckout}
            >
              <LinearGradient
                colors={PharmacyColors.gradientAccent}
                style={styles.checkoutButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                <Ionicons name="arrow-forward" size={20} color={PharmacyColors.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PharmacyColors.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PharmacyColors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: PharmacyColors.white,
    opacity: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: PharmacyColors.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  shopButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.white,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  itemsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: PharmacyColors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    ...CommonStyles.shadow,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: PharmacyColors.lightGray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  iconBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rxBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: PharmacyColors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rxText: {
    fontSize: 10,
    color: PharmacyColors.white,
    fontWeight: 'bold',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: PharmacyColors.textPrimary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: PharmacyColors.textSecondary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PharmacyColors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: PharmacyColors.textPrimary,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.accent,
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: PharmacyColors.white,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...CommonStyles.shadow,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: PharmacyColors.textSecondary,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: PharmacyColors.textPrimary,
  },
  discountValue: {
    color: PharmacyColors.success,
  },
  divider: {
    height: 1,
    backgroundColor: PharmacyColors.borderGray,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PharmacyColors.textPrimary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PharmacyColors.accent,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 100,
  },
  deliveryText: {
    fontSize: 14,
    color: PharmacyColors.success,
    fontWeight: '600',
    marginLeft: 8,
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
    ...CommonStyles.shadow,
  },
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerLabel: {
    fontSize: 14,
    color: PharmacyColors.textSecondary,
  },
  footerTotal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PharmacyColors.accent,
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 30,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PharmacyColors.white,
    marginRight: 8,
  },
});