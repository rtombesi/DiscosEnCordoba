import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import Loading from "../Loading";
import { validarEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [showRepeatPassword, setshowRepeatPassword] = useState(false);
  const [formData, setformData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validarEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas deben ser iguales");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "La constraseña debe tener 6 caracteres como mínimo"
      );
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show(
            "El email se encuentra en uso, intente con otro"
          );
        });
    }
  };

  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electronico"
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
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputFormul}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Sumate"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  inputFormul: {
    width: "100%",
    marginTop: 10,
  },
  btnContainerRegister: {
    marginTop: 5,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#ea4d14fa",
  },
  iconRight: {
    color: "#908784fa",
  },
});
