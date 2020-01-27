import React, { Component } from 'react';

import Form from "./Form";
import Result from "./Result";
import './App.css';

// API key
const APIKey = "1cab65b4c62e35f56793c06864e330e3";

class App extends Component {

  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    wind: "",
    pressure: "",
    err: false
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleCitySubmit = e => {
    e.preventDefault()
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

    fetch(API)
    .then(response => {
      if(response.ok) {
        return response
      }
      throw Error("Houston, mamy problem!")
    })
    .then(response => response.json())
    .then(data => {
      const time = new Date().toLocaleString()
      this.setState(prevState => ({
        err: false,
        date: time,
        city: this.state.value,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        wind: data.wind.speed,
        pressure: data.main.pressure,
      }))
    })
    .catch(err => {
      console.log(err);
      this.setState(prevState => ({
        err: true,
        city: prevState.value 
      }))
    })
  }


  render() {
    return (
      <div className="App">
        <Form 
        value={this.state.value} 
        change={this.handleInputChange} 
        submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
