import 'react-native-gesture-handler';
import PlaceInfo from '../Components/PlaceInfo'
import Heart from '../images/heart.png'
import desHeart from '../images/des_heart.png'

import React, { Component } from "react";
import { withNavigation } from 'react-navigation';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';



class Place extends Component{

    constructor(props) {
        super(props);

        this.state = {
            place: this.props.navigation.getParam("place"),
            user: this.props.navigation.getParam("user"),
            isFavourites: false,
        }

    }


    addFavourite(){
      console.log(this.state)
      fetch('http://192.168.4.102:3300/favourite',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user_id: this.state.user.user_id,
              place_id: this.state.place.place_id,
          })
        })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isFavourites: true,
            })
          })
          .catch((error) => {
            console.error(error);
          });
    }

    removeFavourite(){
      console.log(this.state)
      fetch(`http://192.168.4.102:3300/favourite/${this.state.user.user_id}&${this.state.place.place_id}`,{
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({
              isFavourites: false,
            })
          })
          .catch((error) => {
            console.error(error);
          });
    }

    favourite(){
      console.log("Como ta: " + this.state.isFavourites)
      if(this.state.isFavourites == false){
        this.addFavourite()
      } else {
        this.removeFavourite()
      }
    }

    isFavourites(){
      console.log(this.state)
      fetch(`http://192.168.4.102:3300/favourite/${this.state.user.user_id}&${this.state.place.place_id}`,{
          method: 'GET',
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.length > 0){
              this.setState({
                isFavourites: true,
              })
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }

    componentDidMount(){
      console.log(this.state.place)
      this.isFavourites()
    }
    

    render(){
        const { navigation } = this.props;
        var imgSource = this.state.isFavourites? Heart : desHeart;
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../images/Estabelecimento.jpg')} style={styles.image}>
                    <View style={styles.placeHeaderBox}>
                        <View style={styles.favotiteBox}>
                            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                                <Image source={require('../images/arrow.png')} style={styles.favoriteIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.favourite()}}>
                                <Image source={imgSource}  style={styles.favoriteIcon}/>
                            </TouchableOpacity>  
                        </View>
                        <View>
                            <Text style={styles.namePlaceText}>{this.state.place.name}</Text>
                            <Text style={styles.addressPlaceText}>{this.state.place.endereco}</Text>
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
      fontFamily: 'Raleway-SemiBold',
      color: "white",
  },
  addressPlaceText: {
    fontFamily: 'Raleway-Italic',
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

