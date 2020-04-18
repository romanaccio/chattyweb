import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        this.setState({ readError: null });
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({ chats });
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
            await db.ref("chats").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            });
            this.setState({ content: '' });
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }



    render() {
        return (
            <div>
		        <Header></Header>
		        <section>
		          <div className="jumbotron jumbotron-fluid py-5">
		            <div className="container text-center py-5">
		              <h1 className="display-4">Go ahead and chat!</h1>
		            </div>
		          </div>

			    <div>
			      <div className="chats">
			        {this.state.chats.map(chat => {
			          return <p key={chat.timestamp}>{chat.content}</p>
			        })}
			      </div>

			      <form onSubmit={this.handleSubmit}>
			        <input onChange={this.handleChange} value={this.state.content}></input>
			        {this.state.error ? <p>{this.state.writeError}</p> : null}
			        <button type="submit">Send</button>
			      </form>
			      <div>
			        Login in as: <strong>{this.state.user.email}</strong>
			      </div>
			    </div>

		        </section>
		    <Footer></Footer>
		    </div>

        );
    }
}