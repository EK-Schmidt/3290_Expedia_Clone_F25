import { Box, Image, Flex, Button, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebase_app from "../../01_firebase/config_firebase";
import { useSelector } from "react-redux";

const db = getFirestore(firebase_app);

export default function HotelCard({ data }) {
  const { id, image, name, place, price, description, additional } = data;
  const toast = useToast();
  const { activeUser } = useSelector((store) => store.LoginReducer);

  const handleAddToCart = async () => {
    if (!activeUser?.number) {
      toast({
        title: "Please log in first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await addDoc(collection(db, "carts"), {
        userId: activeUser.number,
        title: name,
        type: "hotel",
        price,
        place,
      });
      toast({
        title: "Hotel added to cart",
        description: "Check your cart to proceed with booking",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error adding hotel to cart:", err);
      toast({
        title: "Error",
        description: "Could not add hotel to cart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      key={id}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      textAlign="center"
    >
      <Image src={image} alt={name} height="200px" width="100%" objectFit="cover" />
      <Text fontWeight="bold" mt={2}>{name}</Text>
      <Text>{place}</Text>
      <Text color="gray.500" fontSize="sm">{description}</Text>
      <Text fontWeight="semibold">₹{price}</Text>
      <Button mt={3} colorScheme="teal" onClick={handleAddToCart}>
        Book Hotel
      </Button>
    </Box>
  );
}
