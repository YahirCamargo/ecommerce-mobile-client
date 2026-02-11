import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/UserScreenStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../temporal/LinkEndpoints";

const UserScreen = ({ navigation, setSession }) => {
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    id: "",
    rol: "",
  });

  const menuOptions = [
    {
      id: "1",
      title: "Mis pedidos",
      icon: "cube-outline",
      screen: "OrdersScreen",
      color: "#3D99F5",
      textColor: "#000",
    },
    {
      id: "2",
      title: "Direcciones",
      icon: "location-outline",
      screen: "AddressesScreen",
      color: "#10B981",
      textColor: "#000",
    },
    {
      id: "3",
      title: "Tarjetas",
      icon: "card-outline",
      screen: "PaymentsMethodsScreen",
      color: "#F59E0B",
      textColor: "#000",
    },
    {
      id: "4",
      title: "Notificaciones",
      icon: "notifications-outline",
      screen: "HistoryScreen",
      color: "#8B5CF6",
      textColor: "#000",
    },
    {
      id: "5",
      title: "Cerrar sesion",
      icon: "log-out-outline",
      screen: "HelpCenterScreen",
      color: "#ff0000",
      textColor: "#ff0000",
    },
  ];

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("access_token");
          await SecureStore.deleteItemAsync("refresh_token");
          setSession(null);
        },
      },
    ]);
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
    return data.access_token;
  };

  const handleGetUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");

      const response = await fetch(
        `${API_BASE_URL}/api/auth/perfil`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        return data;
      }
      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          await SecureStore.deleteItemAsync("access_token");
          await SecureStore.deleteItemAsync("refresh_token");
          setSession(null);
          return;
        }

        setSession(newAccessToken);

        return await handleGetUser();
      } else {
        Alert.alert("Error", data.detail || "No se pudo cargar el usuario");
        return [];
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await handleGetUser();
      setUser(dataUser);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeStyle}>
      <View style={styles.background}>
        <LinearGradient
          colors={["#42A5F5", "#c75ee4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.5, y: 0 }}
          style={styles.backgroundArriba}
        >
          <View style={styles.iconoContenedor}>
            <Feather name="user" color={"#000"} size={50} />
          </View>
          <View>
            <Text style={styles.nombreTexto}>{user.nombre}</Text>
            <Text style={styles.correoTexto}>{user.email}</Text>
          </View>
        </LinearGradient>
        <View style={styles.section}>
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={async() => {
                if (option.id === "5") {
                  await handleLogout();
                } else {
                  navigation.navigate(option.screen);
                }
              }}
            >
              <View
                style={[
                  styles.optionIcon,
                  { backgroundColor: option.color + "20" },
                ]}
              >
                <Ionicons name={option.icon} size={28} color={option.color} />
              </View>
              <Text style={[styles.optionText, { color: option.textColor }]}>
                {option.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default UserScreen;
