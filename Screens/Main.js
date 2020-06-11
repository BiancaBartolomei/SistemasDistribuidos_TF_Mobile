// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';
import PlaceItem from '../Components/PlaceItem'

import React, {Component} from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground } from 'react-native';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Luís Otávio",
      id: "001",
      search: '',
      data: [{"area": "23", "cnpj": "34245", "max_qnt": 12, "name": "Place2", "place_id": 2}, {"area": "43", "cnpj": "34545", "max_qnt": 23, "name": "Place3", "place_id": 3}]
    };
  }

  

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <ImageBackground source={require('../images/Estabelecimento.jpg')} style={styles.backgroundImage}>
            <View style={styles.mainHeaderBox}>
                <View>
                    <Text style={styles.nameUserText}>Olá, {this.state.name}.</Text>
                </View>

                <View style={styles.menuButtonBox}>
                  <Image source={require('../images/profile.png')} style={styles.iconImage}/>
                  <TouchableOpacity>
                    <Text style={styles.menuButtonText}>EDITAR INFORMAÇÕES PESSOAIS</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.menuButtonBox}>
                  <Image source={require('../images/more.png')} style={styles.iconImage}/>
                  <TouchableOpacity onPress={() => {navigation.navigate('RequestPlace', {id: this.state.id})}}>
                    <Text style={styles.menuButtonText}>CADASTRAR ESTABELECIMENTO</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.menuButtonBox}>
                  <Image source={require('../images/logout.png')} style={styles.iconImage}/>
                  <TouchableOpacity onPress={() => navigation.popToTop()}>
                    <Text style={styles.menuButtonText}>SAIR DA CONTA</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </ImageBackground>

          <View style={styles.searchBox}>
            <TextInput style={styles.searchInput} 
              onChangeText={(text) => this.setState({search: text})}
              onSubmitEditing={(event) => navigation.navigate('SearchPlace', {search: event.nativeEvent.text})}
              />
            <View>
              <TouchableOpacity onPress={() => {navigation.navigate('SearchPlace', {search: this.state.search})}}>
                  <Image source={require('../images/search.png')} style={styles.iconImage}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.favoritesBox}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <PlaceItem place={item} />}
              keyExtractor={item => item.place_id.toString()}
            />
          </View>

      </View> 
      
  );
  }
};



Main.navigationOptions = {
  title: 'Main',
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#ffff',
    justifyContent: "center",
    alignItems: "center"
  },
  mainHeaderBox: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    flex: 1,
    flexDirection: "column",
    paddingBottom: 20,
    paddingHorizontal: "10%",
    paddingVertical: "10%",
    flexGrow: 1,
  },
  nameUserText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "white",
      flexGrow: 2,
  },
  menuButtonBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    padding: 0,
    flexGrow: 1,
  },
  menuButtonText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  favoritesBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 3,
    paddingTop: 10,
  },
  searchInput: {
    marginBottom: 20,
    height: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    width: "70%",
    height: 50,
    borderRadius: 100,
  },
  searchBox: {
    flexGrow: 0,
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    paddingTop: 10,
    marginBottom: 50,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  iconImage: {
    width: 15,
    height: 15,
  }
});


export default Main