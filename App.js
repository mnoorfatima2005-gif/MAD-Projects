import React, { createContext, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 🌐 Global Context
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [themeColor] = useState("#ff4da6");
  const [appName] = useState("💄 NOOR’s Global Makeup");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert("🛍️ Order Placed", `${item.name} added successfully!`);
  };

  return (
    <GlobalContext.Provider value={{ themeColor, appName, cart, addToCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 🏠 Home Screen
function HomeScreen({ navigation }) {
  const { appName, themeColor } = useContext(GlobalContext);

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <Text style={styles.title}>{appName}</Text>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate("Products")}
      >
        <Text style={styles.btnText}>🛍️ View Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.btnText}>🛒 View My Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.btnText}>ℹ️ About App</Text>
      </TouchableOpacity>
    </View>
  );
}

// 💅 Products Screen (with your real images)
function ProductScreen() {
  const { addToCart } = useContext(GlobalContext);

  const products = [
    {
      id: "1",
      name: "Matte Lipstick 💋",
      price: "$15",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe5pWiIkrmpRfpxFE2f6TVgLiQ1wAEwXBqXw&s",
    },
    {
      id: "2",
      name: "Liquid Foundation 🧴",
      price: "$25",
      img: "https://www.maybelline.com/-/media/project/loreal/brand-sites/mny/americas/us/face-makeup/foundation/dream-radiant-liquid-medium-coverage-hydrating-foundation/maybelline-foundation-dream-radiant-liquid-pure-beige-041554579147-o.jpg?rev=fb60bcd697f54e26aea7402c306db6b8&cx=0&cy=0&cw=760&ch=1130&hash=4098653043A82BA73E1AD1A87E2D2388",
    },
    {
      id: "3",
      name: "Eyeshadow Palette 🌈",
      price: "$35",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQizgbAwmleVLAW5fIO5C7KzA6Q-qeeJlZAvw&s",
    },
    {
      id: "4",
      name: "Highlighter & Blush Palette ✨",
      price: "$20",
      img: "https://imagicmakeup.com.pk/cdn/shop/files/E9z8IMAGIC-New-6-color-Hybrid-Highlight-Blush-Palette-Rouge-Makeup-Blush-Palet-Blush-Contour-Shadow-Facial.png?v=1688378489",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addBtnText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
}

// 🛒 Cart Screen
function CartScreen() {
  const { cart, themeColor } = useContext(GlobalContext);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: "#fff", paddingVertical: 20 },
      ]}
    >
      <Text style={[styles.title, { color: themeColor }]}>🛍️ My Orders</Text>

      {cart.length === 0 ? (
        <Text style={{ color: "#555", marginTop: 20 }}>No items added yet.</Text>
      ) : (
        cart.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={{ uri: item.img }} style={styles.cartImage} />
            <View>
              <Text style={styles.cartName}>{item.name}</Text>
              <Text style={styles.cartPrice}>{item.price}</Text>
            </View>
          </View>
        ))
      )}

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={() =>
            Alert.alert("🎉 Thank You!", "Your order has been placed successfully!")
          }
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

// 💖 About Screen
function AboutScreen() {
  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.aboutTitle}>About NOOR’s App 💄</Text>
      <Text style={styles.aboutText}>
        NOOR’s Global Makeup App is a modern beauty experience where users can
        explore and order high-quality makeup products globally. ✨{"\n\n"}
        💋 Trusted Brands {"\n"}
        🌎 Worldwide Delivery {"\n"}
        💅 Advanced Beauty Catalog
      </Text>
    </View>
  );
}

// 🧭 Navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#ff4da6" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Products" component={ProductScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, color: "white", fontWeight: "bold", marginBottom: 20 },
  mainButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    margin: 8,
    width: 220,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#ffe6f7",
    padding: 12,
    borderRadius: 12,
    margin: 8,
    width: 220,
    alignItems: "center",
  },
  btnText: { color: "#ff4da6", fontSize: 16, fontWeight: "bold" },

  listContainer: { padding: 15, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#fff0f6",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  productImage: { width: 200, height: 200, borderRadius: 20 },
  productName: { fontSize: 18, marginTop: 10, color: "#ff4da6" },
  productPrice: { color: "#333", marginBottom: 8 },
  addButton: {
    backgroundColor: "#ff4da6",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnText: { color: "#fff", fontWeight: "bold" },

  cartItem: {
    flexDirection: "row",
    backgroundColor: "#ffe6f7",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    width: "90%",
    alignItems: "center",
  },
  cartImage: { width: 70, height: 70, borderRadius: 10, marginRight: 10 },
  cartName: { fontSize: 16, color: "#ff4da6", fontWeight: "bold" },
  cartPrice: { color: "#333" },
  placeOrderBtn: {
    backgroundColor: "#ff4da6",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  placeOrderText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  aboutContainer: { flex: 1, padding: 20, backgroundColor: "#ffe6f0" },
  aboutTitle: {
    fontSize: 26,
    color: "#ff4da6",
    marginBottom: 10,
    fontWeight: "bold",
  },
  aboutText: { fontSize: 16, color: "#333", lineHeight: 22 },
});




