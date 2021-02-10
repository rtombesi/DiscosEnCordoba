import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cds from "../screens/Cds/Cds";
import AddCds from "../screens/Cds/AddCds";
import Cd from "../screens/Cds/Cd";
import AddReviewCd from "../screens/Cds/AddReviewCd";

const Stack = createStackNavigator();

export default function CdsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cds"
        component={Cds}
        options={{ title: "Compactos Cds" }}
      />
      <Stack.Screen
        name="add-cd"
        component={AddCds}
        options={{ title: "Agregar nuevo Cd" }}
      />
      <Stack.Screen name="cd" component={Cd} />
      <Stack.Screen
        name="add-review-cd"
        component={AddReviewCd}
        options={{ title: "Agrega tu comentario" }}
      />
    </Stack.Navigator>
  );
}
