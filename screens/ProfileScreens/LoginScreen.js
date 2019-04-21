import React, { Component } from "react";

import styles from "./LoginScreenStyle";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class LoginScreen extends Component {


    constructor(props){
      super(props)
      this.state = {
        email: '',
        password: '',
      }
      this.onLoginPress = this.onLoginPress.bind(this)
      this.loggedIn = this.loggedIn.bind(this)
    }

    
    onLoginPress() {
        const {email, password} = this.state;
        this.setState({email: '', password: ''})
        if(email !== '' && password !== '' && email.includes('lums.edu.pk') && password.length >= 6) {
          firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            Alert.alert(
              'Email sent',
              'Email has been sent to ' + email + ' for verification. Actually it created an account ;)',
              [
                {text: 'OK'},
              ],
              {cancelable: false},
          );
          })
        } else {
          Alert.alert(
            'Email Error / Password Length / User already exists',
            'You should have a lums email to create an account OR the password length should be greater than 6 characters OR user with this email already exists',
            [
              {text: 'OK'},
            ],
            {cancelable: false},
          );
        }
    }

    loggedIn () {
      
    }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Lelo</Text>
            <TextInput placeholder="Lums Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
            <Button
              buttonStyle={styles.loginButton} 
              onPress={() => this.onLoginPress()}
              title="Login/SignUp"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      </KeyboardAvoidingView>
    );
  }


}