/**
 * by anton pastukhov
 * andm1793@gmail.com
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { store } from './store/Store';
import { Provider } from 'react-redux';
import { UserNavigator } from './navigation/UserNavigator';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';

const App = () => {
  SplashScreen.hide();

  const config = {
    screens: {
      Гимназист: 'gym',
    },
  };
  
  const linking = {
    prefixes: ['https://ediary.com', 'ediary://'],
    config,
  };

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <StatusBar backgroundColor='#002e2f' />
        <UserNavigator />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
