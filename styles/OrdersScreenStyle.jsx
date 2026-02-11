import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const OrdersScreenStyle = StyleSheet.create({
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
    height: screenHeight * 0.18,
    backgroundColor: "#000",
    flexDirection: "row",
    paddingTop: screenHeight * 0.01,
  },
  optionItem: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.15,
    marginVertical: screenHeight * 0.015,
    backgroundColor: "#fff",
    paddingLeft: screenWidth * 0.05,
    //justifyContent: "center",
    alignItems:'center',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
  },
  section: {
    marginTop: screenHeight * 0.02,
  },
  textoBotonContenedor: {
    width: screenWidth * 0.75,
  },
  flechaBotonContenedor: {
    width: screenWidth * 0.2,
  },
  contenedorEstadoEnvio:{
    marginTop:screenHeight*0.005,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height:screenHeight*0.035,
    width:screenWidth*0.3,
    borderRadius:20
  },
  textoEstado:{
    fontSize: 16,
    fontFamily: "Inter",
    marginLeft:screenWidth*0.01
  },
  optionTextTotal:{
    fontSize: 18,
    textAlign: "left",
    fontFamily: "Inter-Bold",
  },
  optionText: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Inter",
  },
  nombreTexto: {
    color: "#fff",
    fontFamily: "Inter-Bold",
    fontSize: 20,
    marginBottom: screenHeight * 0.007,
  },
  correoTexto: {
    color: "#dbdbdb",
    fontFamily: "Inter",
    fontSize: 15,
  },
  contenedorArriba: {
    marginHorizontal: screenWidth * 0.05,
  },
  botonRegresar: {
    marginTop: screenHeight * 0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  textoRegresar: {
    marginLeft: "2%",
    fontSize: 20,
    color: "#fff",
    fontFamily: "Inter",
  },
  titulo: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "Inter",
    marginTop: screenHeight * 0.02,
  },
  descripcion: {
    fontSize: 17,
    color: "#e8e6e6",
    fontFamily: "Inter",
    marginTop: screenHeight * 0.015,
  },
});

export default OrdersScreenStyle;
