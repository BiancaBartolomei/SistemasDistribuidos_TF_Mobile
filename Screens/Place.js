import 'react-native-gesture-handler';
import PlaceInfo from '../Components/PlaceInfo'

import React, { Component } from "react";
import { withNavigation } from 'react-navigation';
import { Button, StyleSheet, View, FlatList, TextInput, Image, Text, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';



class Place extends Component{

    constructor(props) {
        super(props);

        this.state = {
            place: this.props.navigation.getParam("place")
        }

    }
    

    render(){
        const { navigation } = this.props;
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../images/Estabelecimento.jpg')} style={styles.image}>
                    <View style={styles.placeHeaderBox}>
                        <View style={styles.favotiteBox}>
                            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                                <Image source={require('../images/arrow.png')} style={styles.favoriteIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../images/heart.png')} style={styles.favoriteIcon}/>
                            </TouchableOpacity>  
                        </View>
                        <View>
                            <Text style={styles.namePlaceText}>{this.state.place.name}</Text>
                            <Text style={styles.addressPlaceText}>{this.state.place.cnpj}</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.placeInfoBox}>
                    <PlaceInfo 
                        icon={require('../images/user.png')}
                        title="Indicação atual"
                        data="TODO"
                    />

                    <PlaceInfo 
                        icon={require('../images/user.png')}
                        title="Porte do estabelecimento"
                        data="TODO"
                    />                    

                    <PlaceInfo 
                        icon={require('../images/user.png')}
                        title="Quantidade máxima de pessoas:"
                        data="TODO"
                    />                    

                    <PlaceInfo 
                        icon={require('../images/user.png')}
                        title="Melhor horário"
                        data="TODO"
                    />                    

                    <PlaceInfo 
                        icon={require('../images/user.png')}
                        title="Horário de pico"
                        data="TODO"
                    />
                </View>
            </View>
      
          )
    }
  }


export default withNavigation(Place);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#ffff',
    height: StatusBar.currentHeight,
  },
  placeHeaderBox: {
    justifyContent: "space-between",
    alignContent: "space-between",
    flex: 1,
    flexDirection: "column",
    paddingBottom: 20,
    padding: "5%",
  },
  placeInfoBox: {
    marginBottom: 40,
    padding: "5%",
  },
  namePlaceText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
  },
  addressPlaceText: {
    color: "white",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  favotiteBox: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  }
});

