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
import { Button } from 'react-native-elements';
import {Thumbnail} from 'native-base';
import firebase from 'firebase';
import MyHeader from "../../components/MyHeader";

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
    const { product } = this.props.navigation.state.params;
    const userId = product.uid;
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
    const { product } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <MyHeader
              leftComp={true}
              navigateTo = {"Product"}
              navigationProps = {product}
              leftIcon={"arrow-back"}
              title={"Profile"}
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