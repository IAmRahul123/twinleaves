import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import products from '../products.json'
import Card from '../components/Card'

const URL="https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product"

const ProductList = () => {
    const [ProductList, setProductList] = useState(products?.products)
    const getProducts=async()=>{
        try {
            const res=await axios.post(URL, {
                "page": "1",
                "pageSize": "10",
                "sort": {
                "creationDateSortOption": "DESC"
                }
                })
                console.log("RESSSSSS",res?.data)
                setProductList(res?.data?.products)
        } catch (error) {
            console.log("ERROR",error)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
    
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={ProductList} 
        renderItem={({item,index})=>{
        return(
            <Card item={item} index={index}/>
        )
        
      }}
      contentContainerStyle={{paddingVertical:12}}
      />
    </SafeAreaView>
  )
}

export default ProductList

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    flex:1,
  }
})