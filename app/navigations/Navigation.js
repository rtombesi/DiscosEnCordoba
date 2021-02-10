import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import VinilosStack from "./VinilosStack";
import CdsStack from "./CdsStack";
import BarataStack from "./BarataStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="vinilos"
        tabBarOptions={{
          activeBackgroundColor: "#ea4d14fa",
          inactiveTintColor: "#ea4d14fa",
          inactiveBackgroundColor: "#908784fa",
          activeTintColor: "#908784fa",
          style: { height: 70 },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="vinilos"
          component={VinilosStack}
          options={{ title: "Vinilos" }}
        />
        <Tab.Screen
          name="cds"
          component={CdsStack}
          options={{ title: "Compactos" }}
        />
        <Tab.Screen
          name="barata"
          component={BarataStack}
          options={{ title: "Baratas" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "vinilos":
      iconName = "compass-outline";
      break;
    case "cds":
      iconName = "disc";
      break;
    case "barata":
      iconName = "currency-usd";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "home-outline";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={55} color={color} />
  );
}
