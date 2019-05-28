const React = require("react-native");

const { StyleSheet, Dimensions } = React;

const width = Dimensions.get('screen').width;

export default {

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
    name: {
    fontSize: 25,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
    email: {
    fontSize: 14,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  address: {
    fontSize: 14,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  phone: {
    fontSize: 14,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
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