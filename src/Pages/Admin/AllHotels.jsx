import React, { useEffect, useState } from "react";
import "./adminProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import firebase_app from "../../01_firebase/config_firebase";

const db = getFirestore(firebase_app);

export const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(5);

  const handleDeleteHotel = async (deleteId) => {
    try {
      await deleteDoc(doc(db, "hotels", deleteId));
      setHotels(hotels.filter((hotel) => hotel.id !== deleteId));
      toast.success("Hotel Removed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "hotels"));
        const hotelList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHotels(hotelList.slice(0, limit));
      } catch (err) {
        console.error("Error fetching hotels:", err);
      }
      setIsLoading(false);
    };

    fetchHotels();
  }, [limit]);

  return (
    <>
      <ToastContainer />
      <div className="adminProductMain">
        <div className="adminSideBr">
          <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>
        </div>
        <div className="adminProductbox">
          <div className="filterProdcut">
            <input placeholder="Search Hotel" type="text" />
            <button>Search</button>
            {limit > hotels.length ? (
              ""
            ) : (
              <button onClick={handleLoadMore}>Load More</button>
            )}
          </div>
          <div className="head"><h1>All Hotels</h1></div>

          {isLoading ? <h1>Please wait...</h1> : ""}
          {hotels.map((ele, i) => (
            <div key={i} className="adminProductlist">
              <span>
                <img src={ele.image} alt="" />
              </span>
              <span>
                {ele.name && ele.name.length > 10
                  ? ele.name.substring(0, 10) + "..."
                  : ele.name}
              </span>
              <span>{ele.place}</span>
              <span>Rs.{ele.price}</span>
              <span>{ele.description}</span>
              <span>
                <button onClick={() => handleDeleteHotel(ele.id)}>
                  Delete <i className="fa fa-trash"></i>
                </button>
                <button>
                  Edit <i className="fa fa-pencil"></i>
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
