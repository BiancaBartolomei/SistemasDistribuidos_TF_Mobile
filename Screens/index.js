import Login from './Login';
import CreateUser from './CreateUser';
import Main from './Main';
import CreateUser2 from './CreateUser2';
import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';


const Routes = createAppContainer(
  createStackNavigator({
    Login: Login,
    CreateUser: CreateUser,
    CreateUser2: CreateUser2,
    Main: Main,
  })
);

export default Routes;