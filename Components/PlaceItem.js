import 'react-native-gesture-handler';

import React, { Component } from "react";
import { withNavigation } from 'react-navigation';
import {  View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

class PlaceItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            placeName: this.props.place.name,
            placeCNPJ: this.props.place.cnpj,
        }

    }

    render(){
        const { navigation } = this.props;
        return (
            <TouchableOpacity onPress={() => {navigation.navigate('Place', {place: this.props.place})}}>
              <View style={styles.item} >
        
              <Image
                style={styles.logo}
                source={require('../images/user.png')}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.title}>{this.state.placeName}</Text>
                <Text style={styles.subtitle}>{this.state.placeCNPJ}</Text>
              </View>
        
              </View>
            </TouchableOpacity>
          );
    }

  }

  export default withNavigation(PlaceItem);


  const styles = StyleSheet.create({
    item: {
      backgroundColor: '#ffffff',
      padding: 20,
      flex:1,
      flexDirection: "row",
      alignItems: "center",
      borderColor: '#e0e0e0',
      borderWidth: 1,
      borderTopWidth: 0,
    },
    itemInfo: {
      flex: 1,
      flexDirection: "column",
      marginLeft: 30,
    },
    title: {
      fontSize: 20,
      color: "#707070",
      fontWeight: "bold",
    },
    subtitle: {
      color: "#707070",
      fontSize: 15,
    },
    logo: {
      width: 50,
      height: 50,
    },
  });