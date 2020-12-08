import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Vinilos from "../screens/Vinilos/Vinilos";
import AddVinilos from "../screens/Vinilos/AddVinilos";
import Vinilo from "../screens/Vinilos/Vinilo";
import AddReviewVinilo from "../screens/Vinilos/AddReviewVinilo";

const Stack = createStackNavigator();

export default function VinilosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="vinilos"
        component={Vinilos}
        options={{ title: "Vinilos" }}
      />
      <Stack.Screen
        name="add-vinilo"
        component={AddVinilos}
        options={{ title: "Agregar nuevo vinilo" }}
      />
      <Stack.Screen name="vinilo" component={Vinilo} />
      <Stack.Screen
        name="add-review-vinilo"
        component={AddReviewVinilo}
        options={{ title: "Agrega tu comentario" }}
      />
    </Stack.Navigator>
  );
}
