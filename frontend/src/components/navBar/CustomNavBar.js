import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/CustomNavBar.css";
import logo from '../../styles/logo.jpg';

class CustomNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: false
        };
    }

    componentDidMount() {
          
    }

    componentDidUpdate() {
        console.log('component updated');
    }
    
    render() {
        return (
            <Navbar expand="lg" className="custom-navbar py-0">
                <Container>
                    <Navbar.Brand href="/" className="brand">
                        BT Application <img alt="logo" className="logo" src={logo}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="customNav">
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href="/aboutus">About Us</Nav.Link>
                            </Nav.Item>
                            
                                {this.state.isUserLoggedIn === true ? (
                                    <Nav.Item>
                                        <Nav.Link href="/profile">Profile</Nav.Link>
                                    </Nav.Item>
                                ) : 
                                (
                                    <>
                                        <Nav.Item>
                                            <Nav.Link href="/login">Sign in</Nav.Link>
                                        </Nav.Item>
                                    </>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default CustomNavBar;