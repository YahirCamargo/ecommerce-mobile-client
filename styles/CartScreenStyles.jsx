import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CartScreenStyles = StyleSheet.create({
  safeStyle: {
    width: screenWidth,
    flex: 1,
    backgroundColor: "#e6e6e6",
  },
  background: {
    flex: 1,
  },
  backgroundArriba: {
    width: screenWidth,
    height: screenHeight * 0.12,
    backgroundColor: "#000",
    alignItems: "left",
  },
  carritoVacioStyle: {
    marginHorizontal: screenWidth * 0.1,
    marginTop: screenHeight * 0.25,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nombreTexto: {
    color: "#fff",
    fontFamily: "Inter-Bold",
    fontSize: 20,
    marginTop: screenHeight * 0.02,
    marginLeft: screenWidth * 0.05,
  },
  mensajeTexto: {
    color: "#dbdbdb",
    fontFamily: "Inter",
    fontSize: 15,
    marginTop: screenHeight * 0.007,
    marginLeft: screenWidth * 0.05,
  },
  image: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 15,
  },
  backgroundAbajo:{
    width:screenWidth,
    height:screenHeight*0.825
  },
  botonLista: {
    marginVertical: screenHeight * 0.013,
    marginHorizontal: screenWidth * 0.05,
    width: screenWidth * 0.9,
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  botonTotal: {
    width: screenWidth,
    height:screenHeight*0.2,
    padding: 15,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //alignItems: "center",
  },
  contenedorTextoBotonTotal:{
    flexDirection:'row',
    width:screenWidth*0.9,
    //marginBottom:screenHeight*0.01
  },
  botonTotalIzquierda:{
    width:screenWidth*0.45,
    alignItems: 'flex-start'
  },
  botonTotalDerecha:{
    width:screenWidth*0.45,
    alignItems: 'flex-end'

  },
  botonVolver: {
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.8,
    height: screenHeight * 0.06,
    backgroundColor: "#2f7fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center'
  },
  informacionProducto: {
    marginLeft: screenWidth * 0.02,
    flex: 1,
    justifyContent: "flex-start",
    textAlignVertical: "center",
    alignSelf: "center",
  },
  modificarCantidadContenedor: {
    marginTop: screenHeight * 0.02,
    flexDirection: "row",
    height: screenHeight * 0.04,
    width: screenWidth * 0.28,
    alignSelf: "left",
    alignItems: "center",
    borderWidth: 1.3,
    borderRadius: 20,
    borderColor: "#E1AD01",
  },
  iconosBotones: {
    marginHorizontal: screenWidth * 0.01,
  },
  textoCantidadContenedor: {
    width: screenWidth * 0.1,
  },
  textoCantidad: {
    textAlignVertical: "center",
    alignSelf: "center",
  },
  comprarTexto:{
    color:'#fff',
    fontSize:15,
    fontFamily: "Inter-Bold",
  },
  
});

export default CartScreenStyles;
