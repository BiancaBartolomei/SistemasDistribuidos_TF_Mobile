// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

class RequestPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.navigation.getParam("user"),
      nome: '',
      cnpj: '',
      area: '',
      capacidade: '',
      endereco: '',
      isLoading: true,
    };
  }

  render() {
    const { name, cnpj, area, capacidade, endereco, isLoading } = this.state;

    const errorMessage=()=>{
      Alert.alert(
      'Erro',
      'Por favor, preencha todos os campos.',
      [

      ],
      { cancelable: true }
      );
    }

    const successMessage=()=>{
      Alert.alert(
      'Requisição enviada!',
      'Sua requisição entrará em análise e, se aprovada, seu estabelecimento passará a fazer parte de nosso sistema.',
      [

      ],
      { cancelable: true }
      );
    }

    const sendRequestPlace=(name, cnpj, area, capacidade, endereco)=>{
      if(name === '' || cnpj === '' || area === '' || capacidade === '' || endereco === '' ){
        errorMessage();
        return
      }
      console.log(this.state)
      fetch('http://192.168.4.102:3300/createRequest',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              nome: this.state.nome,
              cnpj: this.state.cnpj,
              area: this.state.area,
              maxQnt: this.state.capacidade,
              userId: this.state.user.user_id,
              endereco: this.state.endereco,
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
             console.log("Recebeu: " + responseJson);
             successMessage();
          })
          .catch((error) => {
            //  console.error(error);
          });
    }
    
    return (
      <KeyboardAwareScrollView 
        style={styles.container}
        scrollEnabled={false}
        resetScrollToCoords={{ x: 0, y: 0 }}>

          <View style={styles.formTextBox}>
            <Text style={styles.formTitle}>Cadastrar estabelecimento</Text>

            <View style={styles.inputBox}>
                <Text style={styles.formLabel}>Nome</Text>
                <TextInput style={styles.inputStyle} placeholder="Nome do estabelecimento" name="name"
                onChangeText={nome => this.setState({nome})}
                defaultValue={name} >
                </TextInput>
            </View>

            <View style={styles.inputBox}>
                <Text style={styles.formLabel}>Endereço</Text>
                <TextInput style={styles.inputStyle} placeholder="Endereço do estabelecimento" name="endereco"
                onChangeText={endereco => this.setState({endereco})}
                defaultValue={endereco} >
                </TextInput>
            </View>

            <View style={styles.inputBox}>
                <Text style={styles.formLabel}>CNPJ</Text>
                <TextInput style={styles.inputStyle} placeholder="00.000.000/0000-00" name="cnpj"
                onChangeText={cnpj => this.setState({cnpj})}
                defaultValue={cnpj} >
                </TextInput>
            </View>

            <View style={styles.inputBox}>
                <Text style={styles.formLabel}>Área</Text>
                <TextInput style={styles.inputStyle} placeholder="Área do estabelecimento em m²" name="area"
                onChangeText={area => this.setState({area})}
                defaultValue={area}
                keyboardType={"numeric"} >
                </TextInput>
            </View>

            <View style={styles.inputBox}>
                <Text style={styles.formLabel}>Capacidade</Text>
                <TextInput style={styles.inputStyle} placeholder="Quantidade máxima de pessoas" name="capacidade"
                onChangeText={capacidade => this.setState({capacidade})}
                defaultValue={capacidade} 
                keyboardType={"numeric"}>
                </TextInput>
            </View>

            <TouchableOpacity
                  onPress={() => sendRequestPlace(name, cnpj, area, capacidade, endereco)}
                  style={styles.buttonEnter}><Text style={styles.buttonEnterText}>ENVIAR REQUISIÇÃO</Text></TouchableOpacity>

            
            <View style={styles.textInfoBox}>
                <Text style={styles.textInfo}>*SUJEITO À APROVAÇÃO</Text>
            </View>
        </View>  
      </KeyboardAwareScrollView> 
      
  );
  }
};



RequestPlace.navigationOptions = {
  title: 'RequestPlace',
  headerShown: false,
}

export default RequestPlace


const styles = StyleSheet.create({
  container: {
      flex: 1,
      color: '#ffff'
  },
  formLabel: {
      fontFamily: 'Raleway-Bold',
      fontSize: 15,
      color: "#000000",
  },
  inputStyle: {
      fontFamily: 'Raleway-Regular',
      marginTop: 10,
      marginBottom: 20,
      width: 300,
      height: 40,
      paddingHorizontal: 20,
      borderRadius: 5,
      backgroundColor: '#ffffff',
      shadowOffset:{  width: 10,  height: 10,  },
      shadowColor: 'black',
      shadowOpacity: 1.0,
      elevation: 2,
  },
  formTextBox: {
      paddingTop: 40,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 40
  },
  formInputBox: {
      alignItems: "center",
      justifyContent: "center",
  },
  formTitle: {
      fontFamily: 'Raleway-Light',
      fontSize: 23,
      color: "#000000",
      textAlign: "center",
      marginBottom: "10%",
      width: "80%",
  },
  buttonEnter: {
      marginTop: "5%",
      backgroundColor: "#42b8df",
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
      letterSpacing: 1.5,
  },
  textInfo: {
      marginTop: "8%",  
      textAlign: "left",
      color: "#db5342",
      fontFamily: 'Raleway-SemiBold',
      fontSize: 13,
  },
}); 



