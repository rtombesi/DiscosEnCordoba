import React, { useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/account/LoginForm";
import LoginFacebook from "../../components/account/LoginFacebook";

export default function Login() {
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/LogoDiscosEnCbaPNG.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();

  return (
    <Text style={styles.textRegister}>
      ¿Te gustaría crear una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Registrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#ea4d14fa",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#ea4d14fa",
    margin: 40,
  },
});
