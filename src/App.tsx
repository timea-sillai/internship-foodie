import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashPage from './Pages/SplashPage';
import { enableScreens } from 'react-native-screens';
import SignUpPage from './Pages/SignUpPage';

enableScreens(true);

const Stack = createNativeStackNavigator();

export interface IAppProps {}
export interface IAppState {
  started: boolean;
}

export class App extends Component<IAppProps, IAppState> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='SignUpPage' component={SignUpPage} />
          <Stack.Screen name='SplashPage' component={SplashPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
