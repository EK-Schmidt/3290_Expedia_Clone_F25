import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Text, Stack } from "@chakra-ui/react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firebase_app from "../01_firebase/config_firebase";

const db = getFirestore(firebase_app);

const Cart = () => {
  const { activeUser } = useSelector((store) => store.LoginReducer);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (!activeUser?.number) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "carts"),
          where("userId", "==", activeUser.number)
        );
        const querySnapshot = await getDocs(q);
        const cartData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setItems(cartData);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
      setLoading(false);
    };

    fetchCart();
  }, [activeUser]);

const handleRemove = async (id) => {
  try {
    const docRef = doc(db, "carts", id); // use Firestore doc ID
    await deleteDoc(docRef);
    setItems((prev) => prev.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Error removing item:", error);
  }
};


  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (loading) return <Text>Loading cart...</Text>;
  if (!activeUser?.number) return <Text>Please log in to view your cart.</Text>;

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={4}>
        Your Cart
      </Text>
      {items.length === 0 ? (
        <Text>No items in cart.</Text>
      ) : (
        <Stack spacing={4}>
          {items.map((item) => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="lg">
              <Text fontWeight="bold">{item.title || item.airline || "Item"}</Text>
              <Text>Price: ${item.price}</Text>
              {item.type && <Text>Type: {item.type}</Text>}
              <Button
                mt={2}
                colorScheme="red"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Box mt={6} p={4} borderTopWidth="1px">
            <Text fontSize="xl">Total: ${total}</Text>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Cart;
