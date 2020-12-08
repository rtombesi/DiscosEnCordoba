import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserLogged from "./UserLogged";
import UserGuest from "./UserGuest";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) return <Loading isVisible={true} text="Cargando..." />;

  return login ? <UserLogged /> : <UserGuest />;
}
