import { StyleSheet,Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const LoginScreenStyles = StyleSheet.create({
    safeStyle:{
        flex:1,
        width:screenWidth,
        backgroundColor: '#fff'
    },
    background:{
        width:screenWidth,
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    logo:{
        width: screenWidth,
        height: screenHeight * 0.33,
        resizeMode: "cover"
    },
    logoContainer:{
        width:screenWidth,
        height: screenHeight*0.3
    },
    fondoContenido:{
        backgroundColor:'#fff',
        width:screenWidth,
        flex: 1,
        minHeight: screenHeight * 0.70,
        borderTopRightRadius:3,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    contenido:{
        paddingLeft:screenWidth*0.1,
        paddingRight:screenWidth*0.1,
        paddingBlockStart:screenHeight*0.04
    },
    textoIniciarSesion:{
        fontSize:25,
        fontFamily: 'Inter-Bold',
        marginBottom:'4%',
    },
    textoDescripcion:{
        fontSize:18,
        color:'#656565',
        fontFamily: 'Inter',
    },
    textoRegistrar:{
        fontSize:18,
        color:'#4285F4',
        fontFamily: 'Inter',
    },
    texto:{
        color:'#000',
        fontSize:18,
        marginTop:'10%',
        fontFamily: 'Inter',
    },
    botonesPerimetro:{
        width:screenWidth*0.8,
        height:screenHeight*0.06,
        borderColor:'#c3c3c3',
        borderWidth:1,
        borderRadius:10,
        marginTop:'3%',
        verticalAlign:'center',
        flexDirection:'row',
        alignItems: 'center'
    },
    icono:{
        marginStart:'3%',
        alignSelf:'center'
    },
    inputCorreo:{
        marginStart:'3%',
        width:screenWidth*0.65
    },
    inputsContraseña:{
        marginStart:'3%',
        width:screenWidth*0.57
    },
    textoOlvidasteContraseña:{
        marginTop:'10%',
        color:'#4285F4',
        fontSize:16
    },
    boton:{
        marginTop:'10%',
        width:screenWidth*0.8,
        height:screenHeight*0.06,
        backgroundColor:'#4285F4',
        borderRadius:20,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    textoBoton:{
        alignSelf:'center',
        textAlignVertical:'center',
        color:'#fff',
        fontSize:17
    },
    registrarContenedor:{
        marginTop:'13%',
        flexDirection:'row',
        alignSelf:'center',
    },
    ojoContraseña:{
        marginLeft:'3%',
    }
});

export default LoginScreenStyles;