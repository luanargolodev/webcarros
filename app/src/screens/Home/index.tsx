import { View, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useState } from "react";

export function Home() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header />

      <View style={styles.container}>
        <View style={styles.inputArea}>
          <Input
            placeholder="Procurando algum carro?"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F5F8",
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: "center",
  },
  inputArea: {
    width: "100%",
    marginTop: 14,
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  }
})