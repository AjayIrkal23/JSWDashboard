import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [period, setPeriod] = useState("Last Coil");
  const [mainData, setMainData] = useState(null);
  const [eightData, setEightData] = useState(null);
  const [rmBarThickness, setRmBarThickness] = useState(null);
  const [rollChange, setRollChange] = useState(null);
  const [mins, setMins] = useState(false);
  const [data, setData] = useState(null);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const fetchData = async (
    url,
    setter,
    successMessage = "Data Fetching Successful"
  ) => {
    try {
      const response = await axios.get(url);
      setter(response.data);
      toast.success(successMessage);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const postData = async (
    url,
    payload,
    setter,
    successMessage = "Data Fetching Successful"
  ) => {
    try {
      const response = await axios.post(url, payload);
      setter(response?.data);
      toast.dismiss();
      toast.success(successMessage);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to fetch data");
    }
  };

  useInterval(() => {
    toast.loading("Loading Data...");
    if (period) {
      postData("http://localhost:8000/sendData", { period }, setData);
    }
  }, 30000);

  useInterval(() => {
    fetchData("http://localhost:8000/add", setMainData);
  }, 120000);

  const getData = () => {
    if (period) {
      postData("http://localhost:8000/sendData", { period }, setData);
    }
  };

  useEffect(() => {
    fetchData("http://localhost:8000/add1", (resp) => setEightData(resp?.arr));
    getData();
    fetchData("http://localhost:8000/add", setMainData);
  }, [period, mins]);

  return (
    <AccountContext.Provider
      value={{
        period,
        setPeriod,
        data,
        mainData,
        eightData,
        setMins,
        mins
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
