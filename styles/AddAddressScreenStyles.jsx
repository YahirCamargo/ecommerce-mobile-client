import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddAddressScreenStyles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "#fff",
  },
  background: {
    width: screenWidth,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  backgroundArriba: {
    width: screenWidth,
    height: screenHeight * 0.2,
  },
  contenedorArriba: {
    marginLeft: screenWidth * 0.05,
    marginRight: screenWidth * 0.05,
  },
  contenedorAbajo: {
    marginLeft: screenWidth * 0.05,
    marginRight: screenWidth * 0.05,
  },
  botonRegresar: {
    marginTop: screenHeight * 0.01,
    flexDirection: "row",
    alignItems: "center",
  },
  textoRegresar: {
    marginLeft: screenWidth*0.002,
    fontSize: 20,
    color: "#fff",
    fontFamily: "Inter",
  },
  titulo: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "Inter",
    marginTop: screenHeight * 0.01,
  },
  descripcion: {
    fontSize: 20,
    color: "#d6d6d6",
    fontFamily: "Inter",
    marginTop: screenHeight * 0.001,
  },
  fondoAbajo: {
    width: screenWidth * 0.8,
    marginTop:screenHeight*0.012
  },
  textoArribaInput: {
    color: "#000",
    fontSize: 16,
    marginTop: screenHeight * 0.002,
    marginBottom: screenHeight * 0.003,
  },
  textoPreferido: {
    marginLeft: screenWidth * 0.02,
  },
  input: {
    width: screenWidth * 0.8,
    height:screenHeight*0.048,
    borderWidth: 0.5,
    marginTop: screenHeight * 0.005,
    //marginBottom: screenHeight * 0.01,
    borderRadius: 15,
    paddingLeft: screenWidth * 0.03,
  },
  inputPequeño: {
    width: screenWidth * 0.38,
    borderWidth: 0.5,
    marginTop: screenHeight * 0.005,
    marginBottom: screenHeight * 0.01,
    borderRadius: 15,
    paddingLeft: screenWidth * 0.03,
  },
  contenedorInputsMezclados: {
    flexDirection: "row",
  },
  contenedorMezclado: {
    flexDirection: "row",
    marginTop: screenHeight * 0.015,
    marginBottom: screenHeight * 0.03,
  },
  contenedorInput: {
    marginRight: screenWidth * 0.04,
  },
  botonFlotante: {
    position: "absolute",
    top: screenHeight*0.16,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 5,
    zIndex: 10,
  },
  textoBoton: {
    color: "#333",
    fontWeight: "bold",
  },
  botonAgregarDireccion:{
    width:screenWidth*0.8,
    height:screenHeight*0.05,
    backgroundColor:'#4285F4',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20
  },
  textoBotonAgregarDireccion:{
    color: "#fff",
    fontSize:15
  }
});

export default AddAddressScreenStyles;
