import Login from './Login';
import CreateUser from './CreateUser';
import Main from './Main';
<<<<<<< HEAD
import CreateUser2 from './CreateUser2';
=======
import SearchPlace from './SearchPlace';
import Place from './Place'

>>>>>>> [ADD] Search Places Screens
import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';


const Routes = createAppContainer(
  createStackNavigator({
    Login: Login,
    CreateUser: CreateUser,
    CreateUser2: CreateUser2,
    Main: Main,
    SearchPlace: SearchPlace,
    Place: {
        screen: Place,
        navigationOptions: {
          headerShown: false,
        }
    }
  })
);

export default Routes;