import React, { Component, useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  Alert,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../temporal/LinkEndpoints";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/AddAddressScreenStyles";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";

const AddAddressScreen = ({ navigation, setSession }) => {
  const [remitente, setRemitente] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [colonia, setColonia] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [estado, setEstado] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [detalles, setDetalles] = useState("");
  const [preferido, setPreferido] = useState(false);

  const refreshToken = async () => {
    const refreshToken = await SecureStore.getItemAsync("refresh_token");
    if (!refreshToken) return null;

    const response = await fetch(
      `${API_BASE_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      },
    );

    if (!response.ok) return null;

    const data = await response.json();

    await SecureStore.setItemAsync("access_token", data.access_token);
    await SecureStore.setItemAsync("refresh_token", data.refresh_token);
    return data.access_token;
  };

  const getAddress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setCalle(address[0].street);
    setNumero(address[0].streetNumber);
    setColonia(address[0].district);
    setCodigoPostal(address[0].postalCode);
    setEstado(address[0].region);
    setCiudad(address[0].city);
  };

  const refreshAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync("refresh_token");
    if (!refreshToken) return null;

    const response = await fetch(
      `${API_BASE_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      },
    );

    if (!response.ok) return null;

    const data = await response.json();

    await SecureStore.setItemAsync("access_token", data.access_token);
    await SecureStore.setItemAsync("refresh_token", data.refresh_token);
    return data.access_token;
  };

  const handlePostAddress = async () => {
    const token = await SecureStore.getItemAsync("access_token");

    if (!token) {
      await refreshAccessToken();
      return await handlePostAddress();
    }
    if (
      !remitente ||
      !calle ||
      !numero ||
      !colonia ||
      !codigoPostal ||
      !estado ||
      !ciudad
    ) {
      Alert.alert("Error", "Complete todos los campos");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/addresses/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remitente: remitente,
            calle: calle,
            numero: numero,
            colonia: colonia,
            cp: codigoPostal,
            estado: estado,
            ciudad: ciudad,
            detalles: detalles,
            preferido: preferido,
          }),
        },
      );

      const data = await response.json();

      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          await SecureStore.deleteItemAsync("access_token");
          await SecureStore.deleteItemAsync("refresh_token");
          setSession(null);
          return;
        }

        setSession(newAccessToken);
        return await handlePostAddress();
      }

      if (!response.ok) {
        console.log("Error:", response.status);
        return;
      }

      Alert.alert("Éxito", "Dirección agregada");
      navigation.goBack();
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
                  onPress={() => navigation.goBack()}
                >
                  <Feather name="arrow-left" color={"white"} size={24} />
                  <Text style={styles.textoRegresar}>Volver</Text>
                </TouchableOpacity>
                <Text style={styles.titulo}>Nueva Dirección</Text>
                <Text style={styles.descripcion}>
                  Completa los datos de tu dirección
                </Text>
              </View>
            </LinearGradient>
            <TouchableOpacity
              style={styles.botonFlotante}
              onPress={async () => await getAddress()}
            >
              <Text style={styles.textoBoton}>Obtener dirección</Text>
            </TouchableOpacity>
            <View style={styles.fondoAbajo}>
              <Text style={styles.textoArribaInput}>*Remitente</Text>
              <TextInput
                placeholder="Ej: Juan Pérez"
                style={styles.input}
                value={remitente}
                onChangeText={setRemitente}
              />

              <Text style={styles.textoArribaInput}>*Calle</Text>
              <TextInput
                placeholder="Ej: Benito Juarez"
                style={styles.input}
                value={calle}
                onChangeText={setCalle}
              />

              <View style={styles.contenedorInputsMezclados}>
                <View style={styles.contenedorInput}>
                  <Text style={styles.textoArribaInput}>*Colonia</Text>
                  <TextInput
                    placeholder="Ej: Santa Fe"
                    style={styles.inputPequeño}
                    value={colonia}
                    onChangeText={setColonia}
                  />
                </View>

                <View>
                  <Text style={styles.textoArribaInput}>*Numero</Text>
                  <TextInput
                    placeholder="Ej: 181"
                    style={styles.inputPequeño}
                    value={numero}
                    onChangeText={setNumero}
                  />
                </View>
              </View>

              <Text style={styles.textoArribaInput}>*Codigo Postal</Text>
              <TextInput
                placeholder="Ej: 53400"
                style={styles.input}
                value={codigoPostal}
                onChangeText={setCodigoPostal}
                keyboardType="number-pad"
              />

              <Text style={styles.textoArribaInput}>*Ciudad</Text>
              <TextInput
                placeholder="Ej: Morelia"
                style={styles.input}
                value={ciudad}
                onChangeText={setCiudad}
              />

              <Text style={styles.textoArribaInput}>*Estado</Text>
              <TextInput
                placeholder="Ej: Michoacan"
                style={styles.input}
                value={estado}
                onChangeText={setEstado}
              />

              <Text style={styles.textoArribaInput}>Detalles</Text>
              <TextInput
                placeholder="Ej: Al lado de la panaderia"
                style={styles.input}
                value={detalles}
                onChangeText={setDetalles}
                multiline={true}
                numberOfLines={2}
                textAlignVertical="top"
              />

              <View style={styles.contenedorMezclado}>
                <Checkbox
                  value={preferido}
                  onValueChange={setPreferido}
                  color={preferido ? "#4630EB" : undefined}
                />
                <Text style={styles.textoPreferido}>
                  Elegir domicilio como preferido
                </Text>
              </View>
              <TouchableOpacity
                style={styles.botonAgregarDireccion}
                onPress={async () => await handlePostAddress()}
              >
                <Text style={styles.textoBotonAgregarDireccion}>
                  Agregar dirección
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;
