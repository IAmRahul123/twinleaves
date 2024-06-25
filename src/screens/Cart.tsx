import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/cartContext';

const Cart = () => {
  const { cart,addQuantity,minQuantity } = useCart();
  
  console.log("CART HERE",cart)
  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item?.product?.sku_code}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.productName}>{item?.product.name}</Text>
              <Text style={styles.quantityText}>Quantity: {item?.quantity}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => {minQuantity(item?.product?.sku_code) }} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item?.quantity}</Text>
                <TouchableOpacity onPress={() => {addQuantity(item?.product?.sku_code) }} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  cartItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#444"
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    paddingVertical:4,
    paddingHorizontal: 8,
  },
  quantityText:{
    color:"#444"
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent:'flex-end'
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical:4
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
  },

});

export default Cart;
