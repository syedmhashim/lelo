import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen/index';
import SellScreen from '../screens/SellScreen/index';
import MyAdsScreen from '../screens/MyAdsScreen/index';
import MyProfileScreen from '../screens/MyProfileScreen/index';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SellStack = createStackNavigator({
  Sell: SellScreen,
});

SellStack.navigationOptions = {
  tabBarLabel: 'Sell',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
    />
  ),
};

const MyAdsStack = createStackNavigator({
  MyAds: MyAdsScreen,
});

MyAdsStack.navigationOptions = {
  tabBarLabel: 'My Ads',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const MyProfileStack = createStackNavigator({
  MyProfile: MyProfileScreen,
});

MyProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SellStack,
  MyAdsStack,
  MyProfileStack,
});
