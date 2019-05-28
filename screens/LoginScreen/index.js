import React, { Component } from "react";
import styles from "./style";
import {
  Image, 
  Keyboard, 
  Text, 
  View, 
  TextInput, 
  TouchableWithoutFeedback, 
  Alert, 
  KeyboardAvoidingView} from 'react-native';
import { Header, Button } from 'react-native-elements';
import firebase from 'firebase';

export default class LoginScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.onLoginPress = this.onLoginPress.bind(this)
  }

    
  async  onLoginPress(email, pass) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, pass);
        console.log("Logged In!");
        this.props.navigation.navigate("Main");
      } catch (error) {
        alert(error.toString());
      }
    }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Header
              centerComponent={{ text: 'Log In',size: 26,style: { color: '#fff' } }}
              />
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image
                  source={require('../../assets/images/LOGO.png')}
                  style={styles.logoImage}
                />
              </View>
              <TextInput placeholder="Lums Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
              <Button
                buttonStyle={styles.loginButton} 
                onPress={() => this.onLoginPress(this.state.email,this.state.password)}
                title="Login"
              />
              <View style={styles.header}>
                <Text
                  style={{
                    color: "black",
                    textAlign: 'center'
                  }}
                >
                  Don't have an account?
                </Text>
                <Button
                  buttonStyle={styles.signupButton}
                  onPress={() => {
                    this.props.navigation.navigate("Signup");
                  }}
                  title="Signup"
                />
                <Button
                  buttonStyle={styles.signupButton}
                  onPress={() => {
                    this.props.navigation.navigate("Test");
                  }}
                  title="Test"
                />                
                </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}