import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class Chat extends React.Component {
  // When mounting is in progress, please render the following!
  render() {
    return (
      <div>
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Hello World!</h1>
            </div>
          </div>

        </section>
        <Footer></Footer>
      </div>
    )
  }
}
