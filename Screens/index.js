import Login from './Login';
import CreateUser from './CreateUser';
import Main from './Main';
<<<<<<< HEAD
import CreateUser2 from './CreateUser2';
=======
import SearchPlace from './SearchPlace';
import Place from './Place';
import RequestPlace from './RequestPlace';

>>>>>>> [ADD] Search Places Screens
import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';


const Routes = createAppContainer(
  createStackNavigator({
    Login: Login,
    CreateUser: CreateUser,
<<<<<<< HEAD
    CreateUser2: CreateUser2,
    Main: Main,
    SearchPlace: SearchPlace,
=======
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
      }
    },
>>>>>>> [ADD] Main Screen
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
    },
    RequestPlace: {
      screen: RequestPlace,
      navigationOptions: {
        headerShown: false,
      }
    }
  })
);

export default Routes;