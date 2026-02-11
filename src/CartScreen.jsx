import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../temporal/LinkEndpoints";
import styles from "../styles/CartScreenStyles";
import { AntDesign, Octicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "../store/cartStore";
import { LinearGradient } from "expo-linear-gradient";
const CartScreen = ({ navigation, setSession }) => {
  const products = useCartStore((s) => s.products);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeProduct = useCartStore((s) => s.removeProduct);
  const totalCarrito = useCartStore((s) => s.getTotal());

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

  const handleGetProducts = async (carritoItem) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/${carritoItem.productos_id}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        },
      );
      if (response.ok) {
        return await response.json();
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
        return await handleGetProducts();
      }
      if (!response.ok) {
        Alert.alert("Error al cargar");
        return null;
      }
    } catch (error) {
      console.error("Error de red:", error);
      return null;
    }
  };

  const handlePatchProducts = async (carritoItem, number) => {
    try {
      console.log(carritoItem);
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
      updateQuantity(carritoItem.id,carritoItem.cantidad+number);
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


  return (
    <SafeAreaView style={styles.safeStyle}>
      <View style={styles.background}>
        <LinearGradient
          colors={["#42A5F5", "#c75ee4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.5, y: 0 }}
          style={styles.backgroundArriba}
        >
          <View>
            <Text style={styles.nombreTexto}>Tu Carrito</Text>
            <Text style={styles.mensajeTexto}>
              {products.length === 0
                ? "Empieza agregando productos"
                : "Revisa tus artículos antes de finalizar."}
            </Text>
          </View>
        </LinearGradient>
        {products.length == 0 ? (
          <View style={styles.carritoVacioStyle}>
            <Feather name="shopping-cart" color={"#00244f"} size={100} />
            <Text>Aún no tienes productos en tu carrito</Text>
            <TouchableOpacity
              style={styles.botonVolver}
              onPress={() =>
                navigation.navigate("Main", {
                  screen: "HomeScreen",
                })
              }
            >
              <Text>Añadir productos</Text>
            </TouchableOpacity>
            <Text>Miles de productos te estan esperando</Text>
          </View>
        ) : (
          <View style={styles.backgroundAbajo}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.botonLista}>
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
                        {(item.precio * item.cantidad).toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                        })}
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
                        {item.cantidad == 1 ? (
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
              )}
              ListFooterComponen={<View style={{ height: 20 }} />}
            />
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
                onPress={() =>
                  navigation.navigate("CheckOutScreen")
                }
              >
                <Text style={styles.comprarTexto}>Continuar Compra</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
