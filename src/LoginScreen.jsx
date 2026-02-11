import React, { useState } from "react";
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
import styles from "../styles/loginScreenStyles";
import { Fontisto, Feather, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../temporal/LinkEndpoints";
import { useCartStore } from "../store/cartStore";

import TopImage from "../assets/logo3.png";

const LoginScreen = ({ navigation, setSession }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secureMode, setSecureMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const setProducts = useCartStore((s) => s.setProducts);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    setLoading(true);

    try {
      const details = {
        grant_type: "password",
        username: email,
        password: password,
        client_id: "string",
      };

      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key]),
        )
        .join("&");

      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        },
      );

      const data = await response.json();

      if (response.ok) {
        await SecureStore.setItemAsync("access_token", data.access_token);
        await SecureStore.setItemAsync("refresh_token", data.refresh_token);

        const cartResponse = await fetch(
          `${API_BASE_URL}/api/cart/`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${data.access_token}`,
            },
          },
        );

        if (cartResponse.ok) {
          const cartItems = await cartResponse.json();

          const products = await Promise.all(
            cartItems.map(async (item) => {
              const res = await fetch(
                `${API_BASE_URL}/api/products/${item.productos_id}`,
                {
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${data.access_token}`,
                  },
                },
              );

              const product = await res.json();

              return {
                ...product,
                cantidad: item.cantidad,
                carrito_id: item.id,
              };
            }),
          );

          setProducts(products);
        } else {
          setProducts([]);
        }
        setSession(data.access_token);
      } else {
        Alert.alert("Error", data.detail || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
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
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={TopImage} />
            </View>
            <View style={styles.fondoContenido}>
              <View style={styles.contenido}>
                <Text style={styles.textoIniciarSesion}>Iniciar Sesión</Text>
                <Text style={styles.textoDescripcion}>Bienvenido de nuevo</Text>
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
                <Text style={styles.textoOlvidasteContraseña}>
                  ¿Olvidaste tu contraseña?
                </Text>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.textoBoton}>
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                  </Text>
                </TouchableOpacity>
                <View style={styles.registrarContenedor}>
                  <Text style={styles.textoDescripcion}>
                    ¿No tienes cuenta?{" "}
                  </Text>
                  <Text
                    style={styles.textoRegistrar}
                    onPress={() => navigation.replace("SignUpScreen")}
                  >
                    Registrate
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
