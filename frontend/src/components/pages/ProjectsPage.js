import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../styles/Projects.css';

class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            table: []
        }
    }

    componentDidMount() {
        this.setState({
            projects: this.getProjects()
        })
    }

    getProjects = () => {
        axios.get('http://localhost:3001/api/projects',
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            this.setState({
                projects: res.data,
                table:  res.data.map((project, index) => {
                    const {id, name, owner, url} = project;
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{owner}</td>
                            <td>{url}</td> 
                            <td>
                                <input type="button" className="btn btn-dark" value="Edit Row"/>
                            </td>
                            <td>
                                <input type="button" className="btn btn-dark" value="Delete Row"/>
                            </td>
                        </tr>
                    )
                })
            })
        })
        .catch(err => {
            toast.error("Projects could not be retrieved! " + err.response.data.text, {
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

    // createTbody() {
    //     return this.state.projects.map((project, index) => {
    //         const {id, name, owner, url} = project;
    //         return (
    //             <tr key={id}>
    //                 <td>{id}</td>
    //                 <td>{name}</td>
    //                 <td>{owner}</td>
    //                 <td>{url}</td> 
    //             </tr>
    //         )
    //     })
    // }

    addRow = (event) => {
        let projectName = document.getElementById("new_project_name").value;
        let owner = document.getElementById("new_owner").value;
        let git = document.getElementById("new_git_repo").value;

        if (projectName === '' || owner === '' || git === '') {
            toast.error("All fields are mandatory!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    });
        }


        axios.post('http://localhost:3001/api/projects', {
            projectName: projectName,
            owner: owner,
            git: git
        },
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            if (res.data.success === true) {
                toast.success("Project successfully added!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        })
        .catch(err => {
            toast.error("Project could not be added! " + err.response.data.text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return;
        });

        this.getProjects();
    }

    render() {
        return <div style={{overflow: "auto"}}>
            <table className='table projects-table' a>
                <thead className='thead-dark'>
                    <tr>
                        <td>Project Id</td>
                        <td>Project Name</td>
                        <td>Owner</td>
                        <td>GIT Repo</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.table}
                    <tr className='input_field'>
                        <td></td>
                        <td><input type="text" id="new_project_name"/></td>
                        <td><input type="text" id="new_owner"/></td>
                        <td><input type="text" id="new_git_repo"/></td>
                        <td><input type="button" className="btn btn-dark" onClick={this.addRow} value="Add Row"/></td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}

export default ProjectsPage;