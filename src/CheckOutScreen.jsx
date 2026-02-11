import { useEffect, useState } from "react";
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
  FlatList,
} from "react-native";
import styles from "../styles/CheckOutScreenStyles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, AntDesign, Octicons } from "@expo/vector-icons";
import { API_BASE_URL } from "../temporal/LinkEndpoints";
import { Dimensions } from "react-native";
import { useCartStore } from "../store/cartStore";
import * as SecureStore from "expo-secure-store";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CheckOutScreen = ({ navigation, setSession }) => {
  const products = useCartStore((s) => s.products);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeProduct = useCartStore((s) => s.removeProduct);
  const totalCarrito = useCartStore((s) => s.getTotal());
  const limpiarCarrito = useCartStore((s) => s.clearCart);
  const [loading, setLoading] = useState(false);

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

  const handlePatchProducts = async (carritoItem, number) => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) {
        setSession(null);
        return [];
      }

      const response = await fetch(
        `${API_BASE_URL}/api/cart/${carritoItem.carrito_id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cantidad: carritoItem.cantidad + number }),
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
        return await handlePatchProducts(carritoItem, number);
      }
      if (!response.ok) {
        Alert.alert("Error al cargar");
        return null;
      }

      updateQuantity(carritoItem.id, carritoItem.cantidad + number);
    } catch (error) {
      console.error("Error de red:", error);
      return null;
    }
  };

  const handleDeleteProduct = async (carritoItem) => {
    Alert.alert(
      "Borrar",
      "¿Estás seguro de que quieres borrar esto del carrito?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await SecureStore.getItemAsync("access_token");
              if (!token) {
                setSession(null);
                return;
              }

              await fetch(
                `${API_BASE_URL}/api/cart/${carritoItem.carrito_id}`,
                {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              removeProduct(carritoItem.id);
            } catch (error) {
              console.error("Error al eliminar:", error);
            }
          },
        },
      ],
    );
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) {
        setSession(null);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/checkout/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            metodo_de_pago_id: "bcaad73e-fb94-45dc-86ba-f3aaac198569",
          }),
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
        return await handleCheckout();
      }
      if (!response.ok) {
        Alert.alert("Error al hacer la compra");
        return;
      }
      Alert.alert("Success", "Se ha realizado la compra");
      limpiarCarrito();
      navigation.goBack();
    } catch (error) {
      console.error("Error de red:", error);
      return;
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
            <LinearGradient
              colors={["#42A5F5", "#c75ee4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.5, y: 0 }}
              style={styles.backgroundArriba}
            >
              <TouchableOpacity
                style={styles.botonRegresar}
                onPress={() => navigation.goBack()}
              >
                <Feather name="arrow-left" color={"white"} size={24} />
                <Text style={styles.textoRegresar}>Volver</Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.titulo}>Tu Carrito</Text>
                <Text style={styles.descripcion}>Vamos compra tu carrito</Text>
              </View>
            </LinearGradient>
            <View style={styles.backgroundAbajo}>
              <View style={styles.contenedorBoton}>
                <Text style={styles.titulosSeccion}>Dirección de entrega</Text>
                <TouchableOpacity
                  style={[styles.botonGenerico, { height: screenHeight * 0.1 }]}
                >
                  <View style={styles.contenedorInformacion}>
                    <Text>Nombre: Yahir Camargo</Text>
                    <Text>Calle: Gral. Lazaro Cardenas</Text>
                    <Text>Lo siguiente</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
                </TouchableOpacity>
              </View>

              <View style={styles.lista}>
                <Text style={styles.titulosSeccion}>Productos</Text>
                {products.map((item) => (
                  <View key={item.id.toString()} style={styles.botonLista}>
                    <TouchableOpacity>
                      <Image
                        source={{ uri: item.url_producto }}
                        style={styles.image}
                      />
                    </TouchableOpacity>

                    <View style={styles.informacionProducto}>
                      <TouchableOpacity>
                        <Text style={styles.nombreProducto}>{item.nombre}</Text>
                        <Text style={styles.precioProducto}>
                          $
                          {(item.precio * item.cantidad).toLocaleString(
                            "es-MX",
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </Text>
                      </TouchableOpacity>

                      <View style={styles.modificarCantidadContenedor}>
                        <TouchableOpacity
                          onPress={async () => {
                            if (item.cantidad === 1) {
                              await handleDeleteProduct(item);
                            } else {
                              await handlePatchProducts(item, -1);
                            }
                          }}
                        >
                          {item.cantidad === 1 ? (
                            <Octicons
                              name="trash"
                              style={styles.iconosBotones}
                              color={"black"}
                              size={28}
                            />
                          ) : (
                            <AntDesign
                              name="minus"
                              style={styles.iconosBotones}
                              color={"black"}
                              size={28}
                            />
                          )}
                        </TouchableOpacity>

                        <View style={styles.textoCantidadContenedor}>
                          <Text style={styles.textoCantidad}>
                            {item.cantidad}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={async () => {
                            await handlePatchProducts(item, 1);
                          }}
                        >
                          <AntDesign
                            name="plus"
                            style={styles.iconosBotones}
                            color={"black"}
                            size={28}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.contenedorBoton}>
                <Text style={styles.titulosSeccion}>Tarjeta de pago</Text>
                <TouchableOpacity
                  style={[styles.botonGenerico, { height: screenHeight * 0.1 }]}
                >
                  <View style={styles.contenedorInformacion}>
                    <Text>Nombre: Yahir Camargo</Text>
                    <Text>Calle: Gral. Lazaro Cardenas</Text>
                    <Text>Lo siguiente</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
                </TouchableOpacity>
              </View>

              <View style={styles.botonTotal}>
                <View style={styles.contenedorTextoBotonTotal}>
                  <View style={styles.botonTotalIzquierda}>
                    <Text>SubTotal:</Text>
                    <Text>Envio:</Text>
                    <Text>IVA:</Text>
                    <Text>Total:</Text>
                  </View>
                  <View style={styles.botonTotalDerecha}>
                    <Text>
                      $
                      {totalCarrito.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                    <Text>
                      {totalCarrito >= 300
                        ? " Gratis"
                        : " $" +
                          (90).toLocaleString("es-MX", {
                            minimumFractionDigits: 2,
                          })}
                    </Text>
                    <Text>
                      $
                      {(totalCarrito * 0.16).toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                    <Text>
                      $
                      {totalCarrito >= 300
                        ? (totalCarrito * 1.16).toLocaleString("es-MX", {
                            minimumFractionDigits: 2,
                          })
                        : (totalCarrito * 1.16 + 90).toLocaleString("es-MX", {
                            minimumFractionDigits: 2,
                          })}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.botonVolver}
                  disabled={loading}
                  onPress={async () => await handleCheckout()}
                >
                  <Text style={styles.comprarTexto}>
                    {loading ? "Comprando..." : "Realizar Compra"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default CheckOutScreen;
