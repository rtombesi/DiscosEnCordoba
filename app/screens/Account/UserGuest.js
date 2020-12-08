import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/LogoDiscosEnCbaPNG.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Descubrí tu perfil en Discos-Cba</Text>
      <Text style={styles.comentario}>
        ¿ Cómo calificarías tu mejor Vinilo o Compacto? Busca y visualiza los
        mejores Discos y CDs de una manera sencilla, vota cual te ha gustado más
        y comenta como fué tu experiencia
      </Text>
      <View style={styles.viewButton}>
        <Button
          title="Accedé a tu perfil"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  comentario: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#ea4d14fa",
  },
  buttonContainer: {
    width: "65%",
  },
});
