import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/cartContext';
import { LoginProvider } from './src/context/loginContext';
import MainNavigator from './src/components/MainNavigator';

const App = () => {
  return (
    <LoginProvider>
      <CartProvider>
        <NavigationContainer>
          <MainNavigator/>
        </NavigationContainer>
      </CartProvider>
    </LoginProvider>
  )
}

export default App

const styles = StyleSheet.create({})