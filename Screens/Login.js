// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      data: [],
      isLoading: true
    };
  }

  

  render() {
    const { email, senha, isLoading } = this.state;
    
  const loginAuth = (email, senha) => {
    fetch('http://192.168.15.14:3300/login',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         //FIX
         this.props.navigation.navigate('Main')
      })
      .catch((error) => {
         console.error(error);
      });
  }
    return (
      <View>
          <View style={styles.formTextBox}>
        <Text style={styles.formText}>Precisamos das seguintes 
        <Text style={styles.formTextBold}>{" "}informações{" "}</Text> 
        para dar {"\n"}
        continuidade ao seu {"\n"}
        cadastro</Text>
        <TextInput style={styles.inputStyle} placeholder="Email" name="email"         onChangeText={email => this.setState({email})}
          defaultValue={email} ></TextInput>
        <TextInput style={styles.inputStyle} placeholder="Senha" onChangeText={senha => this.setState({senha})}
          defaultValue={senha}></TextInput>
        <Button title = "Cadastrar"
        onPress={()=>loginAuth(email, senha)}
        style={styles.buttonEnter}/>
      </View>  
      <Text>{this.state.data.body}</Text>
      <Text>Não possui conta?</Text>
        <Button title = "Cadastrar"
        onPress={()=>this.props.navigation.navigate('CreateUser')}/>
      </View> 
      
  );
  }
};


Login.navigationOptions = {
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
  buttonEnter: {

  },
}); 



export default Login