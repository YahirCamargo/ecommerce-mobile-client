import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/AddProductScreenStyles";

import { API_BASE_URL } from "../temporal/LinkEndpoints";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, EvilIcons } from "@expo/vector-icons";

const AddProductScreen = ({ navigation, setSession }) => {
  const [imageUri, setImageUri] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [sku, setSku] = useState("");
  const [color, setColor] = useState("");
  const [marca, setMarca] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [peso, setPeso] = useState("");
  const [alto, setAlto] = useState("");
  const [ancho, setAncho] = useState("");
  const [profundidad, setProfundidad] = useState("");
  const [categoriasId, setCategoriasId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const dropdownRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);

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

  const handleGetCategories = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/categories/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      );

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

  const handleAddProduct = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");

      if (!token) {
        Alert.alert("Sesión expirada");
        setSession(null);
        return;
      }

      const formData = new FormData();

      formData.append("nombre", nombre);
      formData.append("precio", precio);
      formData.append("sku", sku);
      formData.append("color", color);
      formData.append("marca", marca);
      formData.append("descripcion", descripcion);
      formData.append("peso", peso);
      formData.append("alto", alto);
      formData.append("ancho", ancho);
      formData.append("profundidad", profundidad);
      formData.append("categorias_id", categoriasId);

      formData.append("imagen", {
        uri: imageUri,
        name: "producto.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(
        `${API_BASE_URL}/api/products/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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
        return;
      }

      Alert.alert("Éxito", "Producto creado");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo crear el producto");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = await handleGetCategories();
      if (isMounted) {
        setCategorias(data);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeStyle}>
      <KeyboardAvoidingView
        style={styles.safeStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <View style={styles.background}>
            <View style={styles.contenedorVolver}>
              <TouchableOpacity
                style={styles.botonRegresar}
                onPress={() => navigation.goBack()}
              >
                <Feather
                  name="arrow-left"
                  style={styles.flechaRegresar}
                  color={"white"}
                  size={28}
                />
                <Text style={styles.textoRegresar}>Volver</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={pickImage}>
              <Text>Elegir imagen</Text>
            </TouchableOpacity>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagen} />
            ) : (
              <>
                <View style={styles.imagen}>
                  <EvilIcons
                    name="image"
                    color={"black"}
                    style={styles.iconoGaleria}
                    size={200}
                  />
                </View>
              </>
            )}

            <View style={styles.contenedorTextInputs}>
              <View style={styles.perimetroInputs}>
                <TextInput
                  placeholder="*Nombre e.g., Bujia"
                  value={nombre}
                  style={styles.inputs}
                  onChangeText={setNombre}
                />
              </View>
              <View style={styles.perimetroInputs}>
                <TextInput
                  placeholder="*Precio e.g., 150.0"
                  value={precio}
                  style={styles.inputs}
                  onChangeText={setPrecio}
                />
              </View>
            </View>

            <View style={styles.contenedorTextInputs}>
              <View style={styles.perimetroInputs}>
                <TextInput
                  placeholder="*Sku e.g., 1530636"
                  value={sku}
                  style={styles.inputs}
                  onChangeText={setSku}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.perimetroInputs}>
                <TextInput
                  placeholder="*Color e.g., Azul"
                  value={color}
                  style={styles.inputs}
                  onChangeText={setColor}
                />
              </View>
            </View>

            <View style={styles.contenedorTextInputs}>
              <View style={styles.perimetroInputs}>
                <TextInput
                  placeholder="*Marca e.g., Nike"
                  value={marca}
                  style={styles.inputs}
                  onChangeText={setMarca}
                />
              </View>
              <View style={styles.perimetroInputs}>
                <TextInput
                  placeholder="*Peso en kg e.g., 1.4"
                  value={peso}
                  style={styles.inputs}
                  onChangeText={setPeso}
                />
              </View>
            </View>

            <View style={styles.contenedorTextInputs}>
              <View style={styles.perimetroInputs}>
                <TextInput
                  placeholder="*Alto en cm e.g., 10.3"
                  value={alto}
                  style={styles.inputs}
                  onChangeText={setAlto}
                />
              </View>
              <View style={styles.perimetroInputs}>
                <TextInput
                  placeholder="*Ancho en cm e.g., 10.2"
                  value={ancho}
                  style={styles.inputs}
                  onChangeText={setAncho}
                />
              </View>
            </View>

            <View style={styles.perimetroInputDescripcion}>
              <TextInput
                placeholder="*Profundidad en cm e.g., 10.2"
                value={profundidad}
                style={styles.inputDescripcion}
                onChangeText={setProfundidad}
              />
            </View>

            <View style={styles.perimetroInputDescripcion}>
              <TextInput
                placeholder="Descripcion en cm e.g., 10.2"
                value={descripcion}
                style={styles.inputDescripcion}
                onChangeText={setDescripcion}
              />
            </View>

            <Dropdown
              ref={dropdownRef}
              dropdownPosition="top"
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={categorias}
              maxHeight={300}
              labelField="nombre"
              valueField="id"
              placeholder={!isFocus ? "*Selecciona categoría" : "..."}
              value={categoriasId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setCategoriasId(item.id);
                setIsFocus(false);
              }}
            />

            <TouchableOpacity
              style={styles.botonGuardar}
              onPress={handleAddProduct}
            >
              <Text style={styles.textoGuardar}>Guardar producto</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProductScreen;
