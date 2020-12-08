import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import * as firebase from "firebase";
import { validarEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailForm(props) {
  const { email, setShowModal, toastRef, setReloadUserInfo } = props;
  const [formData, setFormData] = useState(defaultValue());
  const [showPassword, setshowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    setErrors({});
    if (!formData.email || email === formData.email) {
      setErrors({
        email: "El email no ha cambiado",
      });
    } else if (!validarEmail(formData.email)) {
      setErrors({
        email: "El email es incorrecto",
      });
    } else if (!formData.password) {
      setErrors({
        password: "La contraseña no puede ser vacía",
      });
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(formData.email)
            .then(() => {
              setIsLoading(false);
              setReloadUserInfo(true);
              toastRef.current.show("Email actualizado correctamente");
              setShowModal(false);
            })
            .catch(() => {
              setErrors({ email: "Error al actualizar email" });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setIsLoading(false);
          setErrors({ password: "La contraseña es incorrecta" });
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        defaultValue={email || ""}
        rightIcon={{
          type: "material-community",
          name: "email",
          color: "#c2c2c2",
        }}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setshowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Button
        title={"Cambiar Email"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const defaultValue = () => {
  return {
    email: "",
    password: "",
  };
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#ea4d14fa",
    borderRadius: 5,
  },
});
