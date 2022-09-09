import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashPage from './Pages/SplashPage';
import { enableScreens } from 'react-native-screens';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';
import HomePage from './Pages/HomePage';
import RecipeDetailsPage from './Pages/RecipeDetailsPage';
import { FeedItemDetails } from './Services/AxiosService';

enableScreens(true);

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  SignUpPage: undefined;
  SignInPage: undefined;
  SplashPage: undefined;
  HomePage: undefined;
  RecipeDetailsPage: { item: FeedItemDetails };
};

export interface IAppProps {}
export interface IAppState {
  started: boolean;
}

export class App extends Component<IAppProps, IAppState> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='SplashPage' component={SplashPage} />
          <Stack.Screen name='SignInPage' component={SignInPage} />
          <Stack.Screen name='SignUpPage' component={SignUpPage} />
          <Stack.Screen name='HomePage' component={HomePage} />
          <Stack.Screen name='RecipeDetailsPage' component={RecipeDetailsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
