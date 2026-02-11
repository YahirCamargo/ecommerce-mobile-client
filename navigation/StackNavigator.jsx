import React, { useState, useEffect } from "react"; // No olvides importar hooks
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

// Pantallas
import LoginScreen from "../src/LoginScreen";
import SignUpScreen from "../src/SignUpScreen";
import HomeScreen from "../src/HomeScreen";
import MainTabNavigator from "./MainTabNavigator";
import AddProductScreen from "../src/AddProductScreen";
import AddAddressScreen from "../src/AddAddressScreen";
import AddressesScreen from "../src/AddressesScreen";
import EditAddressScreen from "../src/EditAddressScreen";
import CheckOutScreen from "../src/CheckOutScreen";
import OrdersScreen from "../src/OrdersScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (token) {
          setSession(token);
        }
      } catch (error) {
        console.error("Error cargando el token", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <Stack.Group>
            <Stack.Screen name="Main">
              {(props) => (
                <MainTabNavigator {...props} setSession={setSession} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AddAddressScreen">
              {(props) => (
                <AddAddressScreen {...props} setSession={setSession} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AddProductScreen">
              {(props) => (
                <AddProductScreen {...props} setSession={setSession} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AddressesScreen">
              {(props) => (
                <AddressesScreen {...props} setSession={setSession} />
              )}
            </Stack.Screen>
            <Stack.Screen name="EditAddressScreen">
              {(props) => (
                <EditAddressScreen {...props} setSession={setSession} />
              )}
            </Stack.Screen>
            <Stack.Screen name="CheckOutScreen">
              {(props) => (
                <CheckOutScreen {...props} setSession={setSession} />
              )}
            </Stack.Screen>
            <Stack.Screen name="OrdersScreen">
              {(props) => (
                <OrdersScreen {...props} setSession={setSession} />
              )}
            </Stack.Screen>
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="LoginScreen">
              {(props) => <LoginScreen {...props} setSession={setSession} />}
            </Stack.Screen>
            <Stack.Screen name="SignUpScreen">
              {(props) => <SignUpScreen {...props} setSession={setSession} />}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
