import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        this.setState({
            projects: this.getProjects()
        })
    }

    componentDidUpdate() {

    }

    getProjects = () => {
        axios.get('http://localhost:3001/api/projects',
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            console.log(res);
        })
        .catch(err => {
            toast.error("Projects could not be retrieved!", {
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
        return <div>

        </div>;
    }
}

export default ProjectsPage;