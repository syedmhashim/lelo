import React from 'react';
import { Icon } from 'expo';
import { Header,Button } from 'react-native-elements';
import { withNavigation } from "react-navigation";
import {
  Platform,
} from 'react-native';

class MyHeader extends React.Component {
	constructor(props) {
    super(props);
    this.renderLeftComponent = this.renderLeftComponent.bind(this)
  }

  renderLeftComponent(){
  	if (this.props.leftComp) {
			return (
				<Button
	        onPress={() => {
	        	const {navigateTo, navigationProps} = this.props
	        	if (navigateTo == "Product"){
	        		this.props.navigation.navigate(navigateTo, {product: navigationProps});
	        	} else if (navigateTo == "MyProduct") {
	        		this.props.navigation.navigate(navigateTo, {key: navigationProps});
	        	} else {
	        		this.props.navigation.navigate(navigateTo);
	        	}
	        }}
	        icon={
	          <Icon.Ionicons
	            name={Platform.OS === 'ios' ? 'ios-'+this.props.leftIcon : 'md-'+this.props.leftIcon}
	            color={'white'}
	            size={26}
	          />
	        }
	      />
			)
  	} else {
  		return
  	}
  }

  render() {
		return (
			<Header
	      leftComponent={this.renderLeftComponent}
	      centerComponent={{ text: this.props.title, size: 26,style: { color: '#fff' } }}
	    />
		) 
	}
}	

export default withNavigation(MyHeader);