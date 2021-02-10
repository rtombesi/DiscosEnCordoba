import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import { useFocusEffect } from "@react-navigation/native";
import { Rating } from "react-native-elements";
import ListReviewsCds from "../../components/Cds/ListReviewsCds";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Cd(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [cd, setCd] = useState(null);
  const [rating, setRating] = useState(0);

  navigation.setOptions({ title: name });

  useFocusEffect(
    useCallback(() => {
      db.collection("cds")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setCd(data);
          setRating(data.rating);
        });
    }, [])
  );

  if (!cd) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView style={styles.viewBody}>
      <Carousel arrayImages={cd.images} height={250} width={screenWidth} />
      <TitleCd
        name={cd.name}
        author={cd.author}
        description={cd.description}
        rating={rating}
      />
      <ListReviewsCds navigation={navigation} idCd={cd.id} />
    </ScrollView>
  );
}

function TitleCd(props) {
  const { name, author, description, rating } = props;

  return (
    <View style={styles.viewViniloTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameCd}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.authorCd}>{author}</Text>
      <Text style={styles.descriptionCd}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewViniloTitle: {
    padding: 15,
  },
  nameCd: {
    fontSize: 25,
    fontWeight: "bold",
  },
  authorCd: {
    fontSize: 20,
    fontWeight: "normal",
  },
  descriptionCd: {
    marginTop: 5,
    color: "grey",
    fontSize: 15,
  },
  rating: {
    position: "absolute",
    right: 0,
  },
});
