import { StyleSheet, SafeAreaView, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes";

export function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  function handleNavigateFavorites() {
    navigation.navigate("Favorites");
  }

  return (
    <SafeAreaView style={styles.container}>  
      <Image
        source={require("../../assets/logo.png")}
      />
      
      <Pressable style={styles.button} onPress={handleNavigateFavorites}>
        <Feather name="bookmark" size={24} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F5F8",
    flexDirection: "row",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 14,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#1F1F1F",
    width: 42,
    height: 42,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  }
})