import './App.css';
import CustomNavBar from './components/navBar/CustomNavBar';
import CustomRoutes from './components/navBar/CustomRoutes';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="App">
        <video src='/background/videos/background.mp4' autoPlay loop muted />
        <CustomNavBar />
        <CustomRoutes />
        <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover/>
    </div>
    );
}

export default App;
