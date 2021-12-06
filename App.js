/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { store } from './store/Store';
import { Provider } from 'react-redux';
import { UserNavigator } from './navigation/UserNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <UserNavigator />
    </NavigationContainer>
  </Provider>
);
export default App;
