import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase_app from "../01_firebase/config_firebase";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, userRigister } from "../Redux/Authantication/auth.action";
import Navbar from "../Components/Navbar";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const state = {
  number: "",
  otp: "",
  user_name: "",
  password: "",
  verify: false,
  otpVerify: false,
};

export const Register = () => {
  const [check, setCheck] = useState(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { number, otp, verify, otpVerify, user_name, password } = check;

  const { user = [], isLoading } = useSelector((store) => {
    return {
      user: store.LoginReducer.user,
      isLoading: store.LoginReducer.isLoading,
    };
  });

  // Save user to Firestore
  const handleRegisterUser = async () => {
    try {
      let newObj = {
        number,
        user_name,
        password,
        email: "",
        dob: "",
        gender: "",
        marital_status: null,
        createdAt: Date.now(),
      };

      await setDoc(doc(db, "users", number), newObj);
      dispatch(userRigister(newObj));

      setCheck(state);
      window.location = "/login";
    } catch (error) {
      console.error("Error registering user:", error);
      document.querySelector("#loginMesageError").innerHTML =
        "Registration failed. Please try again.";
    }
  };

  function onCapture() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            handleVerifyNumber();
          },
        },
        auth
      );
    }
  }

  function handleVerifyNumber() {
    document.querySelector("#nextButton").innerText = "Please wait...";
    onCapture();
    const phoneNumber = `+1${number}`;
    const appVerifier = window.recaptchaVerifier;

    if (number.length === 10) {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setCheck({ ...check, verify: true });
          document.querySelector(
            "#loginMesageSuccess"
          ).innerHTML = `Otp Sent To ${number} !`;
          document.querySelector("#loginMesageError").innerHTML = "";
          document.querySelector("#nextButton").style.display = "none";
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          document.querySelector("#loginMesageError").innerHTML =
            "Error sending OTP.";
        });
    } else {
      document.querySelector("#loginMesageError").innerHTML =
        "Mobile Number is Invalid!";
    }
  }

  function verifyCode() {
    window.confirmationResult
      .confirm(otp)
      .then(() => {
        setCheck({ ...check, otpVerify: true });
        document.querySelector(
          "#loginMesageSuccess"
        ).innerHTML = `Verified Successfully`;
        document.querySelector("#loginMesageError").innerHTML = "";
        document.querySelector("#loginNumber").style.display = "none";
        document.querySelector("#loginOtp").style.display = "none";
      })
      .catch((error) => {
        console.error("Invalid OTP:", error);
        document.querySelector("#loginMesageError").innerHTML = "Invalid OTP";
      });
  }

  const handleChangeMobile = (e) => {
    let val = e.target.value;
    setCheck({ ...check, [e.target.name]: val });
  };

  useEffect(() => {
    dispatch(fetch_users);
  }, [dispatch]);

  return (
    <>
      <div className="mainLogin">
        <div id="recaptcha-container"></div>
        <div className="loginBx">
          <div className="logoImgdivReg">
            <img
              className="imglogoReg"
              src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg"
              alt="logo"
            />
          </div>

          <div className="loginHead">
            <hr /><hr /><hr />
            <h1>Register</h1>
          </div>

          <div className="loginInputB" id="loginNumber">
            <label htmlFor="">Enter Your Number</label>
            <span>
              <input
                type="number"
                readOnly={verify}
                name="number"
                value={number}
                onChange={(e) => handleChangeMobile(e)}
                placeholder="Number"
              />
              <button
                disabled={verify}
                onClick={handleVerifyNumber}
                id="nextButton"
              >
                Next
              </button>
            </span>
          </div>

          {verify ? (
            <div className="loginInputB" id="loginOtp">
              <label htmlFor="">Enter OTP</label>
              <span>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Next</button>
              </span>
            </div>
          ) : (
            ""
          )}

          {otpVerify ? (
            <>
              <div className="loginInputB">
                <label htmlFor="">Enter Your Full name</label>
                <span>
                  <input
                    type="text"
                    name="user_name"
                    value={user_name}
                    onChange={(e) => handleChangeMobile(e)}
                  />
                </span>
              </div>
              <div className="loginInputB">
                <label htmlFor="">Your Password</label>
                <span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleChangeMobile(e)}
                  />
                </span>
              </div>
              <div className="loginInputB">
                <button onClick={handleRegisterUser}>Continue</button>
              </div>
            </>
          ) : (
            ""
          )}

          {isLoading ? <h1>Please wait...</h1> : ""}

          <div className="loginTerms">
            <div className="inpChecbx">
              <input className="inp" type="checkbox" />
              <h2>Keep me signed in</h2>
            </div>
            <p>
              Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.
            </p>
            <h6>
              By signing in, I agree to the Expedia
              <span> Terms and Conditions</span>,
              <span> Privacy Statement</span> and
              <span> Expedia Rewards Terms and Conditions</span>.
            </h6>
          </div>
          <br />
          <h3 id="loginMesageError"></h3>
          <h3 id="loginMesageSuccess"></h3>
        </div>
      </div>
    </>
  );
};
