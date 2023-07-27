import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [period, setPeriod] = useState("Last Coil");

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

  useInterval(async () => {
    // Your custom logic here

    if (period == "Last Coil") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period == "Last 5 Coil") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period == "Last Hour") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period == "Last Day") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period.customp) {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period.date && period.time) {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    }
  }, 60000);

  const getData = async () => {
    if (period == "Last Coil") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period == "Last 5 Coil") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period == "Last Hour") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period == "Last Day") {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
        });
    } else if (period.customp) {
      await axios
        .post("http://localhost:8000/sendData", { period: period })
        .then((resp) => {
          setData(resp?.data);
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
  }, [period]);

  return (
    <AccountContext.Provider value={{ period, setPeriod, data }}>
      {children}
    </AccountContext.Provider>
  );
};
