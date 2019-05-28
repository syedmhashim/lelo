import React from 'react';
import styles from "./style";
import { Icon } from 'expo';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Header, Button, SearchBar} from 'react-native-elements';
import ProductCard from "../../components/productCard";
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      isLoading: true,
      products: {},
      search: '',
      displaySearchBar: false,
    };
  }

  componentDidMount () {
    firebase.database().ref("products/").on('value', function (snapshot) {
      let products = Object.entries(snapshot.val()).map(item => ({...item[1], key: item[0]}))
      console.log(products);
      this.setState({products, isLoading: false})
    }.bind(this));
  }

  static navigationOptions = {
    header: null,
  };

  updateSearch = search => {
    this.setState({ search });
  };

   _maybeRenderSearchBar = () => {
    const { displaySearchBar, search } = this.state;
    if (!displaySearchBar) {
      return;
    }

    return (
      <SearchBar
        lightTheme
        round
        containerStyle={{backgroundColor: '#F5FCFF', marginBottom: 10 }}
        searchIcon={{ size: 24 }}
        onClearText={() => this.setState({search:''})}
        placeholder='Search your product'
        inputStyle={{color: 'black'}}
        onChangeText={this.updateSearch}
        value = {search}
      />
    );
  };

  renderlist() {
    const {search,products} = this.state;
    const filteredProducts = products.filter(item =>{
      if(search){
        return item.name==search
      } else {
        return true
      }
    })

    return (
      <FlatList
        data={filteredProducts}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Product", {product: item})
                }
              }
            >
              <ProductCard product={item} />            
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.welcomeContainer}>
          <Header
            leftComponent={
            <Button 
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
              icon={
                <Icon.Ionicons
                  name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                  color={'white'}
                  size={26}
                />
              }
            />}
            centerComponent={{ text: 'Home',size: 26,style: { color: '#fff' } }}
            rightComponent={
              <Button 
                onPress={() => {this.setState(prevState => ({displaySearchBar: !prevState.displaySearchBar})); } }
                icon={
                  <Icon.Ionicons
                    name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                    color={'white'}
                    size={26}
                  />
                }
              />
            }
          />
          {this._renderUploadingOverlay()}
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Header
                leftComponent={
                <Button 
                  onPress={() => {
                    this.props.navigation.navigate("Login");
                  }}
                  icon={
                    <Icon.Ionicons
                      name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                      color={'white'}
                      size={26}
                    />
                  }
                />}
                centerComponent={{ text: 'Home',size: 26,style: { color: '#fff' } }}
                rightComponent={
                  <Button 
                    onPress={() => {this.setState(prevState => ({displaySearchBar: !prevState.displaySearchBar})); } }
                    icon={
                      <Icon.Ionicons
                        name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                        color={'white'}
                        size={26}
                      />
                    }
                  />
                }
              />
            </View>
            {this._maybeRenderSearchBar()}
            <View style={{ flex: 1 }}>
              {this.renderlist()}
            </View>
          </ScrollView>
        </View>
      );
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