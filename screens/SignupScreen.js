import React, { Component } from "react";
import styles from "./LoginScreenStyle";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Header,Icon,Button } from 'react-native-elements';
import firebase from 'firebase';


export default class LoginScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      confPassword: '',
    }
    this.onSignupPress = this.onSignupPress.bind(this)
  }

  
  onSignupPress(email,password) {
    if(email !== '' && password !== '' && email.includes('@lums.edu.pk') && password.length >= 6) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        Alert.alert(
          'Account created!',
          [
            {text: 'OK'},
          ],
          {cancelable: false},
        );
        this.props.navigation.navigate("Login");
      }).catch(function(error){
        Alert.alert(error.toString());
      })
    } else {
      Alert.alert(
        'Email Error / Password Length ',
        'You should have a lums email to create an account OR the password length should be greater than 6 characters',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <Header>
              <Button 
                onPress={() => {
                  console.log('Back clicked');
                  this.props.navigation.navigate("Login");
                }}
                icon={
                  <Icon
                    name="arrow-back"
                    size={15}
                    color="white"
                  />
                }
              />
            </Header>
            <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Lelo</Text>
              <TextInput placeholder="Lums Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
              <TextInput placeholder="Confirm Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(confPassword) => this.setState({confPassword})} value={this.state.confPassword}/>
              <Button
                buttonStyle={styles.signupButton} 
                onPress={() => {
                  if (this.state.password != this.state.confPassword){
                    alert("Passwords do not match");
                  }
                  else {
                    this.onSignupPress(this.state.email,this.state.password);
                  }
                }}
                title="SignUp"
              />
              <Text
                style={{
                  fontSize: 11,
                  backgroundColor: "transparent",
                  color: "black",
                  textAlign: 'center'
                }}
              >
                By continuing, you agree to our Terms and Conditions
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}