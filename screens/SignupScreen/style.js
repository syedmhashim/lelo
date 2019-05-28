const React = require("react-native");

const { StyleSheet, Dimensions } = React;

const width = Dimensions.get('screen').width;

export default {

  containerView: {
    flex: 1,
  },
  signupScreenContainer: {
    flex: 1,
  },
  signupFormView: {
    flex: 1
  },
  signupFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  signupFormText: {
    fontSize: 11,
    backgroundColor: "transparent",
    color: "black",
    textAlign: 'center'
  },
  signupButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginRight: width * 0.20,
    marginLeft: width * 0.20
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginBottom: 10,
    marginLeft: -10,
  },
};