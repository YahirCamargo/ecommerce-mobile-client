import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CheckOutScreenStyles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "#e6e6e6",
  },
  background: {
    width: screenWidth,
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  backgroundArriba: {
    width: screenWidth,
    height: screenHeight * 0.15,
    backgroundColor: "#000",
    alignItems: "left",
    paddingLeft: screenWidth * 0.05,
  },
  backgroundAbajo:{
    //marginHorizontal:screenWidth*0.05,
    flex:1
  },
  lista:{
    flex:1,
    marginTop: screenHeight * 0.02,
    width: screenWidth * 0.9,
    borderRadius: 15,
    backgroundColor: "#fff",
    padding: screenWidth*0.02,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 15,
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
    fontSize: 20,
    color: "#fff",
    fontFamily: "Inter",
  },
  titulo: {
    color: "#fff",
    fontFamily: "Inter-Bold",
    fontSize: 20,
    marginTop: screenHeight * 0.01,
  },
  descripcion: {
    color: "#dbdbdb",
    fontFamily: "Inter",
    fontSize: 15,
    marginTop: screenHeight * 0.007,
  },
  botonGenerico: {
    flexDirection: "row",
    width: screenWidth * 0.85,
    alignItems:'center',
  },
  contenedorBoton: {
    marginTop: screenHeight * 0.02,
    padding: screenWidth*0.02,
    borderRadius:15,
    backgroundColor:'#fff',
    elevation: 8,
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contenedorInformacion:{
    width:screenWidth*0.8,
  },
  botonTotal: {
    width: screenWidth*0.9,
    height:screenHeight*0.2,
    marginTop:screenHeight*0.02,
    padding: screenWidth*0.04,
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
  },
  contenedorTextoBotonTotal:{
    flexDirection:'row',
    width:screenWidth*0.9,
  },
  botonTotalIzquierda:{
    width:screenWidth*0.44,
    alignItems: 'flex-start'
  },
  botonTotalDerecha:{
    width:screenWidth*0.4,
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
  botonLista: {
    flexDirection: "row",
    marginVertical:screenHeight*0.01
  },
  titulosSeccion:{
    color:'#000',
    fontSize:15,
    fontFamily: "Inter-Bold",
  }
});

export default CheckOutScreenStyles;
