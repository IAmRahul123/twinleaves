// src/components/MainNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import ProductList from '../screens/ProductList';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';
import Barcode from '../screens/Barcode';
import CartIcon from '../components/CartIcon';
import { useLogin } from '../context/loginContext';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <CartIcon />
        )
      }}
    >
      {!isLoggedIn ? (
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Product List" component={ProductList} />
          <Stack.Screen name="Product Details" component={ProductDetails} />
          <Stack.Screen name="Cart" component={Cart} options={{ headerRight: () => (<></>) }} />
          <Stack.Screen name="Barcode" component={Barcode} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
