import 'react-native-gesture-handler';
import PlaceItem from '../Components/PlaceItem'

import React, { Component } from "react";
import { withNavigation } from 'react-navigation';
import { Button, StyleSheet, View, FlatList, TextInput } from 'react-native';




class SearchPlace extends Component {

  constructor(props) {
    super(props);


    this.state = {
      data: [],
      serach: '',
      isLoading: true
    };
  }

  makeRemoteRequest(){
    const url = `http://192.168.0.108:3300/place/${this.state.serach}`;
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        console.log(this.state.serach)
        this.setState({data: res})
      })
      .catch(error => {
        console.log(error)
      });
  };

  render(){
    const { navigation } = this.props;
    return(
      <View style={styles.container}>

        <View style={styles.searchBox}>
          <Button title="Pesquisar" style={styles.searchButton}
            onPress = {() => this.makeRemoteRequest()}
          />
          <TextInput style={styles.searchInput}
                    onChangeText={(text) => this.setState({serach: text.replace(" ", "_")})}/>
        </View>

        <View style={styles.listBox}>
        <FlatList
        data={this.state.data}
        renderItem={({ item }) => <PlaceItem place={item} />}
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
    padding: "5%",
  },
  searchBox: {
    alignItems: "flex-start",
    justifyContent:"flex-start",
    flex: 1,
    flexDirection: "row",
  },
  listBox: {

    justifyContent:"flex-start",
    paddingBottom: 40,
    flex: 1,
  },
  searchButton: {
    marginLeft: "5%",
    justifyContent: "flex-start", 
    alignItems: "flex-start"
  },
  searchInput: {
    marginBottom: 20,
    width: 240,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
});

