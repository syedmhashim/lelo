const React = require("react-native");

const { StyleSheet, Dimensions } = React;

const width = Dimensions.get('screen').width;

export default {

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  container: {
    // flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: Dimensions.get("window").height / 40 - 5
  },
  profileButton: {
    marginLeft: Dimensions.get("window").width / 50,
    marginTop: Dimensions.get("window").height / 50,
    fontSize: 14
  },
  addTime: {
    backgroundColor: "transparent",
    fontSize: 10,
    marginTop: -Dimensions.get("window").height / 80,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  category: {
    marginTop: Dimensions.get("window").height / 30
  },
  description: {
    marginTop: Dimensions.get("window").height / 30
  },
  price: {
    fontSize: 25,
    marginTop: Dimensions.get("window").height / 30
  },
  userName: {
    fontSize: 17,
    marginTop: Dimensions.get("window").height / 50 - 5
  },
  subContainer: {
    // justifyContent: "space-around",
    zIndex: 1,
    // borderWidth: 0.5,
    backgroundColor: "#FFFFFF",
    paddingLeft: Dimensions.get("window").width / 40 - 5,
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 20
  },
  footer: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  img: {
    // justifyContent: "center",
    height: Dimensions.get("window").height / 3 - 50,
    width: Dimensions.get("window").width - 30
  },
  detailsCard: {
    // borderWidth: 0.5,
    // borderColor: "black",
    // borderRadius: 10,
    // height: Dimensions.get("window").height / 2 + 50,
    marginTop: Dimensions.get("window").height / 50 - 5,
    marginRight: Dimensions.get("window").width / 50,
    paddingLeft: Dimensions.get("window").width / 50,
    paddingRight: Dimensions.get("window").width / 50 - 5
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