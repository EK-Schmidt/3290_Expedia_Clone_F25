import { Box, Image, Flex, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebase_app from "../../01_firebase/config_firebase";

import { useSelector } from "react-redux";

export default function FlightCard({ data }) {
  const { id, airline, from, to, departure, arrival, price, totalTime } = data;
  const toast = useToast();
  const db = getFirestore(firebase_app);

  const { activeUser } = useSelector((store) => ({
    activeUser: store.LoginReducer.activeUser,
  }));

  const handleClick = async () => {
    try {
      await addDoc(collection(db, "carts"), {
        ...data,
        userId: activeUser?.number || "guest",
        createdAt: Date.now(),
      });

      toast({
        title: "Flight added to Cart",
        description: "Please proceed to checkout.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not add to cart.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error("Add to cart error:", err);
    }
  };

  const Booknow = {
    marginTop: "3%",
    padding: "15px",
    height: "43px",
    background: "teal",
    color: "#FFFFFF",
    borderRadius: "0.5rem",
    position: "relative",
    marginBottom: "1rem",
  };

  return (
    <Box
      display={"flex"}
      gap="20px"
      key={id}
      height="100px"
      width={"80%"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      padding="10px"
      margin="auto"
      justifyContent="space-around"
      alignItems={"center"}
      borderRadius="10px"
      marginBottom={"20px"}
      textAlign="center"
    >
      <Box gap={"30px"}>
        <Image
          src="https://play-lh.googleusercontent.com/OhZSLjRDLvFLqtDp9bIgcvAweZIg5V5uIMI_7kOaS-9nPR043DUfoibkn1BgwG7Ai1U=w240-h480-rw"
          width={"35px"}
          height="30px"
        />
        <h1>{airline}</h1>
      </Box>
      <Flex display={"flex"} flexDirection="column">
        <h3 style={{ fontSize: "10px", fontWeight: "bold" }}>Departure</h3>
        <h3>{departure}</h3>
        <b>{from} </b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3 style={{ fontSize: "10px", fontWeight: "bold" }}>Arrival</h3>
        <h3>{arrival}</h3>
        <b style={{ fontSize: "14px" }}>{to} </b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>Duration</h3>
        <b>{totalTime}</b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>Price</h3>
        <b>{price}</b>
      </Flex>
      <Link to={"/checkout"}>
        <Button style={Booknow} onClick={handleClick}>
          Book Now
        </Button>
      </Link>
    </Box>
  );
}
