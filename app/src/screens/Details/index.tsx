import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../routes";
import { CarDetailsProps } from "../../types/cars.type";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { BannerList } from "../../components/BannerList";
import { BannerLoading } from "../../components/Banner";

type RouteDetailParams = {
  detail: {
    id: string;
  };
};

type DetailRouteProps = RouteProp<RouteDetailParams, "detail">;

export function Details() {
  const route = useRoute<DetailRouteProps>();
  const [car, setCar] = useState<CarDetailsProps>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  useEffect(() => {
    async function loadCar() {
      if (!route.params.id) return;

      const docRef = doc(db, "cars", route.params.id);
      getDoc(docRef)
        .then((snapshot) => {
          if (!snapshot.data()) {
            navigation.goBack();
            return;
          }

          setCar({
            id: snapshot.id,
            name: snapshot.data()?.name,
            year: snapshot.data()?.year,
            city: snapshot.data()?.city,
            model: snapshot.data()?.model,
            uid: snapshot.data()?.uid,
            created: snapshot.data()?.created,
            description: snapshot.data()?.description,
            km: snapshot.data()?.km,
            owner: snapshot.data()?.owner,
            price: snapshot.data()?.price,
            whatsapp: snapshot.data()?.whatsapp,
            images: snapshot.data()?.images,
          });
        })
        .finally(() => setLoading(false));
    }

    loadCar();
  }, [route.params.id]);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View style={styles.container}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={36} color="#000" />
          </Pressable>

          {loading && <BannerLoading />}

          {!loading && car?.images && (
            <BannerList
              images={car.images}
              handleOpenImage={(imageUrl) => {}}
            />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5F8",
    alignItems: "center",
    paddingBottom: 16,
  },
  backButton: {
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 24,
    top: 44,
    zIndex: 99,
  },
});
