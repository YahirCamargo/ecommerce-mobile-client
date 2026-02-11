import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "left",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  safeStyle: {
    width: screenWidth,
    height:screenHeight,
    backgroundColor: "#e6e6e6",
  },
  background: {
    width: screenWidth,
    height:screenHeight,
    marginTop: screenHeight * 0.005,
  },
  contenedorArriba:{
    marginHorizontal:screenWidth*0.05
  },
  textoNombre: {
    fontFamily: "Inter",
    fontSize: 15,
  },
  textoSaludo: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },
  buscadorSeccion: {
    flexDirection: "row",
    marginTop: screenHeight * 0.02,
    borderWidth: 1,
    borderRadius: 10,
    alignItems:'center',
    paddingLeft:screenWidth*0.02
  },
  buscadorSeccionAdmin:{
    flexDirection: "row",
    marginTop: screenHeight * 0.02,
    borderWidth: 1,
    borderRadius: 10,
    alignItems:'center',
    paddingLeft:screenWidth*0.02,
    width: screenWidth * 0.75
  },
  cabecera: {
    flexDirection: "row",
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
  },
  inputSearch: {
    flexDirection:'row',
    width: screenWidth * 0.65,
    height: screenHeight * 0.055,
    paddingRight: screenWidth * 0.04,
    paddingLeft: screenWidth * 0.03,
  },
  botonBuscar: {
    height: screenHeight * 0.055,
    width: screenHeight * 0.055,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: screenWidth * 0.03,
    borderRadius: 10,
  },
  botonAgregar: {
    backgroundColor: "#000",
    height: screenHeight * 0.055,
    width: screenHeight * 0.055,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "center",
    marginLeft: screenWidth * 0.03,
  },
  saludoStyle: {
    width: screenWidth * 0.78,
  },
  image: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius:15
  },
  botonLista: {
    marginVertical: screenHeight * 0.013,
    marginHorizontal:screenWidth*0.05,
    width: screenWidth * 0.9,
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "#fff",
    padding: 10,
    elevation:5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  informacionProducto: {
    marginLeft: screenWidth * 0.02,
    flex: 1,
    justifyContent: "flex-start",
    textAlignVertical:'center'
  },
  nombreProductos: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
  textoPrecio: {
    color: "#000",
    fontSize: 15,
    fontFamily: "Inter",
    flexWrap: "wrap",
  },
  botonAgregarCarrito:{
    backgroundColor: "#0151d1",
    height:screenHeight*0.035,
    justifyContent:'center',
    borderRadius:10,
    marginTop:screenHeight*0.01
  },
  textoBotonAgregarCarrito:{
    alignSelf:'center',
    color:'#fff',
  }
});

export default LoginScreenStyles;
