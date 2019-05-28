const React = require("react-native");

const { StyleSheet, Dimensions } = React;

const width = Dimensions.get('screen').width;

export default {
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  sellFormView: {
    flex: 1,
  },
  imageView: {
    alignSelf: "stretch",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: Dimensions.get("window").height / 40 + 15,
    backgroundColor: "transparent"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%"
  },
  buttonIcon: {
    alignSelf: "center",
    marginBottom: Dimensions.get("window").height / 40 + 15
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
  postAdButton: {
    alignSelf: "center",
    marginBottom: Dimensions.get("window").height / 40 + 15
  },
  loading: [
    StyleSheet.absoluteFill,
    {
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  ]
};