import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddressesScreenStyles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "#e6e6e6",
  },
  background: {
    width: screenWidth,
    flex: 1,
    position: "relative",
  },
  botonFlotante: {
    position: "absolute",
    top: screenHeight*0.21,
    alignSelf: "center",
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 5,
    zIndex: 10,
  },
  backgroundArriba: {
    width: screenWidth,
    height: screenHeight * 0.24,
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
    marginTop: screenHeight * 0.02,
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
    fontSize: 30,
    color: "#fff",
    fontFamily: "Inter",
    marginTop: screenHeight * 0.02,
  },
  descripcion: {
    fontSize: 20,
    color: "#e8e6e6",
    fontFamily: "Inter",
    marginTop: screenHeight * 0.015,
  },
  texto: {
    fontSize: 17,
    color: "#000",
    fontFamily: "Inter",
    marginTop: screenHeight * 0.02,
  },
  optionItem: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.15,
    marginVertical: screenHeight * 0.015,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
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
  optionItem: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.15,
    marginVertical: screenHeight * 0.015,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
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
  contendorDirecciones: {
    marginHorizontal:screenWidth*0.03,
    alignItems:'center',
    verticalAlign:'center',
  },
  destinatarioNombre:{
    fontSize:15,
    fontFamily: 'Inter-Bold',
  },
  optionText:{
    fontSize:14,
    fontFamily: 'Inter',
    textAlign:'center'
  },
  preferidoText:{
    fontSize:14,
    color:'#8b8b8b',
    fontFamily: 'Inter',
    textAlign:'center'
  },
  section:{
    marginTop:screenHeight*0.03
  },
  textoBoton:{
    fontSize:14,
    color:'#fff',
    fontFamily: 'Inter',
  }
});

export default AddressesScreenStyles;
