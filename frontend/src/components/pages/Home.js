import React from 'react';
import '../../styles/Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-container">   
                <h2>Best Bugs Tracking Appication in the WORLD</h2>
                <p>Check out our offers!</p>
            </div>
        );
    }
}

export default Home;