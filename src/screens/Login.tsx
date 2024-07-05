import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useLogin } from '../context/loginContext';
import { CommonActions } from '@react-navigation/native';
import Config from 'react-native-config'

const Login = ({ navigation }) => {
  const { login } = useLogin();

  const configure = async () => {
    await GoogleSignin.configure();
  }
  useEffect(() => {
    configure()
  }, [])


  const authenticate = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      await login(user.id)
      // navigation.navigate("Product List")
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Product List' }],
      // });
    } catch (error) {
      console.log("GETTING ERROR FROM GOOGLE SIGN IN", error)

    }
  };

  console.log("ConfigConfig",Config)
  return (
    <View style={styles.container}>
      <Text>{Config?.NODE_ENV}</Text>
      <TouchableOpacity onPress={authenticate} style={styles.btn}>
        <Image source={require('../assets/google-logo.png')} style={{}} resizeMode='contain' style={{ height: 25, width: 25 }} />
        <Text style={styles.text}>Sign In With Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#d6d6d6",
    elevation: 4,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    gap: 12
  },
  text: {
    color: "#444",
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: "#fff"
  }
})