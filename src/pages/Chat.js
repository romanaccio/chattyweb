import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"


export default class App extends React.Component {
  // When mounting is in progress, please render the following!
  render() {
    return (
      <div>
        <p>Hello World!</p>
      </div>
    )
  }
}
