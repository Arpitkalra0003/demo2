import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";
function App()
{
  const [data,setData] = useState([])


  useEffect(()=>{
    fetchData();
  },[data])

const fetchData = ()=> {
  const instance = axios.create({
    baseURL: "https://api.chucknorris.io/jokes/",
    method: "get",
    timeout: 5000
  });
  instance.interceptors.response.use(
    response => {
      setData(response.data.value)
     
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
  instance.request("random");
}

  return(
    <div className="App">
    <img
      alt="Click on Chuck to Reload Message"
      src="https://i.pinimg.com/originals/28/dc/14/28dc143f2eb466f017b317be48cdc376.png"
      onClick={fetchData}
    />
    <hr />
    <p>{data}</p>
  </div>
  )
}


export default App;