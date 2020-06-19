// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';
import PlaceItem from '../Components/PlaceItem'
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, AppRegistry,  Alert, AsyncStorage, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';  





const LogLocation = async (id) => {

  Geolocation.getCurrentPosition(info => {
    fetch('http://192.168.15.14:3300/sendLocation',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: id,
        lat: info["coords"]["latitude"],
        long: info["coords"]["longitude"]
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Foi: "+info);
      })
      .catch((error) => {
         console.error(error);
      });

  });

  setInterval(()=>{LogLocation(id)}, 60000)

};



AppRegistry.registerHeadlessTask('LogLocation', () => LogLocation());

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.navigation.getParam("user"),
      search: '',
      data: '',
    };
  }

  getFavourites(){
    const url = `http://192.168.0.110:3300/favourites/${this.state.user.user_id}`;
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        this.setState({data: res})
      })
      .catch(error => {
        console.log(error)
      });
  }


  componentDidMount(){
    var id = this.state.user.user_id
    this.timer = LogLocation(id);

    const { navigation } = this.props;
    this.getFavourites()
    this.navFocusListener = navigation.addListener('didFocus', () => {
      this.getFavourites()
    });
  }

  componentWillUnmount() {
    this.navFocusListener.remove();
}

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <ImageBackground source={require('../images/Estabelecimento.jpg')} style={styles.backgroundImage}>
            <View style={styles.mainHeaderBox}>
                <View>
                    <Text style={styles.nameUserText}>Olá, {this.state.user.name}.</Text>
                </View>

                <View style={styles.menuButtonBox}>
                  <Image source={require('../images/profile.png')} style={styles.iconImage}/>
                  <TouchableOpacity>
                    <Text style={styles.menuButtonText}>EDITAR INFORMAÇÕES PESSOAIS</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.menuButtonBox}>
                  <Image source={require('../images/more.png')} style={styles.iconImage}/>
                  <TouchableOpacity onPress={() => {navigation.navigate('RequestPlace', {user: this.state.user})}}>
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
              onSubmitEditing={(event) => navigation.navigate('SearchPlace', {search: event.nativeEvent.text, user: this.state.user})}
              />
          </View>

          <View style={styles.favoritesBox}>
            <Text style={styles.placeFavouriteHeader}>Estabelecimentos Favoritos</Text>
            <FlatList
              style={styles.flatList}
              data={this.state.data}
              renderItem={({ item }) => <PlaceItem place={item} user={this.state.user}/>}
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
    flexGrow: 3,
    paddingTop: 10,
    width: "80%",
  },
  searchInput: {
    marginBottom: 20,
    height: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    width: "80%",
    height: 50,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  flatList: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
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
  },
  placeFavouriteHeader: {
    backgroundColor: '#ffffff',
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    borderColor: '#e0e0e0',
    borderBottomWidth: 1,
    color: "#3498dbff",
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  favoritesText: {

  }
});


