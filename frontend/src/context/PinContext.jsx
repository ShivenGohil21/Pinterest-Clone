// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// axios.defaults.withCredentials = true;

// const PinContext = createContext();

// export const PinProvider = ({ children }) => {
//   const [pins, setPins] = useState([]);
//   const [loading, setLoading] = useState(true); // fixed: was `second`

//   async function fetchPin() {
//     try {
//       const { data } = await axios.get("/api/pin/"+ id); // fixed: added await
//       setPins(data);
//       setLoading(false);
//     } catch (error) {
//       console.log("Error fetching pins:", error.response?.data || error.message);
//       setLoading(false);
//     }
//   }

//   const [pin, setPin] = useState([])

//   async function fetchPin(id) {
//     setLoading(true);
//     try{
//         const {data} = await axios.get("/api/pin"+id);

//         setPin(data);
//         setLoading(false);
//     } catch(error) {
//         console.log(error);
//     }
// }

//   useEffect(() => {
//     fetchPin();
//   }, []);

//   return (
//     <PinContext.Provider value={{ pins, loading, fetchPin, pin }}>
//       {children}
//     </PinContext.Provider>
//   );
// };

// export const PinData = () => useContext(PinContext);


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPins() {
    try {
      const { data } = await axios.get("/api/pin"); // fetch all pins
      setPins(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching pins:", error.response?.data || error.message);
      setLoading(false);
    }
  }

  const [pin, setPin] = useState([])

  async function fetchPin(id) {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/pin/" + id);
     
      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPins(); // call on initial load
  }, []);

  return (
    <PinContext.Provider value={{ pins, loading, fetchPin, pin }}>
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
