import {
  View,
  Text,
  StyleSheet,
  Pressable,
  DimensionValue,
  Image,
} from "react-native";
import { CarProps } from "../../types/cars.type";

interface Props {
  data: CarProps;
  widthScreen: DimensionValue;
}

export function CarList({ data, widthScreen }: Props) {
  return (
    <Pressable style={[styles.container, { width: widthScreen }]}>
      <Image style={styles.cover} source={{ uri: data.images[0].url }} />
      <Text style={[styles.title, { marginTop: 14 }]}>{data.name}</Text>
      <Text style={styles.text}>
        {data.year} - {data.km} km
      </Text>
      <Text style={styles.title}>R$ {data.price}</Text>

      <View style={styles.divisor}></View>
      <Text style={[styles.text, { marginTop: 4 }]}>{data.city}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 4,
    borderRadius: 4,
    marginBottom: 14,
  },
  cover: {
    width: "100%",
    height: 140,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
    fontSize: 12,
  },
  divisor: {
    width: "100%",
    height: 1,
    backgroundColor: "#D9D9D9",
  },
});
