import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function AddReviewVinilo(props) {
  const { navigation, route } = props;
  const { idVinilo } = route.params;
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  const addReview = () => {
    if (!rating) {
      toastRef.current.show("Por favor dar una puntuacion");
    } else if (!title) {
      toastRef.current.show("Por favor indica el Titulo del Vinilo");
    } else if (!review) {
      toastRef.current.show("Por favor indica un comentario");
    } else {
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const payload = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idVinilo: idVinilo,
        title: title,
        review: review,
        rating: rating,
        createAt: new Date(),
      };
      db.collection("reviews")
        .add(payload)
        .then(() => {
          updateVinilo();
        })
        .catch(() => {
          toastRef.current.show("Ocurrió un error al enviar los datos");
          setIsLoading(false);
        });
    }
  };

  const updateVinilo = () => {
    const viniloRef = db.collection("vinilos").doc(idVinilo);

    viniloRef.get().then((response) => {
      const viniloData = response.data();
      const ratingTotal = viniloData.ratingTotal + rating;
      const quantityVoting = viniloData.quantityVoting + 1;
      const ratingResult = ratingTotal / quantityVoting;

      viniloRef
        .update({
          rating: ratingResult,
          ratingTotal,
          quantityVoting,
        })
        .then(() => {
          setIsLoading(false);
          navigation.goBack();
        });
    });
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={[
            "No me Gusta",
            "Algo me gusta",
            "Zafa",
            "Está muy Bueno",
            "Excelente",
          ]}
          defaultRating={0}
          size={25}
          onFinishRating={(value) => {
            setRating(value);
          }}
        />
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.formReview}>
          <Input
            placeholder="Titulo del Comentario"
            containerStyle={styles.input}
            onChange={(e) => setTitle(e.nativeEvent.text)}
          />
          <Input
            placeholder="Comentarios..."
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChange={(e) => setReview(e.nativeEvent.text)}
          />
          <Button
            title="Enviar Comentario"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={addReview}
          />
        </View>
      </KeyboardAwareScrollView>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Enviando Comentario" />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2",
  },
  formReview: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
  },
  btn: {
    backgroundColor: "#ea4d14fa",
  },
});
