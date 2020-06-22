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
      fetch('http://192.168.4.102:3300/login',{
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
            this.props.navigation.navigate('Main', {user: responseJson[0]});
            
  
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
            <Text style={styles.formText}>Monitore 
            <Text style={styles.formTextBold}>{" "}aglomerações{" "}{"\n"}</Text>
            em estabelecimentos{"\n"}essenciais e saia de casa{"\n"} em
            <Text style={styles.formTextBold}>{" "}segurança{" "}</Text>
            </Text>
          </View> 
          <View style={styles.formTextBox}>
            <TextInput style={styles.inputStyle} placeholder="Email" name="email"         onChangeText={email => this.setState({email})}
              defaultValue={email} ></TextInput>
            <TextInput style={styles.inputStyle} placeholder="Senha" onChangeText={senha => this.setState({senha})}
              defaultValue={senha} secureTextEntry></TextInput>
            <Text style={styles.errorText}>{this.state.erro}</Text>
            <TouchableOpacity
                  onPress={()=>loginAuth(email, senha)}
                  style={styles.buttonEnter}><Text style={styles.buttonEnterText}>ENTRAR</Text></TouchableOpacity>
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
    fontFamily: 'Raleway-SemiBold',
    fontSize: 15,
    color: "#000000",
  },
  inputStyle: {
    fontFamily: "Raleway-Regular",
    marginTop: 10,
    marginBottom: 20,
    width: 300,
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 2,
  },
  formTextBox: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent:"center",
    paddingBottom: 40,
  },
  formInputBox: {
    alignItems: "center",
    justifyContent:"center",
  },
  errorText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 15,
    color: "#db5342",
    textAlign: "center",
  },
  formText: {
    fontFamily: 'Raleway-Light',
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
  },
  formTextBold: {
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    color: "#000000",
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
  cadastroText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  buttonCadastro: {
    alignItems: "center",
  },
  buttonCadastroText: {
    fontFamily: 'Raleway-SemiBold',
    color: "#578ee4",
    fontSize: 16,
    marginTop: "2%",
  },
  buttonEnter: {
    marginTop: "5%",
    backgroundColor: "#578ee4",
    paddingVertical: 14,
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 5,
  },
  buttonEnterText: {
    fontFamily: 'Raleway-Bold',
    color: "white",
    fontSize: 14,
    letterSpacing: 2,
  },
}); 



export default Login;