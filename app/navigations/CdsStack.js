import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cds from "../screens/Cds";

const Stack = createStackNavigator();

export default function CdsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cds"
        component={Cds}
        options={{ title: "Compactos Cds" }}
      />
    </Stack.Navigator>
  );
}
