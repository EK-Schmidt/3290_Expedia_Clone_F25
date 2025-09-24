import React, { useState, useEffect } from "react";
import { Button, Box, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "../Stay/Stay.module.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase_app from "../../01_firebase/config_firebase";
import FlightCard from "./FlightCard"; // ✅ import the card component

const db = getFirestore(firebase_app);

const initialState = {
  from: "",
  to: "",
  passenger: 1,
  departureDate: "",
  returnDate: "",
};

export default function Flights() {
  const [PassengerData, setPassengerData] = useState(initialState);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setPassengerData({ ...PassengerData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    console.log(PassengerData);
    // later you can filter flights by from/to
  };

  const swapValuehandler = () => {
    setPassengerData({
      ...PassengerData,
      from: PassengerData.to,
      to: PassengerData.from,
    });
  };

  // fetch flights from Firestore
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const snapshot = await getDocs(collection(db, "flights"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFlights(data);
      } catch (err) {
        console.error("Error fetching flights:", err);
      }
      setLoading(false);
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <div className="homeTop" style={{ marginBottom: "100px" }}>
        <div className="homeTopCard">
          <div className="secondHeader"></div>

          <div className="homeInputBx">
            <div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs" />
                <label htmlFor="inputs">ONE WAY</label>
              </div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs2" />
                <label htmlFor="inputs2">ROUND TRIP</label>
              </div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs3" />
                <label htmlFor="inputs3">MULTI CITY</label>
              </div>
            </div>
          </div>

          <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
              <span>FROM</span>
              <select
                name="from"
                value={PassengerData.from}
                onChange={handleChange}
              >
                <option value="">From</option>
                <option value="DELHI">DELHI</option>
                <option value="MUMBAI">MUMBAI</option>
                <option value="BANGLURU">BANGLURU</option>
                <option value="PUNE">PUNE</option>
              </select>
              <button onClick={swapValuehandler}>
                <i className="fa fa-exchange"></i>
              </button>
            </div>
            <div className="MainSearchinputBx">
              <span>TO</span>
              <select
                name="to"
                value={PassengerData.to}
                onChange={handleChange}
              >
                <option value="">To</option>
                <option value="DELHI">DELHI</option>
                <option value="MUMBAI">MUMBAI</option>
                <option value="BANGLURU">BANGLURU</option>
                <option value="PUNE">PUNE</option>
              </select>
            </div>
            <div className="MainSearchinputBx">
              <span>DEPARTURE</span>
              <input type="date" name="departureDate" />
            </div>
            <div className="MainSearchinputBx">
              <span>RETURN</span>
              <input type="date" name="returnDate" />
            </div>
            <div className="MainSearchinputBx">
              <span>TRAVELLERS & CLASS</span>
              <input
                type="number"
                value={PassengerData.passenger}
                onChange={handleChange}
                name="passenger"
              />
            </div>
          </div>

          <div className="homeSearchButtonBx">
            <Button
              colorScheme="blue"
              size="lg"
              className={styles["SearchBtn1"]}
              style={{ margin: "auto" }}
              onClick={handleClick}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      <Box p={6}>
        <Text fontSize="2xl" mb={4}>
          Available Flights
        </Text>
        {loading ? (
          <Text>Loading flights...</Text>
        ) : flights.length > 0 ? (
          <Stack spacing={4}>
            {flights.map((flight) => (
              <FlightCard key={flight.id} data={flight} />
            ))}
          </Stack>
        ) : (
          <Text>No flights available.</Text>
        )}
      </Box>
    </div>
  );
}
