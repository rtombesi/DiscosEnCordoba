import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, toastRef, setReloadUserInfo } = props;
  const [newDisplayName, setnewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre no puede estar vacío");
    } else if (displayName === newDisplayName) {
      setError("El nombre no puede ser igual al actual");
    } else {
      setisLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setisLoading(false);
          setReloadUserInfo(true);
          setShowModal(false);
        })
        .catch(() => {
          setError("Error en actualizar nombre");
          setisLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y Apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        defaultValue={displayName || ""}
        onChange={(e) => setnewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Modificar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

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
