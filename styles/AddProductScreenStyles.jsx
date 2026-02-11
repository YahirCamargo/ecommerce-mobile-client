import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddProductScreenStyles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuStyle: {
    flexDirection: "row",
    width: screenWidth * 0.85,
    height: screenHeight * 0.05,
    marginVertical: "3%",
    backgroundColor: "#E7EDF4",
    borderRadius: 25,
    paddingLeft: 15,
    alignItems: "center",
    borderWidth: 0.2,
    paddingHorizontal: 8,
  },
  customStyle: {
    textAlign: "left",
    width: screenWidth * 0.72,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: screenWidth * 0.95,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  contenedorVolver: {
    width: screenWidth,
    height: screenHeight * 0.05,
  },
  botonRegresar: {
    width: screenWidth,
    height: screenHeight * 0.05,
    backgroundColor: "#082e8e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  textoRegresar: {
    color: "#fff",
    fontSize: 20,
    verticalAlign: "center",
    textAlign: "center",
  },
  flechaRegresar: {
    position: "absolute",
    left: screenWidth * 0.04,
  },
  imagen: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    marginVertical: 10,
    justifyContent: "center",
    verticalAlign: "center",
    textAlign: "center",
    borderColor: "#000",
    borderWidth: 1,
  },
  iconoGaleria: {
    justifyContent: "center",
    verticalAlign: "center",
    textAlign: "center",
  },
  contenedorTextInputs: {
    flexDirection: "row",
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: screenWidth * 0.46,
    height: screenHeight * 0.055,
    paddingHorizontal: 10,
  },
  inputDescripcion: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: screenWidth * 0.96,
    height: screenHeight * 0.055,
    paddingHorizontal: 10,
  },
  perimetroInputs: {
    marginHorizontal: screenWidth * 0.018,
  },
  perimetroInputDescripcion: {
    paddingTop: screenWidth * 0.02,
  },
  botonGuardar: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.06,
    backgroundColor: "#082e8e",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textoGuardar: {
    alignSelf: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 17,
  },
});

export default AddProductScreenStyles;
