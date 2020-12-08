import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListVinilos(props) {
  const { vinilos, handleLoadMore, isLoading } = props;
  const navigation = useNavigation();
  return (
    <View>
      {size(vinilos) > 0 ? (
        <FlatList
          data={vinilos}
          renderItem={(vinilo) => (
            <Vinilo vinilo={vinilo} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderVinilos}>
          <ActivityIndicator size="large" />
          <Text>Cargando Vinilo</Text>
        </View>
      )}
    </View>
  );
}

function Vinilo(props) {
  const { vinilo, navigation } = props;
  const { id, images, name, author, description } = vinilo.item;
  const imageVinilo = images[0];

  const goVinilo = () => {
    navigation.navigate("vinilo", {
      id,
      name,
    });
  };

  return (
    <TouchableOpacity onPress={goVinilo}>
      <View style={styles.viewVinilo}>
        <View style={styles.viewViniloImage}>
          <Image
            resizeMode="cover"
            placeholderContent={<ActivityIndicator color="fff" />}
            source={
              imageVinilo
                ? { uri: imageVinilo }
                : require("../../../assets/img/no-image.png")
            }
            style={styles.imageVinilo}
          />
        </View>
        <View>
          <Text style={styles.viniloName}>{name}</Text>
          <Text style={styles.viniloAuthor}>{author}</Text>
          <Text style={styles.viniloDescription}>
            {description.substr(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderVinilos}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundVinilos}>
        <Text>No hay mas vinilos por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderVinilos: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewVinilo: {
    flexDirection: "row",
    margin: 10,
  },
  viewViniloImage: {
    marginRight: 15,
  },
  imageVinilo: {
    width: 130,
    height: 130,
  },
  viniloName: {
    fontWeight: "bold",
  },
  viniloAuthor: {
    paddingTop: 2,
    color: "grey",
  },
  viniloDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundVinilos: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
