import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCart } from '../context/cartContext'
import { useNavigation } from '@react-navigation/native'
import { useCameraPermission } from 'react-native-vision-camera'

const CartIcon = () => {
    const { cart } = useCart()
    const navigation = useNavigation()
    const { hasPermission, requestPermission } = useCameraPermission()

    const [total, setTotal] = useState(0)
    const calculateItems = async () => {
        try {
            let count = 0;
            if (cart && Array.isArray(cart)) {
                cart.forEach((item) => {
                    count += item?.quantity || 0;
                });
            }
            console.log("COUNT IS", count);
            setTotal(count)
        } catch (error) {
            console.error('Error calculating items:', error);
        }
    };

    useEffect(() => {
        calculateItems()
    }, [cart])

    const navigateToBarcode=async()=>{
        if (!hasPermission) {
            let permission=await requestPermission()
            if(permission){
                navigation.navigate('Barcode')
            }
        }else{
            navigation.navigate('Barcode')
        }
    }

    return (
        <View style={styles.container}>
            <IconMat name={"barcode-scan"} size={30} color={"#000"} onPress={navigateToBarcode}
            />
            <Icon name={"shoppingcart"} size={30} color={"#000"} onPress={() => navigation.navigate('Cart')}
            />
            <View style={styles.tag}>
                <Text style={styles.tagText}>{total}</Text>
            </View>
        </View>
    )
}

export default CartIcon

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        gap: 12
    },
    tag: {
        height: 15,
        width: 15,
        borderRadius: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0
    },
    tagText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 10,
    }
})