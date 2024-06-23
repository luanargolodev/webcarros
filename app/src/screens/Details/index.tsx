import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  FlatList,
  ScrollView,
  Modal,
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
import { Label } from "../../components/Label";
import * as Linking from "expo-linking";
import { Modal as ModalBanner } from "../../components/Modal";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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

  async function handleCallPhone() {
    await Linking.openURL(`tel:${car?.whatsapp}`);
  }

  function openImage(imageUrl: string) {
    setModalVisible(true);
    setSelectedImage(imageUrl);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedImage("");
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
              handleOpenImage={(imageUrl) => openImage(imageUrl)}
            />
          )}

          <View style={styles.header}>
            <Pressable style={styles.saveContent}>
              <Feather size={22} color="#FFF" name="bookmark" />
            </Pressable>
            <Text style={styles.title}>{car?.name}</Text>
            <Text>{car?.model}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.price}>R$ {car?.price}</Text>

            <View style={styles.labels}>
              <Label label="Cidade" name={car?.city} />
              <Label label="Ano" name={car?.year} />
            </View>

            <View style={styles.labels}>
              <Label label="Km" name={car?.km} />
              <Label label="Telefone" name={car?.whatsapp} />
            </View>

            <Text style={styles.description}>Descrição completa:</Text>
            <View style={styles.descriptionArea}>
              <Text>{car?.description}</Text>
            </View>

            <Pressable style={styles.callButton} onPress={handleCallPhone}>
              <Text style={styles.callText}>Conversar com vendedor</Text>
            </Pressable>
          </View>

          <Modal visible={modalVisible} transparent>
            <ModalBanner
              closeModal={handleCloseModal}
              imageUrl={selectedImage}
            />
          </Modal>
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
  header: {
    backgroundColor: "#FFF",
    position: "relative",
    width: "90%",
    borderRadius: 8,
    gap: 4,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 8,
    paddingRight: 8,
    top: -34,
    zIndex: 999,
  },
  saveContent: {
    backgroundColor: "#EF4444",
    position: "absolute",
    zIndex: 99,
    padding: 12,
    borderRadius: 99,
    right: 8,
    top: -24,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  content: {
    alignSelf: "flex-start",
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: -14,
    width: "100%",
  },
  price: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  labels: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 24,
    marginTop: 14,
  },
  description: {
    fontSize: 18,
    marginTop: 14,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#444",
  },
  descriptionArea: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 4,
  },
  callButton: {
    width: "100%",
    padding: 8,
    backgroundColor: "#08c168",
    marginTop: 14,
    marginBottom: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  callText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
