import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DeleteBooking() {
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

  const [resultDeleteBooking, setResultDeleteBooking] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const sendDataToServer = (payload) => {
    let id = payload.id;

    api
      .delete(`/api/v1/admins/delete/sessionbook/${id}`)
      .then((res) => {
        setResultDeleteBooking(res.data);
        setSubmitted(true);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        setResultDeleteBooking(err.response.data);
        setSubmitted(false);
        setProperties({ loading: false, error: true });
      });
  };

  return { resultDeleteBooking, sendDataToServer, submitted, properties };
}
