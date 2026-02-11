import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import styles from "../styles/HomeScreenStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from "../temporal/LinkEndpoints";
import { useCartStore } from "../store/cartStore";

const HomeScreen = ({ navigation, setSession }) => {
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    id: "",
    rol: "",
  });
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const addOrUpdateProduct = useCartStore((s) => s.addOrUpdateProduct);
  const [loading, setLoading] = useState([]);

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

  const handleGetProducts = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        Alert.alert(
          "Error",
          data.detail || "No se pudieron cargar los productos",
        );
        return [];
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
      return [];
    }
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

  const handleCerrarSesion = async () => {
    console.log("Cerrando sesion");
    await SecureStore.deleteItemAsync("access_token");
    setSession(null);
  };

  const handleLenghtText = (name, limit) => {
    if (name?.trim().length > limit) {
      return name.slice(0, limit - 3) + "...";
    }
    return name;
  };

  const handleCartItems = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) {
        setSession(null);
        return [];
      }

      const response = await fetch(`${API_BASE_URL}/api/cart/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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

  const handlePostCarrito = async (item) => {
    try {
      setLoading((prev) => ({
        ...prev,
        [item.id]: true,
      }));
      const token = await SecureStore.getItemAsync("access_token");

      const response = await fetch(`${API_BASE_URL}/api/cart/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad: 1,
          productos_id: item.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Se ha añadido el producto al carrito");
        addOrUpdateProduct({
          ...item,
          cantidad: 1,
          carrito_id: data.id,
        });
        return data;
      } else {
        Alert.alert(
          "Error",
          data.detail || "No se pudieron cargar los productos",
        );
        return [];
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
      return [];
    } finally {
      setLoading((prev) => ({
        ...prev,
        [item.id]: false,
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await handleGetUser();
      setUser(dataUser);
      const data = await handleGetProducts();
      setProducts(data);
      products.forEach((product) => {
          setLoading((prev) => ({
            ...prev,
            [product.id]: false,
          }));
        }
      );
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeStyle}>
      <View style={styles.background}>
        <View style={styles.contenedorArriba}>
          <View style={styles.cabecera}>
            <View style={styles.saludoStyle}>
              <Text style={styles.textoNombre}>Hola {user.nombre}</Text>
              <Text style={styles.textoSaludo}>Buen Día</Text>
            </View>
          </View>
          <View
            style={[
              user.rol === "admin"
                ? styles.buscadorSeccionAdmin
                : styles.buscadorSeccion,
            ]}
          >
            <Ionicons name="search-outline" color={"gray"} size={30} />
            <TextInput
              placeholder="Search"
              value={search}
              style={styles.inputSearch}
              onChangeText={setSearch}
              returnKeyType="search"
            />
            {user.rol === "admin" && (
              <TouchableOpacity
                style={styles.botonAgregar}
                onPress={() => navigation.navigate("AddProductScreen")}
              >
                <AntDesign name="plus" color="white" size={28} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <FlatList
            numColumns={1}
            data={products}
            style={styles.list}
            keyExtractor={(item) =>
              item.id?.toString() || Math.random().toString()
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.botonLista}>
                <Image
                  source={{ uri: item.url_producto }}
                  style={styles.image}
                  onError={(e) => console.log("IMAGE ERROR:", e.nativeEvent)}
                />
                <View style={styles.informacionProducto}>
                  <Text style={styles.nombreProductos} numberOfLines={1}>
                    {item.nombre}
                  </Text>
                  {item.descripcion && (
                    <Text style={styles.textoPrecio} numberOfLines={3}>
                      {item.descripcion}
                    </Text>
                  )}
                  <View style={styles.contenedorPrecioBoton}>
                    <Text style={styles.textoPrecio}>${item.precio}</Text>
                    <TouchableOpacity
                      style={styles.botonAgregarCarrito}
                      onPress={() => handlePostCarrito(item)}
                      disabled={loading[item.id]}
                    >
                      <Text style={styles.textoBotonAgregarCarrito}>
                        {loading[item.id] ? "Agregando...":"Agregar al carrito"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
