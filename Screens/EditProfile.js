// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.navigation.getParam("user"),
            name: this.props.navigation.getParam("user").name,
            cpf: this.props.navigation.getParam("user").cpf,
            phone: this.props.navigation.getParam("user").telefone,
            email: this.props.navigation.getParam("user").email,
            password: this.props.navigation.getParam("user").password,
        };
    }

    render() {

        const { navigation } = this.props; 

        const deleteUser=()=>{
            fetch(`http://192.168.4.102:3300/deleteUsers/${this.state.user.user_id}`, {
                method: 'DELETE',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    navigation.popToTop();
                })
                .catch((error) => {
                    console.error(error);
                });
      }

        const confirmDeleteUser=()=>{
            Alert.alert(
            'Apagar conta',
            'Tem certeza?',
            [
                {text: 'Sim', onPress: () => deleteUser()},
                {text: 'Cancelar', onPress: () => console.log('Operação cancelada'), style: 'cancel'},
            ],
            { cancelable: true }
            );
        }

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
            'Perfil alterado com sucesso',
            'Você verá as alterações em seu próximo login.',
            [
    
            ],
            { cancelable: true }
            );
        }

        const sendNewInfo=(name, cpf, phone, email, password)=>{
            if(name === '' || cpf === '' || phone === '' || email === '' || password === '' ){
              errorMessage();
              return
            }
            console.log(this.state)
            fetch('http://192.168.4.102:3300/editProfile', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: this.state.user.user_id,
                    name: this.state.name,
                    cpf: this.state.cpf,
                    phone: this.state.phone,
                    email: this.state.email,
                    password: this.state.password,
                })
              })
                .then((response) => response.json())
                .then((responseJson) => {
                   console.log(responseJson);
                   successMessage();
                })
                .catch((error) => {
                    console.error(error);
                });
          }

        return (
          <KeyboardAwareScrollView 
            style={styles.container}
            scrollEnabled={false}
            resetScrollToCoords={{ x: 0, y: 0 }}>
    
              <View style={styles.formTextBox}>
                <Text style={styles.formTitle}>Editar informações pessoais</Text>
    
                <View style={styles.inputBox}>
                    <Text style={styles.formLabel}>Nome</Text>
                    <TextInput style={styles.inputStyle} onChangeText={(text) => this.setState({name: text})} defaultValue={this.state.name}>
                    </TextInput>
                </View>
    
                <View style={styles.inputBox}>
                    <Text style={styles.formLabel}>CPF</Text>
                    <TextInput style={styles.inputStyle} onChangeText={(text) => this.setState({cpf: text})} defaultValue={this.state.cpf}>
                    </TextInput>
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.formLabel}>Telefone</Text>
                    <TextInput style={styles.inputStyle} onChangeText={(text) => this.setState({phone: text})} defaultValue={this.state.phone}>
                    </TextInput>
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.formLabel}>E-mail</Text>
                    <TextInput style={styles.inputStyle} onChangeText={(text) => this.setState({email: text})} defaultValue={this.state.email}>
                    </TextInput>
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.formLabel}>Nova senha</Text>
                    <TextInput style={styles.inputStyle} onChangeText={(text) => this.setState({password: text})} defaultValue={this.state.password} secureTextEntry>
                    </TextInput>
                </View>
    
                <TouchableOpacity
                      onPress={() => sendNewInfo(this.state.name, this.state.cpf, this.state.phone, this.state.email, this.state.password)}
                      style={styles.buttonEnter}><Text style={styles.buttonEnterText}>SALVAR</Text>
                </TouchableOpacity>

                <View style={styles.buttonDelete}>        
                    <Image source={require('../images/trash.png')} style={styles.deleteIcon}/>
                    <Text style={styles.buttonDeleteText} onPress={confirmDeleteUser}>APAGAR CONTA</Text>
                </View>

            </View>  
          </KeyboardAwareScrollView> 
          
      );
      }
    };

EditProfile.navigationOptions = {
    title: 'EditProfile',
    headerShown: false,
}

export default EditProfile

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
        letterSpacing: 2,
    },
    buttonDelete: {
        marginTop: "8%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonDeleteText: {
        textAlign: "left",
        color: "#db5342",
        fontFamily: 'Raleway-SemiBold',
        fontSize: 13,
    },
    deleteIcon: {
        width: 17,
        height: 17,
        marginRight: "2%",
    },
}); 