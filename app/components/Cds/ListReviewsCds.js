import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { map } from "lodash";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListReviewsCds(props) {
  const { navigation, idCd } = props;
  const [userLogged, setUserLogged] = useState(false);
  const [reviews, setReviews] = useState([]);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("reviewscds")
        .where("idCd", "==", idCd)
        .get()
        .then((response) => {
          const resultReview = [];
          response.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            resultReview.push(data);
          });
          const orderResultReview = resultReview.sort((a, b) => {
            a = new Date(a.createAt.seconds * 1000);
            b = new Date(b.createAt.seconds * 1000);
            return a > b ? -1 : a < b ? 1 : 0;
          });
          setReviews(orderResultReview);
        });
    }, [])
  );

  return (
    <View>
      {userLogged ? (
        <Button
          title="Escribe tu comentario"
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnTitleAddReview}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#ea4d14fa",
          }}
          onPress={() =>
            navigation.navigate("add-review-cd", {
              idCd: idCd,
            })
          }
        />
      ) : (
        <View>
          <Text
            style={{ textAlign: "center", color: "#ea4d14fa", padding: 20 }}
            onPress={() => navigation.navigate("login")}
          >
            Para escribir un comentario es necesario estar logueado{" "}
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              pulse AQUÍ para iniciar sesión
            </Text>
          </Text>
        </View>
      )}
      {map(reviews, (review, index) => (
        <Review key={index} review={review} />
      ))}
    </View>
  );
}

function Review(props) {
  const { title, review, rating, avatarUser, createAt } = props.review;
  const createReview = new Date(createAt.seconds * 1000);

  return (
    <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.viewAvatarUser}
          source={
            avatarUser
              ? { uri: avatarUser }
              : require("../../../assets/img/avatar-default.jpg")
          }
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewText}>{review}</Text>
        <Rating imageSize={15} readonly startingValue={rating} />
        <Text style={styles.reviewDate}>
          {createReview.getDate()}/{createReview.getMonth() + 1}/
          {createReview.getFullYear()} - {createReview.getHours()}:
          {createReview.getMinutes() < 10 ? "0" : ""}
          {createReview.getMinutes()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    marginTop: 5,
    backgroundColor: "transparent",
  },
  btnTitleAddReview: {
    color: "#ea4d14fa",
    fontSize: 17,
  },
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  viewImageAvatar: {
    marginRight: 14,
  },
  viewAvatarUser: {
    height: 45,
    width: 45,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontWeight: "bold",
  },
  reviewText: {
    color: "grey",
    paddingTop: 2,
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 13,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
