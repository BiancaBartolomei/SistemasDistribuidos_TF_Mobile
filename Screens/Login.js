// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData } from 'react-native';




const Login = ({ navigation }) => (
    <View>
      <Button title = "Cadastrar"
      onPress={()=>navigation.navigate('CreateUser')}/>
    </View> 
    
);

Login.navigationOptions = {
  title: 'Login',
}
export default Login;