import Login from './Login';
import CreateUser from './CreateUser';

import { createAppContainer, createStackNavigator } from 'react-navigation';

const Routes = createAppContainer(
  createStackNavigator({
    Login: Login,
    CreateUser: CreateUser,
  })
);

export default Routes;