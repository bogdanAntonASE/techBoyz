import './App.css';
import CustomNavBar from './components/navBar/CustomNavBar';
import CustomRoutes from './components/navBar/CustomRoutes';
import React from 'react';

const App = () => {
  return (
    <div className="App">
        <video src='/background/videos/background.mp4' autoPlay loop muted />
        <CustomNavBar />
        <CustomRoutes />
    </div>
    );
}

export default App;
