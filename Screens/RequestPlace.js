// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';

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
      error: '',
    };
  }

  sendRequestPlace(name, cnpj, area, capacidade, endereco){
    if(name === '' || cnpj === '' || area === '' || capacidade === '' || endereco === '' ){
      this.setState({error: "Preencha todos os campos."})
      return
    }
    this.setState({error: ''})
    console.log(this.state)
    fetch('http://192.168.0.104:3300/createRequest',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.nome,
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
        })
        .catch((error) => {
          //  console.error(error);
        });
  }

  render() {
    const { name, cnpj, area, capacidade, endereco, isLoading } = this.state;
    
    return (
      <KeyboardAwareScrollView 
        style={styles.container}
        scrollEnabled={false}
        resetScrollToCoords={{ x: 0, y: 0 }}>

          <View style={styles.formTextBox}>
            <Text style={styles.formText}>Cadastrar estabelecimento</Text>

            <View style={styles.inputBox}>
                <Text style={styles.formLabel}>Nome</Text>
                <TextInput style={styles.inputStyle} placeholder="Nome fantasia do estabelecimento" name="name"
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

            <View style={styles.textInfoBox}>
              <Text style={styles.textInfo}>{this.state.error}</Text>
            </View>

            <TouchableOpacity
                  onPress={()=>this.sendRequestPlace(name, cnpj, area, capacidade, endereco)}
                  style={styles.buttonEnter}><Text style={styles.buttonEnterText}>ENVIAR REQUISIÇÃO</Text></TouchableOpacity>

            
            <View style={styles.textInfoBox}>
                <Text style={styles.textInfo}>*SUJEITO A APROVAÇÃO</Text>
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
    marginBottom: 10,
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
  textInfo: {
      color: "red",
      fontSize: 12,
  },
  textInfoBox: {
      // flex: 1,
      // justifyContent: "flex-start",
      // alignItems: "flex-start",
      paddingVertical: 10,
  },
  buttonEnter: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    width: 300,
    borderRadius:10,
    alignItems: "center"

  },
  buttonEnterText: {
    color: "white",
    fontSize: 18
  },
}); 



