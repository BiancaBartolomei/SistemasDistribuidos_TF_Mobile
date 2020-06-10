import Login from './Login';
import CreateUser from './CreateUser';
import Main from './Main';

import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

const Routes = createAppContainer(
  createStackNavigator({
    Login: Login,
    CreateUser: CreateUser,
    Main: Main,
  })
);

export default Routes;