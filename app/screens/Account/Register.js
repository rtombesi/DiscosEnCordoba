import React, { useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/account/RegisterForm";

export default function Register() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/LogoDiscosEnCbaPNG.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewFormul}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 30,
  },
  viewFormul: {
    marginRight: 40,
    marginLeft: 40,
  },
});
