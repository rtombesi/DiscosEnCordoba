import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import { useFocusEffect } from "@react-navigation/native";
import { Rating } from "react-native-elements";
import ListReviews from "../../components/Vinilos/ListReviews";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Vinilo(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [vinilo, setVinilo] = useState(null);
  const [rating, setRating] = useState(0);

  navigation.setOptions({ title: name });

  useFocusEffect(
    useCallback(() => {
      db.collection("vinilos")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setVinilo(data);
          setRating(data.rating);
        });
    }, [])
  );

  if (!vinilo) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView style={styles.viewBody}>
      <Carousel arrayImages={vinilo.images} height={250} width={screenWidth} />
      <TitleVinilo
        name={vinilo.name}
        author={vinilo.author}
        description={vinilo.description}
        rating={rating}
      />
      <ListReviews navigation={navigation} idVinilo={vinilo.id} />
    </ScrollView>
  );
}

function TitleVinilo(props) {
  const { name, author, description, rating } = props;

  return (
    <View style={styles.viewViniloTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameVinilo}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.authorVinilo}>{author}</Text>
      <Text style={styles.descriptionVinilo}>{description}</Text>
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
  nameVinilo: {
    fontSize: 25,
    fontWeight: "bold",
  },
  authorVinilo: {
    fontSize: 20,
    fontWeight: "normal",
  },
  descriptionVinilo: {
    marginTop: 5,
    color: "grey",
    fontSize: 15,
  },
  rating: {
    position: "absolute",
    right: 0,
  },
});
