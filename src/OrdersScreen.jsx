import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../temporal/LinkEndpoints";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import styles from "../styles/OrdersScreenStyle";

const OrdersScreen = ({ navigation, setSession }) => {
  const [orders, setOrders] = useState([]);

  const colores = {
    PENDIENTE: {
      color: "#B9770E",
      background: "#fef3c7",
      label: "Pendiente",
    },
    EN_TRANSITO: {
      color: "#2563eb",
      background: "#dbeafe",
      label: "En tránsito",
    },
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

  const handleGetOrders = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");

      const response = await fetch(
        `${API_BASE_URL}/api/orders-check/`,
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

        return await handleGetOrders();
      } else {
        Alert.alert(
          "Error",
          data.detail || "No se pudieron cargar los pedidos",
        );
        return [];
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
      return [];
    }
  };

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
      .format(fecha)
      .replace(".", "");
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await handleGetOrders();
        setOrders(data);
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
            <Text style={styles.titulo}>Bienvenido a tus pedidos</Text>
            <Text style={styles.descripcion}>
              Gestiona y revisa tus envíos en curso
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.section}>
          {orders.map((option) => (
            <TouchableOpacity
              key={option.pedido.id}
              style={styles.optionItem}
              onPress={async () => {}}
            >
              <View style={styles.textoBotonContenedor}>
                <Text style={styles.optionTextTotal}>
                  $
                  {option.pedido.importe_productos.toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </Text>

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.optionText} numberOfLines={1}>
                    Fecha: {formatearFecha(option.pedido.fecha)}
                  </Text>

                  <Text style={styles.optionText}>
                    {" - " + option.productos.length}{" "}
                    {option.productos.length === 1 ? "artículo" : "artículos"}
                  </Text>
                </View>

                <View
                  style={[
                    {
                      backgroundColor: colores[option.envio.estado].background,
                    },
                    styles.contenedorEstadoEnvio,
                  ]}
                >
                  <AntDesign
                    name="pinterest"
                    size={10}
                    color={colores[option.envio.estado].color}
                  />
                  <Text style={styles.textoEstado}>
                    {colores[option.envio.estado].label}
                  </Text>
                </View>
              </View>
              <View style={styles.flechaBotonContenedor}>
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;
