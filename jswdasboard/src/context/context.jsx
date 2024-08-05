import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [period, setPeriod] = useState("Last Coil");
  const [mainData, setMainData] = useState(null);
  const [eightData, setEightData] = useState(null);
  const [rmBarThickness, setRmBarThickness] = useState(null);
  const [rollChange, setRollChange] = useState(null);
  const [mins, setMins] = useState(false);
  const [data, setData] = useState(null);

  console.log(rollChange, "rollChange");
  console.log(eightData, "eightData");

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const fetchData = async (url, callback) => {
    try {
      const response = await axios.get(url);
      callback(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      toast.error(`Error fetching data from ${url}`);
    }
  };

  const postData = async (url, payload, callback) => {
    try {
      const response = await axios.post(url, payload);
      callback(response.data);
      toast.dismiss();
      toast.success("Data Fetching Successful");
    } catch (error) {
      toast.dismiss();
      toast.error("Data Fetching Failed");
      console.error(`Error posting data to ${url}:`, error);
    }
  };

  const getData = async () => {
    toast.loading("Loading Data");
    const url = "http://localhost:8000/sendData";
    const payload = { period };

    postData(url, payload, setData);
  };

  useInterval(() => {
    if (period === "Last Coil") {
      toast.loading("Loading Data");
      postData("http://localhost:8000/sendData", { period }, setData);
    }
  }, 30000);

  useInterval(() => {
    fetchData("http://localhost:8000/add", setMainData);
  }, 120000);

  useEffect(() => {
    fetchData("http://localhost:8000/add1", (data) => setEightData(data?.arr));
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
