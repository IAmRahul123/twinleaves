import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { useNavigation } from '@react-navigation/native'
import { useCart } from '../context/cartContext'

const Barcode = () => {
  const { hasPermission, requestPermission } = useCameraPermission()
  const navigation = useNavigation()

  const { products } = useCart()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [])


  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'ean-8', 'upc-a', 'upc-e'],
    onCodeScanned: (codes) => {
      // "gtin": "8906161670378",

      if (codes[0]?.value) {
        let result=products?.find((item) => item?.gtin == codes[0]?.value)

        if(result){
          navigation.navigate("Product Details",result)
        }
        // navigation.navigate("Product Details")
      }
      console.log(codes[0]?.value)
      // console.log(`Scanned ${codes.length} codes!`)
    }
  })
  const device = useCameraDevice('back')

  if (device == null) return <View><Text>No Camera</Text></View>
  return (
    <View style={styles.container}>
      <Camera device={device} isActive={true} codeScanner={codeScanner} style={StyleSheet.absoluteFill} />
    </View>
  )
}

export default Barcode

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})