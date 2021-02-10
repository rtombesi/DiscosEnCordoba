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

export default function ListCds(props) {
  const { cds, handleLoadMore, isLoading } = props;
  const navigation = useNavigation();
  return (
    <View>
      {size(cds) > 0 ? (
        <FlatList
          data={cds}
          renderItem={(cd) => <Cd cd={cd} navigation={navigation} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderCds}>
          <ActivityIndicator size="large" />
          <Text>Cargando Cd</Text>
        </View>
      )}
    </View>
  );
}

function Cd(props) {
  const { cd, navigation } = props;
  const { id, images, name, author, description } = cd.item;
  const imageCd = images[0];

  const goCd = () => {
    navigation.navigate("cd", {
      id,
      name,
    });
  };

  return (
    <TouchableOpacity onPress={goCd}>
      <View style={styles.viewCd}>
        <View style={styles.viewCdImage}>
          <Image
            resizeMode="cover"
            placeholderContent={<ActivityIndicator color="fff" />}
            source={
              imageCd
                ? { uri: imageCd }
                : require("../../../assets/img/no-image.png")
            }
            style={styles.imageCd}
          />
        </View>
        <View>
          <Text style={styles.cdName}>{name}</Text>
          <Text style={styles.cdAuthor}>{author}</Text>
          <Text style={styles.cdDescription}>
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
      <View style={styles.loaderCds}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundCds}>
        <Text>No hay mas Cds por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderCds: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewCd: {
    flexDirection: "row",
    margin: 10,
  },
  viewCdImage: {
    marginRight: 15,
  },
  imageCd: {
    width: 130,
    height: 130,
  },
  cdName: {
    fontWeight: "bold",
  },
  cdAuthor: {
    paddingTop: 2,
    color: "grey",
  },
  cdDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundCds: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
