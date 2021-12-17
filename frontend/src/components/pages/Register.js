import { WindowsBalloon } from 'node-notifier';
import React from 'react';
import '../../styles/Login.css';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: ""
        };
    }

    handleSignUp(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/api/signup', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        },
        { headers: { 
            'Content-Type': 'application/json'
         }}
        ).then(res => {
            if (res.data) {
                console.log(res.data);
                window.location.href = './home';
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <section className="section-login">
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={e => {
                                this.setState({
                                    email: e.target.value.toString(),
                                });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            onChange={e => {
                                this.setState({
                                    username: e.target.value.toString(),
                                });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={e => {
                                this.setState({
                                    password: e.target.value.toString(),
                                });
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-signin btn-dark btn-sm btn-block"
                        onClick={e => this.handleSignUp(e)}
                    >
                        {' '}
                        Register
                    </button><br/>
                </form>
        </section>
        );
    }
}

export default Register;