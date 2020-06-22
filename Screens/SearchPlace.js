import 'react-native-gesture-handler';
import PlaceItem from '../Components/PlaceItem'

import React, { Component } from "react";
import { withNavigation } from 'react-navigation';
import { Button, StyleSheet, View, FlatList, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';




class SearchPlace extends Component {

  constructor(props) {
    super(props);


    this.state = {
      user: this.props.navigation.getParam("user"),
      data: [],
      search: this.props.navigation.getParam('search'),
      isLoading: true
    };
  }


  makeRemoteRequest(){
    this.value = this.state.search.replace(" ", "_")
    const url = `http://192.168.4.102:3300/place/${this.value}`;
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        console.log(this.state.search)
        this.setState({data: res})
      })
      .catch(error => {
        console.log(error)
      });
  };

  componentDidMount(){
    this.makeRemoteRequest()
  }

  render(){
    const { navigation } = this.props;
    return(
      <View style={styles.container}>
        <ImageBackground source={require('../images/Estabelecimento.jpg')} style={styles.image}>
          <View style={styles.searchHeader}> 
            <View style={styles.searchBox}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                                    <Image source={require('../images/arrow.png')} style={styles.backIcon}/>
                                </TouchableOpacity>
              <TextInput style={styles.searchInput}
                        value={this.state.search}
                        onChangeText={(text) => {this.setState({search: text}); this.makeRemoteRequest()}}
                        onSubmitEditing={(event) => this.makeRemoteRequest()}          
              />
            </View>
          </View>
        </ImageBackground>

        <View style={styles.listBox}>
        <FlatList
        data={this.state.data}
        renderItem={({ item }) => <PlaceItem place={item} user={this.state.user}/>}
        keyExtractor={item => item.place_id.toString()}
      />
        </View>


      </View>

    )
  }
    
}

  SearchPlace.navigationOptions = {
    title: 'Search Place',
  }
  

export default withNavigation(SearchPlace);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#ffff',
  },
  searchBox: {
    alignItems: "center",
    justifyContent:"center",
    flex: 1,
    flexDirection: "row",
    flexGrow:1,
    marginHorizontal: "5%",
    marginVertical: "1%"
  },
  searchHeader: {
    flex: 1,
  },
  listBox: {
    flexGrow: 10,
    justifyContent:"flex-start",
    paddingVertical: 40,
    paddingHorizontal: 40,
    flex: 1,
  },
  searchButton: {
    marginLeft: "5%",
    justifyContent: "flex-start", 
    alignItems: "flex-start",
  },
  searchInput: {
    fontFamily: 'Raleway-Regular',
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    color: "white"
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

