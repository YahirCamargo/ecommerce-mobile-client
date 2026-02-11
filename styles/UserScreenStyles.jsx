import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const UserScreenStyles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "#e6e6e6",
  },
  background: {
    width: screenWidth,
    height: screenHeight,
    alignItems: "center",
  },
  backgroundArriba: {
    width: screenWidth,
    height: screenHeight * 0.2,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
  },
  optionItem: {
    width: screenWidth * 0.9,
    flexDirection: "row",
    height: screenHeight * 0.1,
    marginVertical: screenHeight * 0.015,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionIcon: {
    width: screenHeight * 0.05,
    height: screenHeight * 0.05,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: screenWidth * 0.03,
  },
  optionText: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Inter",
    width: screenWidth * 0.65,
  },
  iconoContenedor: {
    backgroundColor: "#fff",
    borderRadius: 50,
    height: screenHeight * 0.1,
    width: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft:screenWidth*0.05,
    marginRight:screenWidth*0.03,
  },
  nombreTexto:{
    color:'#fff',
    fontFamily: "Inter-Bold",
    fontSize:20,
    marginBottom:screenHeight*0.007
  },
  correoTexto:{
    color:'#dbdbdb',
    fontFamily: "Inter",
    fontSize:15
  }
});

export default UserScreenStyles;
