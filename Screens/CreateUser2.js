// React Native Navigation Drawer – Example using Latest Navigation Version //
// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData } from 'react-native';


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
          erro: '',
        };
      }

  render() {
    const {nome, cpf, telefone, email, senha, senha_conf } = this.state;
    
    
    
    const checkValues = (nome, cpf, telefone, email, senha, senha_conf) => {
        console.log('a')
        if(email === '' || senha === '' || senha_conf === ''){
            this.setState({erro: 'Verifique se todos os campos estão preenchidos'});
          } else if(senha !== senha_conf) {
            this.setState({erro: 'Senhas preenchidas diferentes'});
          } else {
            this.setState({erro: ''});
            createUser(nome, cpf, telefone, email, senha);
          }
        

      }
      
      const createUser = (nome, cpf, telefone, email, senha) => {
          console.log('b')
        fetch('http://192.168.15.14:3300/createUser',{
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
            senha: senha
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
             console.log(responseJson);
             this.props.navigation.navigate('Login')
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
      <Text>Crie uma senha:</Text>
      <TextInput style={styles.inputStyle} onChangeText={senha => this.setState({senha})}
                defaultValue={senha}/>
      <Text>Confirme sua senha:</Text>
      <TextInput style={styles.inputStyle} onChangeText={senha_conf => this.setState({senha_conf})}
                defaultValue={senha_conf}/>
                 <Text style={styles.errorText}>{this.state.erro}</Text>
    </View>
    <TouchableOpacity
                  onPress={()=>checkValues(nome, cpf, telefone, email, senha, senha_conf)}
                  style={styles.buttonEnter}><Text style={styles.buttonEnterText}>Cadastrar</Text></TouchableOpacity>

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
        fontFamily: 'Arial',
        fontSize: 15,
        color: "#000000",
      },
      errorText: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: "red",
        textAlign: "center",
      },
      inputStyle: {
        marginTop: 10,
        marginBottom: 10,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',
      },
      formTextBox: {
        paddingTop: 50,
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
      buttonCadastro: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
      },
      buttonCadastroText: {
        color: "blue"
      },
});
export default CreateUser2;