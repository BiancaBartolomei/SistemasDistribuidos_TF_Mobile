// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FormData } from 'react-native';

class RequestPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      cnpj: '',
      area: '',
      capacidade: '',
      userId: '',
      isLoading: true
    };
  }

  sendRequestPlace(){
    fetch('http://192.168.0.109:3300/createRequest',{
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
            userId: this.state.userId,
            placeId: 3,
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

  render() {
    const { name, cnpj, area, capacidade, isLoading } = this.state;
    
    return (
      <View>
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
                defaultValue={area} >
                </TextInput>
            </View>

            <View style={styles.inputBox}>
                <Text style={styles.formLabel}>Capacidade</Text>
                <TextInput style={styles.inputStyle} placeholder="Quantidade máxima de pessoas" name="capacidade"
                onChangeText={capacidade => this.setState({capacidade})}
                defaultValue={capacidade} >
                </TextInput>
            </View>


            <Button title = "ENVIAR REQUISIÇÃO"
                onPress={()=>this.sendRequestPlace()}
                style={styles.buttonEnter}/>
            
            <View style={styles.textInfoBox}>
                <Text style={styles.textInfo}>*SUJEITO A APROVAÇÃO</Text>
            </View>
        </View>  
      </View> 
      
  );
  }
};


export default withNavigation(RequestPlace)


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
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingTop: 20,
  }
}); 



