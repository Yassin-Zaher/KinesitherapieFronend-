import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddNurse() {
  const bearerToken = useSelector((state) => state.login.token);
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  const [resultAddNurse, setResultAddNurse] = useState({});
  //const [resultAddNurse, setResultAddNurse] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sendDataToServer = (payload) => {
    payload = {
      email: payload.email,
      motDePasse: payload.motDePasse,
      nom: payload.nom,
      prenom: payload.prenom,
      address: payload.address,
      phoneNumber: "212" + payload.phoneNumber,
      dob: payload.dob,
      gender: payload.gender,
    };
    api
      .post("/api/users/saveSecretaire", payload)
      .then((res) => {
        setResultAddNurse(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        if (err.response) {
          setResultAddNurse(err.response.data);
        } else if (err.request) {
          // The request was made but no response was received
          setResultAddNurse("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setResultAddNurse(`Error: ${err.message}`);
        }
        setSubmitted(false);
      });
  };

  return { submitted, resultAddNurse, sendDataToServer };
}
