import React from 'react';
import '../../styles/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleSignIn(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/api/login', {
            email: this.state.email,
            password: this.state.password
        },
        { headers: { 
            'Content-Type': 'application/json'
         }}
        ).then(res => {
            if (res.data.success === true) {
                let user = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                toast.success("Login successful!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                window.location.href = './home';
            }
        })
        .catch(err => {
            toast.error("User not found!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
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

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="customCheck1"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-signin btn-dark btn-sm btn-block"
                        onClick={e => this.handleSignIn(e)}
                    >
                        {' '}
                        Login
                    </button><br/>
                    <p className="forgot-password text-right">
                        <a className="link-login" href="/recover">
                            Forgot password?
                        </a>
                    </p>
                </form>
                <div className="register">
                    <h4>
                        Not a member?{' '}
                        <a className="link-login" href="/register">
                            Click here!
                        </a>
                    </h4>
                </div>
        </section>
        );
    }
}

export default Login;