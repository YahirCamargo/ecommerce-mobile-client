import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import styles from "../styles/AddressesScreenStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../temporal/LinkEndpoints";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function AddressesScreen({ navigation, setSession }) {
  const [addresses, setAddresses] = useState([]);

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

  const handleAddresses = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) {
        setSession(null);
        return [];
      }

      const response = await fetch(
        `${API_BASE_URL}/api/addresses/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          await SecureStore.deleteItemAsync("access_token");
          await SecureStore.deleteItemAsync("refresh_token");
          setSession(null);
          return;
        }

        setSession(newAccessToken);

        return await handleCartItems();
      }

      if (!response.ok) {
        console.log("Error:", response.status);
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error de red:", error);
      return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const dataAddresses = await handleAddresses();
        setAddresses(dataAddresses);
      };

      fetchData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeStyle}>
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
            <Text style={styles.titulo}>Direcciones</Text>
            <Text style={styles.descripcion}>Bienvenido a tus direcciones</Text>
          </View>
        </LinearGradient>
        <TouchableOpacity
          style={styles.botonFlotante}
          onPress={() => navigation.navigate("AddAddressScreen")}
        >
          <Text style={styles.textoBoton}>Agregar Dirección</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          {addresses.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                option.preferido && {
                  borderWidth: 1,
                  borderColor: "#00ce0e",
                  borderStyle: "solid",
                },
              ]}
              onPress={() =>
                navigation.navigate("EditAddressScreen", {
                  address: option,
                })
              }
            >
              <View style={styles.contendorDirecciones}>
                <Text style={styles.destinatarioNombre}>
                  {option.destinatario}, CP {option.cp}
                </Text>
                <Text style={styles.optionText}>
                  {option.calle}, {option.colonia}, {option.ciudad},{" "}
                  {option.estado}
                </Text>
                {option.preferido && (
                  <Text style={styles.preferidoText}>Direccion Preferida</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
