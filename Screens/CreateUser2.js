// React Native Navigation Drawer – Example using Latest Navigation Version //
// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData, Alert } from 'react-native';


class CreateUser2 extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.params);
        this.state = {
          nome: this.props.navigation.state.params.nome,
          cpf: this.props.navigation.state.params.cpf,
          telefone: this.props.navigation.state.params.telefone,
          email: '',
          senha: '',
          senha_conf: '',
        };
      }

  render() {
    const {nome, cpf, telefone, email, senha, senha_conf } = this.state;
    
    const emptyFields=()=>{
      Alert.alert(
      'Erro',
      'Por favor, preencha todos os campos.',
      [

      ],
      { cancelable: true }
      );
    }

    const differentPasswords=()=>{
      Alert.alert(
      'Erro',
      'As senhas preenchidas são diferentes!',
      [

      ],
      { cancelable: true }
      );
    }
    
    const checkValues = (nome, cpf, telefone, email, senha, senha_conf) => {
        console.log('a')
        if(email === '' || senha === '' || senha_conf === ''){
            emptyFields();
          } else if(senha !== senha_conf) {
            differentPasswords();
          } else {
            createUser(nome, cpf, telefone, email, senha);
          }
      }
      
      const createUser = (nome, cpf, telefone, email, senha) => {
          console.log('b')
        fetch('http://192.168.15.14:3300/createUser', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome: nome, 
            cpf: cpf,
            telefone: telefone,
            email: email,
            senha: senha,
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
             console.log(responseJson);
             this.props.navigation.navigate('Login');
          })
          .catch((error) => {
             console.error(error);
          });
      }
    
    
    return (

    <View style={styles.container}>
    <View style={styles.formTextBox}>
      <Text style={styles.formText}>
          Quase lá! {"\n"}
          Entre com os dados que {"\n"}
          você irá utilizar para {"\n"}
          ter
      <Text style={styles.formTextBold}>{" "}acesso{" "}</Text> 
      ao app: {"\n"}
      </Text>
    </View>   
    <View style={styles.formInputBox}>
    <View >
      <Text style={styles.formLabel}>Insira um email válido:</Text>
      <TextInput style={styles.inputStyle} 
                onChangeText={email => this.setState({email})}
                defaultValue={email}/>
      <Text style={styles.formLabel}>Crie uma senha:</Text>
      <TextInput style={styles.inputStyle} onChangeText={senha => this.setState({senha})}
                defaultValue={senha} secureTextEntry></TextInput>
      <Text style={styles.formLabel}>Confirme sua senha:</Text>
      <TextInput style={styles.inputStyle} onChangeText={senha_conf => this.setState({senha_conf})}
                defaultValue={senha_conf} secureTextEntry></TextInput>
    </View>
    <TouchableOpacity
                  onPress={()=>checkValues(nome, cpf, telefone, email, senha, senha_conf)}
                  style={styles.buttonEnter}><Text style={styles.buttonEnterText}>CADASTRAR</Text></TouchableOpacity>

    </View>
  </View>
  );
}
};



CreateUser2.navigationOptions = {
  title: 'CreateUser2',
  headerShown: false,
}

const styles = StyleSheet.create({
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
        paddingTop: 70,
        alignItems: "center",
        justifyContent:"center",
        paddingBottom: 40,
      },
      formInputBox: {
        alignItems: "center",
        justifyContent:"center",
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
export default CreateUser2;