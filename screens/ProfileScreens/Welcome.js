import React, { Component } from "react";

import styles from "./LoginScreenStyle";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';

export default class LoginScreen extends Component {
    
    onLogout() {
        const {username, password} = this.state;
        if(username !== '' && password !== '' && username.includes('lums')) {
            // TODO: Login => Firebase authentication 
            // Author: Muhammad Ali Gulzar
        }
    }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Welcome</Text>
            <Button
              buttonStyle={styles.signUpButton} 
              onPress={() => this.onLoginPress()}
              title="Logout"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      </KeyboardAvoidingView>
    );
  }


}