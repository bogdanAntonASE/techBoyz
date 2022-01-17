import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProjectsPage from '../pages/ProjectsPage';
import Register from '../pages/Register';
import BugsPage from '../pages/BugsPage';

export default function CustomRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/projects" element={<ProjectsPage/>}/>
                <Route path="/bugs" element={<BugsPage/>}/>
            </Routes>
        </Router>
    );
}