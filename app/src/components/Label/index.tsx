import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

interface Props {
  label: string;
  name?: string;
}

export function Label({ label, name }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "#444444",
  },
  name: {
    color: "#000",
    fontWeight: "500",
  },
});
