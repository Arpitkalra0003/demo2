import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var instance = axios.create({
      baseURL: "https://api.chucknorris.io/jokes/",
      method: "get",
      timeout: 5000
    });
    instance.interceptors.response.use(
      response => {
        this.setState({
          data: response.data.value
        });
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
    instance.request("random");
  }

  render() {
    return (
      <div className="App">
        <img
          alt="Click on Chuck to Reload Message"
          src="https://i.pinimg.com/originals/28/dc/14/28dc143f2eb466f017b317be48cdc376.png"
          onClick={this.fetchData}
        />
        <hr />
        <p>{this.state.data}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
