import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { db } from "../../services/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { CarProps } from "../../types/cars.type";
import { CarList } from "../../components/CarList";

export function Home() {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCars() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));

    getDocs(queryRef).then((snapshot) => {
      let listCars = [] as CarProps[];

      snapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          city: doc.data().city,
          km: doc.data().km,
          price: doc.data().price,
          uid: doc.data().uid,
          images: doc.data().images,
        });
      });

      setCars(listCars);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadCars();
  }, []);

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

        {loading && (
          <ActivityIndicator
            style={{ marginTop: 14 }}
            size="large"
            color="#000"
          />
        )}

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarList
              data={item}
              widthScreen={cars.length <= 1 ? "100%" : "49%"}
            />
          )}
          style={styles.list}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 14 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
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
  },
  list: {
    flex: 1,
    marginTop: 4,
    paddingTop: 14,
  },
});
