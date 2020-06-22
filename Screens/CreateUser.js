// React Native Navigation Drawer – Example using Latest Navigation Version //
// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData, Alert } from 'react-native';


class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cpf: '',
      telefone: '',
    };
  }

  render() {

    const { nome, cpf, telefone } = this.state;

    const errorMessage=()=>{
      Alert.alert(
      'Erro',
      'Por favor, preencha todos os campos.',
      [

      ],
      { cancelable: true }
      );
    }

    const goNextPage = (nome, cpf, telefone) => {
      if(nome === '' || cpf === '' || telefone === ''){
        errorMessage();
      } else {
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
      <Text style={styles.formLabel}>CPF:</Text>
      <TextInput style={styles.inputStyle}
                 onChangeText={cpf => this.setState({cpf})}
                 defaultValue={cpf}/>
      <Text style={styles.formLabel}>Telefone:</Text>
      <TextInput style={styles.inputStyle}
                 onChangeText={telefone => this.setState({telefone})}
                 defaultValue={telefone}/>
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
    paddingTop: 100,
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
});
export default CreateUser;