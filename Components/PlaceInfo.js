import 'react-native-gesture-handler';
import indicacao from '../images/user.png'

import React, { Component } from "react";
import { withNavigation } from 'react-navigation';
import {  View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

class PlaceInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            icon: this.props.icon,
            title: this.props.title,
            data: this.props.data,
        }

    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
      nextState.data = nextProps.data;
  }

    render(){
        const { navigation } = this.props;
        const { title, data } = this.state
        return (
            <View style={styles.item} >
                        
                <Image
                style={styles.logo}
                source={this.state.icon}
                />
                <View style={styles.itemInfo}>
                    <Text style={styles.textTitle}>{title}</Text>
                    <Text style={styles.textData}>{data}</Text>
                </View>

            </View>
          );
    }

  }

  export default withNavigation(PlaceInfo);


  const styles = StyleSheet.create({
    item: {
      paddingVertical: 40,
      flex:1,
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: '#e0e0e0',
      borderBottomWidth: 1,
    },
    itemInfo: {
      flex: 1,
      flexDirection: "column",
      marginLeft: 20,
    },
    textTitle: {
      fontSize: 15,
      fontWeight: "bold",
    },
    textData: {
        fontSize: 13,
        marginTop: 10,
    },
    logo: {
      width: 50,
      height: 50,
    },
  });