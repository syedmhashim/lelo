import React, { Component } from "react";
import styles from "./style";
import {
  ActivityIndicator,
  Image,
  Keyboard, 
  Text, 
  View, 
  TextInput, 
  TouchableWithoutFeedback, 
  Alert, 
  KeyboardAvoidingView
} from 'react-native';
import { Icon, Constants, ImagePicker, Permissions } from 'expo';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from "../../components/MyHeader";

export default class EditProfileScreen extends Component {

  constructor(props){
    super(props)
    console.disableYellowBox = true;
    this.state = {
      image: '',
      name: '',
      phone: '',
      address: '',
      uploading: false,
    }
    this.onSavePress = this.onSavePress.bind(this)
  }
  
  async onSavePress(image,name,phone,address) {
    this.setState({ uploading: true });

    const userId = firebase.auth().currentUser.uid;
    let img_uri = image;
    
    try {
      if(img_uri){
        img_uri = await this.uploadImageAsync(img_uri,userId+".jpg");
      }
    } catch (e){
      console.log(e.toString());
      alert('Error uploading image!')
    }

    firebase.database().ref('users/' + userId).update({
      image: img_uri,
      name: name,
      phone: phone,
      address: address,
     }).then(function(value){
      alert('Changes Saved!');
      this.setState({ uploading: false });
     }.bind(this)).catch(function(error){
      alert(error.toString());
     });
  }

  render() {

    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.signupScreenContainer}>
            <MyHeader
              leftComp={true}
              navigateTo = {"MyProfile"}
              leftIcon={"arrow-back"}
              title={"Edit Profile"}
            />
            <View style={styles.signupFormView}>
              <Button
                buttonStyle={styles.uploadButton}
                onPress={this._pickImage}
                title="Upload a Profile Photo"
              />
              {this._handleImagePicked()}
              <TextInput placeholder="Full Name" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(name) => this.setState({name})} value={this.state.name}/>
              <TextInput placeholder="Phone Number" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(phone) => this.setState({phone})} value={this.state.phone}/>
              <TextInput placeholder="Address" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(address) => this.setState({address})} value={this.state.address}/>
              <Button
                buttonStyle={styles.signupButton} 
                onPress={() => {this.onSavePress( this.state.image,this.state.name,this.state.phone,this.state.address);}}
                title="Save Changes"
              />

              {this._maybeRenderUploadingOverlay()}

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={styles.loading}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {  
      this.setState({ image: pickerResult.uri });
    }
  }

  _handleImagePicked() {
    let {image} = this.state
    if(image){
      var n = image.lastIndexOf("/");
     
      return (
        <Text>{image.slice(n+1)}</Text>
      )
    } else {
      return (<Text>No Image Selected</Text>)
    }
  }
  
  uploadImageAsync = async (uri,imageName) => {
    //  Why are we using XMLHttpRequest? See:
    // https:github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    var metadata = {
      contentType: 'image/jpeg',
    };

    const ref = firebase
      .storage()
      .ref()
      .child('users/' + imageName);
    const snapshot = await ref.put(blob, metadata);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
}