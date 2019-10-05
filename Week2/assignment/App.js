/**
 * Import React and Component needd for component
 */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileScreen from './screen/Profile';
import PhotoScreen from './screen/Photo';




const RootStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Photo: PhotoScreen,
  },
  {
    initialRouteName: 'Profile',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
