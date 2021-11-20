import React from 'react';
import '../../styles/Login.css';
import LoginServiceAPI from '../serivces/LoginServiceAPI';

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
        LoginServiceAPI.login(this.state.email, this.state.password);
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