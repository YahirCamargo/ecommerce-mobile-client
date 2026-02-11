import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useCartStore } from "../store/cartStore";


const Tab = createBottomTabNavigator();

import HomeScreen from "../src/HomeScreen";
import CartScreen from "../src/CartScreen";
import UserScreen from "../src/UserScreen";

export default function MainTabNavigator({ setSession }) {
  const cartCount = useCartStore((s) => s.getItemCount());

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      >
        {(props) => <HomeScreen {...props} setSession={setSession} />}
      </Tab.Screen>

      <Tab.Screen
        name="CartScreen"
        options={{
          unmountOnBlur: false,
          lazy: false,
          tabBarLabel: "Carrito",
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" color={color} size={size} />
          ),
        }}
      >
        {(props) => <CartScreen {...props} setSession={setSession} />}
      </Tab.Screen>

      <Tab.Screen
        name="UserScreen"
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      >
        {(props) => <UserScreen {...props} setSession={setSession} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
