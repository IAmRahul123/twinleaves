import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../context/cartContext';

const ProductDetails = ({ navigation, route }) => {

  const product = route?.params

  const {cart,addToCart,checkProductExist}=useCart()

  const handleAdd = async() => {
    if(checkProductExist(product?.sku_code)){
      navigation.navigate('Cart')
    }else{
      await addToCart(product,1)
    }
  };
  console.log("QUANTITY IS",cart)

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      {product.images.front ? (
        <Image source={{ uri: product.images.front }} style={styles.image} />
      ) : (
        <View style={styles.noImage}><Text style={{color:"#444"}}>No Image</Text></View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text>
          <Text style={styles.title}>Category: </Text>
          <Text style={styles.detail}>{product.main_category}, {product.category_level_1}, {product.category_level_2}</Text>
        </Text>

        <Text>
          <Text style={styles.title}>Price: </Text>
          <Text style={styles.price}>{product.mrp.currency} {product.mrp.mrp} (min. {product.minimum_order_quantity ? product.minimum_order_quantity : "1"} {product.minimum_order_quantity_unit})</Text>
        </Text>
        <Text>
          <Text style={styles.title}>Company: </Text>
          <Text style={styles.company}>{product.company_detail.name}</Text>
        </Text>
        {/* <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View> */}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleAdd} style={[styles.addButton]}>
          <Text style={styles.addButtonText}>{checkProductExist(product?.sku_code)?"Go":"Add"} to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 250,
  },
  noImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 16,
    gap:8
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#e91e63',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  company: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },

  addButton: {
    backgroundColor: '#e91e63',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  btnContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    color: "#010101",
    fontWeight: "500"
}
});

export default ProductDetails;
