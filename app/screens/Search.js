import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";
import { assert } from "firesql/utils";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [vinilos, setVinilos] = useState([]);

  useEffect(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM vinilos WHERE name LIKE '${search}%'`)
        .then((response) => {
          setVinilos(response);
        });
    }
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Busca por nombre del Vinilo o Cd..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputContainerSearch}
      />
      {vinilos.length === 0 ? (
        <NoFoundVinilos />
      ) : (
        <FlatList
          data={vinilos}
          renderItem={(vinilo) => (
            <Vinilos vinilo={vinilo} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NoFoundVinilos() {
  return (
    <View style={styles.notFoundVinilos}>
      <Image
        source={require("../../assets/img/no-result.png")}
        resizeMode="contain"
        style={{ width: 300, height: 200 }}
      />
    </View>
  );
}

function Vinilos(props) {
  const { vinilo, navigation } = props;
  const { id, name, images } = vinilo.item;

  return (
    <ListItem
      title={name}
      leftAvatar={{
        source: images[0]
          ? { uri: images[0] }
          : require("../../assets/img/no-image.png"),
      }}
      rightIcon={
        <Icon
          type="material-community"
          name="chevron-right"
          color="#ea4d14fa"
        />
      }
      onPress={() =>
        navigation.navigate("vinilos", {
          screen: "vinilo",
          params: { id, name },
        })
      }
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 25,
    backgroundColor: "#ea4d14fa",
  },
  inputContainerSearch: {
    backgroundColor: "white",
  },
  notFoundVinilos: {
    flex: 1,
    alignItems: "center",
  },
});
