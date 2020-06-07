// React Native Navigation Drawer – Example using Latest Navigation Version //
// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData } from 'react-native';


const CreateUser = () => (


    <View style={styles.container}>
    <View style={styles.formTextBox}>
      <Text style={styles.formText}>Precisamos das seguintes 
      <Text style={styles.formTextBold}>{" "}informações{" "}</Text> 
      para dar {"\n"}
      continuidade ao seu {"\n"}
      cadastro</Text>
    </View>   
    <View style={styles.formInputBox}>
    <View >
      <Text style={styles.formLabel}>Nome completo:</Text>
      <TextInput style={styles.inputStyle}></TextInput>
      <Text>CPF:</Text>
      <TextInput style={styles.inputStyle}></TextInput>
      <Text>Telefone:</Text>
      <TextInput style={styles.inputStyle}></TextInput>
    </View>
    <View style={styles.formButton}>  
      <Button title="Continuar" style={styles.formButtonText}
      onPress = {() => NavigationContainer.navigate("CreatUser2")}
      />   
    </View>
    </View>
  </View>
  );


CreateUser.navigationOptions = {
  title: 'CreateUser',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#ffff'
  },
  formLabel: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: "#000000",
  },
  inputStyle: {
    marginTop: 10,
    marginBottom: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  formTextBox: {
    paddingTop: 70,
    alignItems: "center",
    justifyContent:"center",
    paddingBottom: 40
  },
  formInputBox: {
    alignItems: "center",
    justifyContent:"center",
  },
  formText: {
    fontFamily: 'Arial',
    fontSize: 25,
    color: "#000000",
    textAlign: "center",
  },
  formTextBold: {
    fontFamily: 'Arial',
    fontSize: 25,
    color: "#000000",
    fontWeight: "bold",
  },
  formButton: {
    marginLeft: "65%",
    justifyContent: "flex-end", 
    alignItems: "flex-end"
  },
  formButtonText : {
    color: '#000000',
    fontSize: 15,
  },
});
export default CreateUser;