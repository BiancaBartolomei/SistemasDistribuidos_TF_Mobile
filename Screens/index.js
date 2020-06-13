import Login from './Login';
import CreateUser from './CreateUser';
import Main from './Main';
import CreateUser2 from './CreateUser2';
import SearchPlace from './SearchPlace';
import Place from './Place';
import RequestPlace from './RequestPlace';

import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';


const Routes = createAppContainer(
  createStackNavigator({
    Login: Login,
    CreateUser: CreateUser,
    CreateUser2: CreateUser2,
    RequestPlace: RequestPlace,
    
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
      }
    },
    SearchPlace: {
      screen: SearchPlace,
      navigationOptions: {
        headerShown: false,
      }
    },
    Place: {
        screen: Place,
        navigationOptions: {
          headerShown: false,
        }
    }
  })
);

export default Routes;