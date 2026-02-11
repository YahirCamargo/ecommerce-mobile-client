import { useState } from "react";
import {
  Alert,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import styles from "../styles/SignUpScreenStyle";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Fontisto, Entypo } from "@expo/vector-icons";
import { API_BASE_URL } from "../temporal/LinkEndpoints";

const SignUpScreen = ({ navigation, setSession }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secureMode, setSecureMode] = useState(true);
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [secureModeRepeat, setSecureModeRepeat] = useState(true);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    if (password != passwordRepeat) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: name,
            email: email,
            contrasena: password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", "Usuario registrado correctamente");
        navigation.replace("LoginScreen");
      } else {
        Alert.alert("Error", data.detail || "No se pudo registrar");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <KeyboardAvoidingView
        style={styles.safeStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <View style={styles.background}>
            <LinearGradient
              colors={["#42A5F5", "#c75ee4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.5, y: 0 }}
              style={styles.backgroundArriba}
            >
              <View style={styles.contenedorArriba}>
                <TouchableOpacity
                  style={styles.botonRegresar}
                  onPress={() => navigation.replace("LoginScreen")}
                >
                  <Feather name="arrow-left" color={"white"} size={24} />
                  <Text style={styles.textoRegresar}>Volver</Text>
                </TouchableOpacity>
                <Text style={styles.titulo}>Crear cuenta</Text>
                <Text style={styles.descripcion}>Unete ahora</Text>
              </View>
            </LinearGradient>
            <View style={styles.contenedorAbajo}>
              <Text style={styles.texto}>Nombre Completo</Text>
              <View style={styles.botonesPerimetro}>
                <Feather
                  style={styles.icono}
                  name="user"
                  color={"gray"}
                  size={28}
                />
                <TextInput
                  placeholder="Juan Pérez"
                  value={name}
                  style={styles.inputCorreo}
                  onChangeText={setName}
                />
              </View>
              <Text style={styles.texto}>Correo Electrónico</Text>
              <View style={styles.botonesPerimetro}>
                <Fontisto
                  style={styles.icono}
                  name="email"
                  color={"gray"}
                  size={28}
                />
                <TextInput
                  placeholder="tu@email.com"
                  value={email}
                  style={styles.inputCorreo}
                  onChangeText={setEmail}
                />
              </View>
              <Text style={styles.texto}>Contraseña</Text>
              <View style={styles.botonesPerimetro}>
                <Feather
                  style={styles.icono}
                  name="lock"
                  color={"gray"}
                  size={28}
                />
                <TextInput
                  placeholder="••••••••"
                  value={password}
                  style={styles.inputsContraseña}
                  onChangeText={setPassword}
                  secureTextEntry={secureMode}
                />
                <TouchableOpacity
                  style={styles.ojoContraseña}
                  onPress={() => setSecureMode(!secureMode)}
                >
                  <Entypo
                    name={secureMode ? "eye-with-line" : "eye"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.texto}>Confirmar Contraseña</Text>
              <View style={styles.botonesPerimetro}>
                <Feather
                  style={styles.icono}
                  name="lock"
                  color={"gray"}
                  size={28}
                />
                <TextInput
                  placeholder="••••••••"
                  value={passwordRepeat}
                  style={styles.inputsContraseña}
                  onChangeText={setPasswordRepeat}
                  secureTextEntry={secureModeRepeat}
                />
                <TouchableOpacity
                  style={styles.ojoContraseña}
                  onPress={() => setSecureModeRepeat(!secureModeRepeat)}
                >
                  <Entypo
                    name={secureModeRepeat ? "eye-with-line" : "eye"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.boton} onPress={handleSignUp}>
                <Text style={styles.textoBoton}>Iniciar Sesión</Text>
              </TouchableOpacity>
              <View style={styles.registrarContenedor}>
                <Text style={styles.textoDescripcion}>¿Ya tienes cuenta? </Text>
                <Text
                  style={styles.textoInicioSesion}
                  onPress={() => navigation.replace("LoginScreen")}
                >
                  Inicia Sesión
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
