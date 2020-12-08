import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { validarEmail } from "../../utils/validations";
import Loading from "../Loading";

export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validarEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else {
      setloading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setloading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setloading(false);
          toastRef.current.show("Email o password incorrecto");
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputFormul}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="email"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputFormul}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando sesiòn" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputFormul: {
    width: "100%",
    marginTop: 10,
  },
  btnContainerLogin: {
    marginTop: 15,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#ea4d14fa",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
