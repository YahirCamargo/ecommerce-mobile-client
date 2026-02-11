import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignUpScreenStyle = StyleSheet.create({
  safeStyle: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "#fff",
  },
  background: {
    width: screenWidth,
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundArriba: {
    width: screenWidth,
    height: screenHeight * 0.2,
  },
  contenedorArriba: {
    marginHorizontal: screenWidth * 0.05,
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
  botonesPerimetro: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.06,
    borderColor: "#c3c3c3",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.015,
    verticalAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  icono: {
    marginStart: "3%",
    alignSelf: "center",
  },
  inputCorreo: {
    marginStart: "3%",
    width: screenWidth * 0.7,
  },
  inputsContraseña: {
    marginStart: "3%",
    width: screenWidth * 0.65,
  },
  ojoContraseña: {
    marginLeft: "3%",
  },
  boton: {
    marginTop: "10%",
    width: screenWidth * 0.9,
    height: screenHeight * 0.06,
    backgroundColor: "#4285F4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBoton: {
    alignSelf: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 17,
  },
  registrarContenedor: {
    marginTop: "13%",
    flexDirection: "row",
    alignSelf: "center",
  },
  textoDescripcion: {
    fontSize: 18,
    color: "#656565",
    fontFamily: "Inter",
  },
  textoInicioSesion: {
    fontSize: 18,
    color: "#4285F4",
    fontFamily: "Inter",
  },
});

export default SignUpScreenStyle;
