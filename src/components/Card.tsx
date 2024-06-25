import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const Card = ({ item, index }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <Pressable onPress={() => navigation.navigate('Product Details',item)}>
                {item.images.front ? (
                    <Image source={{ uri: item.images.front }} style={styles.image} />
                ) : (
                    <View style={styles.noImage}><Text style={{color:"#444"}}>No Image</Text></View>
                )}
                <View style={styles.infoContainer}>
                    <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                    {/* <Text style={styles.detail} numberOfLines={1}>GTIN: {item.gtin}</Text> */}
                    {/* <Text style={styles.detail} numberOfLines={1}>SKU Code: {item.sku_code}</Text> */}
                    <Text>
                        <Text style={styles.title}>Category: </Text>
                        <Text style={styles.detail} numberOfLines={2}>{item.main_category}, {item.category_level_1}, {item.category_level_2}</Text>
                    </Text>

                    <Text>
                        <Text style={styles.title}>Price: </Text>
                        <Text style={styles.price} numberOfLines={1}>{item.mrp.currency} {item.mrp.mrp} (min. {item.minimum_order_quantity ? item.minimum_order_quantity : "1"} {item.minimum_order_quantity_unit})</Text>
                    </Text>
                    <Text>
                        <Text style={styles.title}>Company: </Text>
                        <Text style={styles.company} numberOfLines={1}>{item.company_detail.name}</Text>
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 10,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 180,
    },
    noImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        padding: 16,
        gap: 4
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    detail: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 14,
        color: '#e91e63',
        fontWeight: 'bold',
    },
    company: {
        fontSize: 14,
        color: '#333',
    },
    title: {
        fontSize: 14,
        color: "#010101",
        fontWeight: "500"
    }
});

export default Card;
