import React from 'react';
import styles from "./style";
import { AppLoading, Icon } from 'expo';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import { Header,Button } from 'react-native-elements';
import {Thumbnail} from 'native-base';
import firebase from 'firebase';

export default class MyProfileScreen extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      image: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      isLoading: true,
    }
  }
  
  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref('users/'+ userId).once('value', function (snapshot) {
      const user = snapshot.val();
      this.setState({
        image: user.image,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isLoading: false,
      });
    }.bind(this));
  }

  static navigationOptions = {
    header: null,
  };

  renderImage(){
    let { image } = this.state;
    if(!image){
      return (
        <Image
          source={require('../../assets/images/default_user.jpg')}
          style={styles.avatar}
        />
      )
    } else {
      return (
        <Image
          source={{ uri: image }}
          style={styles.avatar}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          	<Header
              leftComponent={
              <Button 
                onPress={() => {
                  console.log('logged out');
                  this.props.navigation.navigate("Login");
                }}
                icon={
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                    color={'white'}
                    size={26}
                    // style={{ marginBottom: 15 }}
                  />
                }
              />}
              centerComponent={{ text: 'Profile',size: 26,style: { color: '#fff' } }}
              rightComponent={
              <Button 
                onPress={() => {
                  // console.log('logged out');
                  this.props.navigation.navigate("EditProfile");
                }}
                icon={
                  <Icon.AntDesign
                    name={'edit'}
                    color={'white'}
                    size={26}
                    // style={{ marginBottom: 15 }}
                  />
                }
              />}
            />
            {this.renderImage()}
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.name}>{this.state.name}</Text>
            <Text style={styles.email}>{this.state.email}</Text>
            <Text style={styles.phone}>{this.state.phone}</Text>
            <Text style={styles.address}>{this.state.address}</Text>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width / 3 + 20,
              marginTop: Dimensions.get("window").height / 50,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignSelf: "center"
            }}
          >
            <Thumbnail
              square
              small
              source={require('../../assets/images/phone.png')}
            />
            <Thumbnail
              square
              small
              source={require('../../assets/images/msg.jpg')}
            />
          </View>

          {this._maybeRenderUploadingOverlay()}

        </ScrollView>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.isLoading) {
      return (
        <View
          style={styles.loading}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

}