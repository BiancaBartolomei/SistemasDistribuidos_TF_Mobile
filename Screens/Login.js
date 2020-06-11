// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData, ImageBackground } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      erro: '',
    };
  }


  render() {
    const { email, senha} = this.state;
    
  const loginAuth = (email, senha) => {
    if(email === '' || senha === ''){
        this.setState({erro: "Preencha o campo de email e senha corretamente."})
    } else {
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
          if(responseJson.length === 0){
            this.setState({erro: "Usuário e/ou senha incorreta."})
          } else {
            this.setState({erro: ""})
            this.props.navigation.navigate('Main', responseJson[0]);
  
          }
        })
        .catch((error) => {
           console.error(error);
        });
    }
    
  }
    return (
      <ImageBackground source={require('mobile/Assets/Login.jpg')} style={styles.image} >
        <View>
          <View style={styles.formTextBox}>
            <Text style={styles.formText}>Precisamos das seguintes 
            <Text style={styles.formTextBold}>{" "}informações{" "}</Text> 
            para dar {"\n"}
            continuidade ao seu {"\n"}
            cadastro</Text>
          </View> 
          <View style={styles.formTextBox}>
            <TextInput style={styles.inputStyle} placeholder="Email" name="email"         onChangeText={email => this.setState({email})}
              defaultValue={email} ></TextInput>
            <TextInput style={styles.inputStyle} placeholder="Senha" onChangeText={senha => this.setState({senha})}
              defaultValue={senha}></TextInput>
            <Text style={styles.errorText}>{this.state.erro}</Text>
            <TouchableOpacity
                  onPress={()=>this.props.navigation.navigate('CreateUser')}
                  style={styles.buttonEnter}><Text style={styles.buttonEnterText}>Entrar</Text></TouchableOpacity>
          </View>
        <Text style={styles.cadastroText}>Não possui conta?</Text>
        <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('CreateUser')}
                style={styles.buttonCadastro}><Text style={styles.buttonCadastroText}>Cadastre-se</Text></TouchableOpacity>
        </View> 
      </ImageBackground>
      
  );
  }
};


Login.navigationOptions = {
  title: 'CreateUser',
  headerShown: false,
}



const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
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
    paddingTop: 40,
    alignItems: "center",
    justifyContent:"center",
    paddingBottom: 25
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
  errorText: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: "red",
    textAlign: "center",
  },
  cadastroText: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: "black",
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
    backgroundColor: 'blue',
    paddingVertical: 12,
    width: 300,
    borderRadius:5,
    alignItems: "center"

  },
  buttonEnterText: {
    color: "white",
    fontSize: 18
  },
  buttonCadastro: {
    alignItems: "center",
  },
  buttonCadastroText: {
    color: "blue"
  },
}); 



export default Login;