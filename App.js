import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


function ProductList({ route }) {
  const { title = "Products", products = [] } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  function onAddToCart(product) {
    setSelected(product);
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <ScrollView contentContainerStyle={styles.productsGrid}>
        {products.map((p, i) => (
          <View key={i} style={styles.productCard}>
            <Image source={{ uri: p.img }} style={styles.productImage} />
            <Text style={styles.productName}>{p.name}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAddToCart(p)}
            >
              <Text style={styles.addButtonText}>🛒 Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal with product + thank you */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                <Image source={{ uri: selected.img }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>Thank you!</Text>
                <Text style={styles.modalSubtitle}>
                  {selected.name} has been added to your cart.
                </Text>
              </>
            )}

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: "#4caf50" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


function HomeScreen({ navigation }) {
  const categories = [
    {
      name: "Winter",
      img:
        "https://saraclothes.com/cdn/shop/products/blk20454_blue_1_4.jpg?v=1614865317",
      screen: "Winter",
    },
    {
      name: "Summer",
      img:
        "https://cdn.shopify.com/s/files/1/0347/3225/files/Mens_SummerStyle_1_600x600.jpg?v=1724679846",
      screen: "Summer",
    },
    {
      name: "Perfumes",
      img:
        "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwe29b2e98/images/Sept25/30thSept25/000000FRL005_3.JPG?sw=1000&sh=1200",
      screen: "Perfumes",
    },
    {
      name: "Sale",
      img:
        "https://cdn.vectorstock.com/i/1000v/71/50/sale-of-women-s-clothing-vector-18817150.jpg",
      screen: "Sale",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
        <Text style={styles.appTitle}>🛍️ Shopping App</Text>

        <View style={styles.grid}>
          {categories.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={styles.catCard}
              onPress={() => navigation.navigate(c.screen)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: c.img }} style={styles.catImage} />
              <Text style={styles.catTitle}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -----------------------
   Category Screens
------------------------ */
function WinterScreen({ navigation }) {
  const products = [
    {
      name: "Blue Embroidered Pret",
      img:
        "https://saraclothes.com/cdn/shop/products/blk20454_blue_1_4.jpg?v=1614865317",
    },
    {
      name: "Velvet Unstitched Fabric",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFF6BroJ3kLU8gydFdMGCEACRCmjB6FbUiaQ&s",
    },
    {
      name: "Khaddar Fancy Pret",
      img:
        "https://oaks.pk/cdn/shop/files/Women_Pret_Dyed_OW2P-2408008-1.jpg?v=1748264268",
    },
  ];

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>❄️ Winter Collection</Text>
      <View style={styles.subRow}>
        <TouchableOpacity
          style={styles.subBtn}
          onPress={() =>
            navigation.navigate("ProductList", { title: "Winter • Pret", products })
          }
        >
          <Text style={styles.subBtnText}>Pret</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subBtn}
          onPress={() =>
            navigation.navigate("ProductList", {
              title: "Winter • Unstitched",
              products: products,
            })
          }
        >
          <Text style={styles.subBtnText}>Unstitched</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SummerScreen({ navigation }) {
  const products = [
    {
      name: "Cotton Printed Pret",
      img:
        "https://cdn.shopify.com/s/files/1/0347/3225/files/Mens_SummerStyle_1_600x600.jpg?v=1724679846",
    },
    {
      name: "Lawn Unstitched Fabric",
      img:
        "https://www.gulahmedshop.com/cdn/shop/files/gul-rubia-lawn-unstitched-fabric-cotton-bracken-fullshot-side1.jpg?v=1758382969",
    },
  ];

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>🌞 Summer Collection</Text>
      <View style={styles.subRow}>
        <TouchableOpacity
          style={styles.subBtn}
          onPress={() =>
            navigation.navigate("ProductList", { title: "Summer • Pret", products })
          }
        >
          <Text style={styles.subBtnText}>Pret</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.subBtn}
          onPress={() =>
            navigation.navigate("ProductList", {
              title: "Summer • Unstitched",
              products,
            })
          }
        >
          <Text style={styles.subBtnText}>Unstitched</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function PerfumesScreen({ navigation }) {
  const men = [
    {
      name: "Men's Perfume",
      img:
        "https://theperfumeclub.pk/cdn/shop/collections/WhatsApp_Image_2025-05-31_at_16.18.50_2.jpg?v=1754909028",
    },
  ];
  const women = [
    {
      name: "Women's Perfume",
      img:
        "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwe29b2e98/images/Sept25/30thSept25/000000FRL005_3.JPG?sw=1000&sh=1200",
    },
  ];

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>🌸 Perfumes</Text>
      <View style={styles.subRow}>
        <TouchableOpacity
          style={styles.subBtn}
          onPress={() =>
            navigation.navigate("ProductList", { title: "Perfumes • Men", products: men })
          }
        >
          <Text style={styles.subBtnText}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subBtn}
          onPress={() =>
            navigation.navigate("ProductList", { title: "Perfumes • Women", products: women })
          }
        >
          <Text style={styles.subBtnText}>Women</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SaleScreen({ navigation }) {
  const saleProducts = [
    {
      name: "Hot Sale Banner",
      img:
        "https://cdn.vectorstock.com/i/1000v/71/50/sale-of-women-s-clothing-vector-18817150.jpg",
    },
  ];

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>🔥 Sale</Text>
      <TouchableOpacity
        style={styles.saleCard}
        onPress={() =>
          navigation.navigate("ProductList", { title: "Sale Items", products: saleProducts })
        }
      >
        <Image
          source={{
            uri:
              "https://cdn.vectorstock.com/i/1000v/71/50/sale-of-women-s-clothing-vector-18817150.jpg",
          }}
          style={styles.saleImage}
        />
        <Text style={styles.saleText}>Click to view sale item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* -----------------------
   Main App Navigator
------------------------ */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: "#111" }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Winter" component={WinterScreen} />
        <Stack.Screen name="Summer" component={SummerScreen} />
        <Stack.Screen name="Perfumes" component={PerfumesScreen} />
        <Stack.Screen name="Sale" component={SaleScreen} />
        <Stack.Screen name="ProductList" component={ProductList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* -----------------------
   Styles
------------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf5", paddingTop: 16, alignItems: "center" },
  appTitle: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: "#d81b60" },
  grid: { width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  catCard: {
    width: "44%",
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 4,
    alignItems: "center",
    overflow: "hidden",
    paddingBottom: 12,
  },
  catImage: { width: "100%", height: 140 },
  catTitle: { fontSize: 16, fontWeight: "700", marginTop: 8, color: "#333" },

  sectionContainer: { flex: 1, alignItems: "center", padding: 16, backgroundColor: "#fff" },
  sectionHeader: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#d81b60" },

  subRow: { flexDirection: "row", width: "100%", justifyContent: "space-around", marginTop: 12 },
  subBtn: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  subBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  productsGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 30,
  },
  productCard: {
    width: "45%",
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    alignItems: "center",
    padding: 10,
  },
  productImage: { width: "100%", height: 180, borderRadius: 8, marginBottom: 8 },
  productName: { fontSize: 15, fontWeight: "700", color: "#333", textAlign: "center" },

  addButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "700" },

  saleCard: {
    width: "95%",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  saleImage: { width: "100%", height: 220, resizeMode: "contain" },
  saleText: { fontSize: 16, padding: 12, color: "#333", fontWeight: "700" },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  modalImage: { width: 260, height: 320, borderRadius: 8, marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: "800", marginBottom: 6 },
  modalSubtitle: { fontSize: 14, color: "#555", textAlign: "center", marginBottom: 12 },
  modalButtons: { flexDirection: "row", gap: 10 },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginHorizontal: 6 },
  modalBtnText: { color: "#fff", fontWeight: "700" },
  });




