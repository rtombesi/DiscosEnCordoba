import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListCds from "../../components/Cds/ListCds";

const db = firebase.firestore(firebaseApp);
const db1 = firebase.firestore(firebaseApp);

export default function Cds(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [cds, setCds] = useState([]);
  const [totalCds, settotalCds] = useState(0);
  const [startCds, setStartCds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitCds = 10;

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
      db.collection("cds")
        .get()
        .then((snap) => {
          settotalCds(snap.size);
        });
      const resultCds = [];

      db.collection("cds")
        .orderBy("createAt", "desc")
        .limit(limitCds)
        .get()
        .then((response) => {
          setStartCds(response.docs[response.docs.length - 1]);

          response.forEach((doc) => {
            const cd = doc.data();
            cd.id = doc.id;
            resultCds.push(cd);
          });
          setCds(resultCds);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultCds = [];
    cds.length < totalCds && setIsLoading(true);

    db.collection("cds")
      .orderBy("createAt", "desc")
      .startAfter(startCds.data().createAt)
      .limit(limitCds)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartCds(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const cd = doc.data();
          cd.id = doc.id;
          resultCds.push(cd);
        });

        setCds([...cds, ...resultCds]);
      });
  };

  return (
    <View style={styles.viewBody}>
      <ListCds
        cds={cds}
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
          onPress={() => navigation.navigate("add-cd")}
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
