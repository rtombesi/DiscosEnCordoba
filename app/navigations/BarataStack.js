import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Baratas from "../screens/Baratas/Baratas";

const Stack = createStackNavigator();

export default function BarataStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="baratas"
        component={Baratas}
        options={{ title: "Ofertas de Vinilos y Cds" }}
      />
    </Stack.Navigator>
  );
}
