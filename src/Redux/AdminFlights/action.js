import {
  DELETE_FLIGHTS,
  FETCH_FLIGHTS,
  FLIGHT_FAILURE,
  FLIGHT_REQUEST,
  GET_FLIGHT_SUCCESS,
  POST_FLIGHT_SUCCESS,
} from "./actionType";

import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import firebase_app from "../../01_firebase/config_firebase";

const db = getFirestore(firebase_app);

export const getFlightSuccess = (payload) => ({ type: GET_FLIGHT_SUCCESS, payload });
export const postFlightSuccess = () => ({ type: POST_FLIGHT_SUCCESS });
export const flightRequest = () => ({ type: FLIGHT_REQUEST });
export const flightFailure = () => ({ type: FLIGHT_FAILURE });
export const fetch_flights_product = (payload) => ({ type: FETCH_FLIGHTS, payload });
export const handleDeleteProduct = (payload) => ({ type: DELETE_FLIGHTS, payload });

export const addFlight = (payload) => async (dispatch) => {
  dispatch(flightRequest());
  try {
    await addDoc(collection(db, "flights"), payload);
    dispatch(postFlightSuccess());
  } catch (err) {
    console.error("Error adding flight:", err);
    dispatch(flightFailure());
  }
};

export const fetchFlightProducts = () => async (dispatch) => {
  dispatch(flightRequest());
  try {
    const snapshot = await getDocs(collection(db, "flights"));
    const flights = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(fetch_flights_product(flights));
  } catch (err) {
    console.error("Error fetching flights:", err);
    dispatch(flightFailure());
  }
};

export const DeleteFlightProducts = (deleteId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "flights", deleteId));
    dispatch(handleDeleteProduct(deleteId));
  } catch (err) {
    console.error("Error deleting flight:", err);
    dispatch(flightFailure());
  }
};
