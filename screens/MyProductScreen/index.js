import React from "react";
import styles from "./style";
import { Icon } from 'expo';
import {
  ActivityIndicator,
  Image,
  Keyboard, 
  Text, 
  View, 
  TextInput, 
  TouchableWithoutFeedback,
  Platform, 
  Alert, 
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Card,
  CardItem,
  Body
} from "native-base";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Header,Button } from 'react-native-elements';
import firebase from 'firebase';

export default class MyProductScreen extends React.Component {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

	constructor(props){
		super(props);
		this.state = {
      product: {},
			seller: '',
			isLoading: true,
		};
	}

	componentDidMount (){
		const { key } = this.props.navigation.state.params;
		
		firebase.database().ref('products/'+ key).once('value', function (snapshot) {
      const product = {...snapshot.val(),key: key};
      this.setState({product})
    }.bind(this))
    .then(function(val){
  		let userId = this.state.product.uid
      firebase.database().ref('users/'+ userId).once('value', function (snapshot) {
        const user = snapshot.val();
        this.setState({
          seller: user.name,
          isLoading: false
        })
      }.bind(this));      
    }.bind(this))
	}

  renderImage(image){
    if(!image){
      return (
        <Image
          source={require('../../assets/images/no-image.png')}
          style={styles.img}
        />
      )
    } else {
      return (
        <Image
          source={{ uri: image }}
          style={styles.img}
        />
      )
    }
  }

	render() {
    const { product } = this.state;
    if (this.state.isLoading) {
      return(
        <View>
          <Header
            leftComponent={
              <Button 
                onPress={() => {
                  this.props.navigation.navigate("MyAds");
                }}
                icon={
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                    color={'white'}
                    size={26}
                  />
                }
              />
            }
            centerComponent={{ text: 'Product',size: 26,style: { color: '#fff' } }}
            rightComponent={
              <Menu
                ref={this.setMenuRef}
                button={
                  <Button 
                    onPress={this.showMenu}
                    icon={
                      <Icon.Entypo
                        name={'dots-two-vertical'}
                        color={'white'}
                        size={26}
                      />
                    }
                  />
                }
              >
                <MenuItem onPress={this.hideMenu}>Edit</MenuItem>
                <MenuItem onPress={this.hideMenu}>Delete</MenuItem>
              </Menu>
            }
          />
          {this._renderUploadingOverlay()}
        </View>
      )
    } else {
      return (
        <View>
          <View>
            <Header
              leftComponent={
              <Button 
                onPress={() => {
                  this.props.navigation.navigate("MyAds");
                }}
                icon={
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                    color={'white'}
                    size={26}
                  />
                }
              />}
              centerComponent={{ text: 'Product',size: 26,style: { color: '#fff' } }}
              rightComponent={
                <Menu
                ref={this.setMenuRef}
                button={
                  <Button 
                    onPress={this.showMenu}
                    icon={
                      <Icon.Entypo
                        name={'dots-two-vertical'}
                        color={'white'}
                        size={26}
                      />
                    }
                  />
                }
              >
                <MenuItem onPress={() => {
                  this.props.navigation.navigate("EditAd", {key: product.key, uid: product.uid});
                }}>
                  Edit
                </MenuItem>
                <MenuItem onPress={() => {
                  let productKey = product.key
                  firebase.database().ref('products/'+productKey).remove()
                  .then(function(val){
                    alert('Deleted!')
                  })
                  this.props.navigation.navigate("MyAds");
                }}>
                  Delete
                </MenuItem>
              </Menu>
              }
            />
          </View>
          <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
              {this.renderImage(product.image)}
              <Card style={styles.detailsCard}>
                <CardItem>
                  <Body>
                    <Text style={styles.userName}>{this.state.seller}</Text>
                    <Text style={styles.price}>Name: {product.name}</Text>
                    <Text style={styles.price}>Price: Rs {product.price}</Text>
                    <Text style={styles.description}>
                      Description: {product.description}
                    </Text>
                    <Text style={styles.category}>
                      Category: {product.category}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </ScrollView>
          </View>
        </View>
      )
    }	  
  }

  _renderUploadingOverlay = () => {
    return (
      <View
        style={styles.loading}>
        <ActivityIndicator color="#fff" animating size="large" />
      </View>
    );
  }
  
}

