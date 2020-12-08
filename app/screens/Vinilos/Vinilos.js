import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListVinilos from "../../components/Vinilos/ListVinilos";

const db = firebase.firestore(firebaseApp);
const db1 = firebase.firestore(firebaseApp);

export default function Vinilos(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [vinilos, setVinilos] = useState([]);
  const [totalVinilos, settotalVinilos] = useState(0);
  const [startVinilos, setStartVinilos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitVinilos = 10;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((useInfo) => {
      const useradmin = [];
      db1
        .collection("useradmin")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const usradmin = doc.data();
            useradmin.push(usradmin);
          });
          useradmin.forEach((element) => {
            if (element.useruid == useInfo.uid) {
              setUser(useInfo);
            } else {
              setUser(null);
            }
          });
        });
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      db.collection("vinilos")
        .get()
        .then((snap) => {
          settotalVinilos(snap.size);
        });
      const resultVinilos = [];

      db.collection("vinilos")
        .orderBy("createAt", "desc")
        .limit(limitVinilos)
        .get()
        .then((response) => {
          setStartVinilos(response.docs[response.docs.length - 1]);

          response.forEach((doc) => {
            const vinilo = doc.data();
            vinilo.id = doc.id;
            resultVinilos.push(vinilo);
          });
          setVinilos(resultVinilos);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultVinilos = [];
    vinilos.length < totalVinilos && setIsLoading(true);

    db.collection("vinilos")
      .orderBy("createAt", "desc")
      .startAfter(startVinilos.data().createAt)
      .limit(limitVinilos)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartVinilos(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const vinilo = doc.data();
          vinilo.id = doc.id;
          resultVinilos.push(vinilo);
        });

        setVinilos([...vinilos, ...resultVinilos]);
      });
  };

  return (
    <View style={styles.viewBody}>
      <ListVinilos
        vinilos={vinilos}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />

      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#ea4d14fa"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-vinilo")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
  },
});
