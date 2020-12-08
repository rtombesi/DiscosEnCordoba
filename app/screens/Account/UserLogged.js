import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import InfoUser from "../../components/account/InfoUser";
import AccountOptions from "../../components/account/AccountOptions";

export default function UserLogged() {
  const [userInfo, setuserInfo] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadingText, setloadingText] = useState("");
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setuserInfo(user);
    })();
    setReloadUserInfo(false);
  }, [reloadUserInfo]);

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUser
          userInfo={userInfo}
          toastRef={toastRef}
          setloading={setloading}
          setloadingText={setloadingText}
        />
      )}

      <AccountOptions
        userInfo={userInfo}
        toastRef={toastRef}
        setReloadUserInfo={setReloadUserInfo}
      />

      <Button
        title="Cerrar Sesión"
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.btnCloseSesionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading Text={loadingText} isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSesion: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ea4d14fa",
    margin: 2,
    paddingTop: 20,
    paddingBottom: 20,
  },
  btnCloseSesionText: {
    color: "#ea4d14fa",
  },
});
