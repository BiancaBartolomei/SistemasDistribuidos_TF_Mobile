// React Native Navigation Drawer – Example using Latest Navigation Version //
// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData } from 'react-native';


class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cpf: '',
      telefone: '',
      error: ''
    };
  }

  render() {

    const { nome, cpf, telefone } = this.state;
    const goNextPage = (nome, cpf, telefone) => {
      if(nome === '' || cpf === '' || telefone === ''){
        this.setState({erro: 'Verifique se todos os campos estão preenchidos'});
      } else {
        this.setState({erro: ''});
        this.props.navigation.navigate('CreateUser2', {
          nome: nome,
          cpf: cpf,
          telefone: telefone,
        })
      }
    }
  


    return (

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
      <TextInput style={styles.inputStyle} 
                 onChangeText={nome => this.setState({nome})}
                defaultValue={nome}/>
      <Text>CPF:</Text>
      <TextInput style={styles.inputStyle}
                 onChangeText={cpf => this.setState({cpf})}
                 defaultValue={cpf}/>
      <Text>Telefone:</Text>
      <TextInput style={styles.inputStyle}
                 onChangeText={telefone => this.setState({telefone})}
                 defaultValue={telefone}/>
                     <Text style={styles.errorText}>{this.state.erro}</Text>
    </View>

    <TouchableOpacity
               onPress = {() => goNextPage(nome, cpf, telefone)}
                style={styles.buttonCadastro}><Text style={styles.buttonCadastroText}>Continuar</Text></TouchableOpacity>


    </View>
  </View>
  );
}
};



CreateUser.navigationOptions = {
  title: 'CreateUser',
  headerShown: false,
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
  errorText: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: "red",
    textAlign: "center",
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
export default CreateUser;