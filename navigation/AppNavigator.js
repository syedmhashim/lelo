import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export default createAppContainer(createSwitchNavigator(
	{
		Login: {screen: LoginScreen},
		Signup: {screen: SignupScreen},
		Main: {screen: MainTabNavigator}
	},
	{
		initialRouteName: "Login",
		headerMode: "none"
	}
));