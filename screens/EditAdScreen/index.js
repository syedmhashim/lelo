import React from 'react';
import styles from "./style";
import { Icon, ImagePicker, Permissions } from 'expo';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Platform,
  Dimensions,
  Alert
} from 'react-native';
import { Header,Button } from 'react-native-elements';
import firebase from 'firebase';

export default class EditAdScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props)
    this.state = {
      image: '',
      name: '',
      category: '',
      price: '',
      description: '',
      uploading: false,
    }
    this.onSavePress = this.onSavePress.bind(this)
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  async onSavePress() {
    this.setState({ uploading: true });
    const { key, uid } = this.props.navigation.state.params;
    let {image,name,category,price,description} = this.state;
    if(name === '' || category === '' || price === '' || description === ''){
      Alert.alert(
        'Error',
        'Please enter the details again.',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
      this.setState({uploading:false})
    } else if (isNaN(price)) {
      Alert.alert(
        'Error',
        'Incorrect Price.',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
      this.setState({uploading:false})
    }else if (price.length >= 10) {
      Alert.alert(
        'Error',
        'Make sure you place a reasonable price.',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
      this.setState({uploading:false})
    }else {
      let img_uri = image;

      try {
        if(img_uri){
          img_uri = await this.uploadImageAsync(img_uri,uid);
        }
      } catch (e){
        console.log(e.toString());
        // alert('Error uploading image!')
      }

      firebase.database().ref("products/"+key).update({
        image: img_uri,
        name: name,
        category: category,
        price: price,
        description: description,
       })
      .then(function(value){
        alert('Changes Saved!');
        this.setState({ uploading: false });
       }.bind(this))
      .catch(function(error){
        alert(error.toString());
       });
      
      this.setState({
        image: '',
        name: '',
        category: '',
        price: '',
        description: '',
        uploading: false
      })
    }
  }

  render() {
    const {key} = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Header
            leftComponent={
            <Button
              onPress={() => {
                console.log('logged out');
                this.props.navigation.navigate("MyProduct", {key: key});
              }}
              icon={
                <Icon.Ionicons
                  name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                  color={'white'}
                  size={26}
                />
              }
            />}
            centerComponent={{ text: 'Sell',size: 26,style: { color: '#fff' } }}
          />
        </View>
        <View style={styles.sellFormView}>
          <View style = {styles.imageView}>
            {this._handleImagePicked()}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._takePhoto}
              buttonStyle={styles.buttonIcon}
              icon={
                <Icon.Ionicons
                  name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
                  size={26}
                />
              }
            />
            <Button
              onPress={this._pickImage}
              buttonStyle={styles.buttonIcon}
              icon={
                <Icon.Ionicons
                  name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'}
                  size={26}
                />
              }
            />
          </View>
          <TextInput placeholder="Product Name" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(name) => this.setState({name})} value={this.state.name}/>
          <TextInput placeholder="Category" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(category) => this.setState({category})} value={this.state.category} />
          <TextInput placeholder="Price" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(price) => this.setState({price})} value={this.state.price} />
          <TextInput placeholder="Description" placeholderColor="#c4c3cb" style={styles.signupFormTextInput} onChangeText={(description) => this.setState({description})} value={this.state.description} />
          <Button
            buttonStyle={styles.postAdButton}
            onPress={() => {this.onSavePress()}}
            title="Save Changes"
          />

          {this._maybeRenderUploadingOverlay()}

        </View>
      </ScrollView>
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

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync();
    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.uri });
    }
  }

  _handleImagePicked() {
    let {image} = this.state
    if(image){
       return (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      );
    } else {
      return (<Text>No Image Selected</Text>)
    }
  }

  uploadImageAsync = async (uri,uid) => {
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

    let imageName = uid + '_' + (new Date().getTime());

    const ref = firebase
      .storage()
      .ref()
      .child('products/' + imageName+ 'jpg');
    const snapshot = await ref.put(blob, metadata);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }
}
