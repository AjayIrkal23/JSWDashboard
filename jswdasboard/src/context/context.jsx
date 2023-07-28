import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [period, setPeriod] = useState("Last Coil");
  const [mainData, setMainData] = useState(null);
  console.log(mainData);
  const [data, setData] = useState(null);
  console.log(data);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
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

  const getData2 = async () => {
    axios.get("http://localhost:8000/add").then((resp) => {
      setMainData(resp.data);
    });
  };
  useInterval(async () => {
    // Your custom logic here
    toast.loading("Loading Data");
    if (period == "Last Coil") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period == "Last 5 Coil") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period == "Last Hour") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period == "Last Day") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period.customp) {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period.date && period.time) {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    }

    setPeriod("Last Coil");
  }, 60000);

  useInterval(async () => {
    // Your custom logic here

    getData2();
  }, 120000);

  const getData = async () => {
    toast.loading("Loading Data");
    if (period == "Last Coil") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period == "Last 5 Coil") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period == "Last Hour") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period == "Last Day") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period.customp) {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
          toast.dismiss();
          toast.success("Data Fetching Successfull");
        });
    } else if (period.date && period.time) {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    }
  };

  useEffect(() => {
    getData();
    getData2();
  }, [period]);

  return (
    <AccountContext.Provider value={{ period, setPeriod, data, mainData }}>
      {children}
    </AccountContext.Provider>
  );
};
