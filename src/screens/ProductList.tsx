import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import products from '../products.json'
import Card from '../components/Card'
import { useCart } from '../context/cartContext'

const ProductList = () => {
  // const [ProductList, setProductList] = useState(products?.products)
  const { getProducts, loading, products } = useCart()

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {products?.length == 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? <ActivityIndicator size={'large'} color={"#e91e63"} />
          : <Text style={{ color: "#444" }}>No Products found !</Text>}
      </View> :
        <FlatList
          data={products}
          renderItem={({ item, index }) => {
            return (
              <Card item={item} index={index} />
            )

          }}
          contentContainerStyle={{ paddingVertical: 12 }}
        />}
    </SafeAreaView>
  )
}

export default ProductList

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  }
})