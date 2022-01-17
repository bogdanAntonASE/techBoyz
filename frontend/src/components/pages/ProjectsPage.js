import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../styles/Projects.css';

class ProjectsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            table: [],
            currentPage: [],
            currentPageNumber: 1,
            totalNumberOfPages: 0
        }
    }

    componentDidMount() {
        this.setState({
            projects: this.getProjects(0)
        })
    }

    getProjects = (pageNumber) => {
        axios.get('http://localhost:3001/api/projects',
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            console.log(res.data);
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
                                <input type="button" className="btn btn-dark" value="Delete Row" id={"id-" + id} onClick={this.deleteRow}/>
                            </td>
                            <td>
                                <input type="button" className="btn btn-dark" value="Join Project" id={"idJ-" + id} disabled={this.isMember(id) ? false : false} onClick={this.joinProject}/>
                            </td>
                        </tr>
                    )
                }),
                totalNumberOfPages: res.data.length / 5,
                currentPageNumber: pageNumber,
                pages: this.getPages(res.data)
            });
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

    isMember = async (id) => {
        let email = localStorage.getItem("mySession").split("\"")[17];
        console.log(id, email);
        await axios.post('http://localhost:3001/api/projects/member', { 
            id: id,
            email: email
        },
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            
            return res.data.isMember;
        })
    }

    joinProject = (event) => {
        let email = localStorage.getItem("mySession").split("\"")[17];
        let id = parseInt(String(event.target.id).substring(4));
        console.log('joining...');
        axios.post('http://localhost:3001/api/projects/join', { 
            id: id,
            email: email
        },
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            toast.success("You have successfully joined a project!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return res.data.isMember;
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

    getPages = (data) => {
        console.log(data);
        let elements = [];
        for (let i = 0; i < data.length / 5; i ++) {
            elements.push(<td className="btn btn-dark" onClick={this.changePage}>{i + 1}</td>);
        }
        console.log(elements);
        return elements;
    }

    changePage = (event) => {
        if (event.target.innerHTML !== "Next" && event.target.innerHTML !=="Prev") {
            this.setState({
                currentPageNumber: parseInt(event.target.innerHTML) - 1
            });
        }
        else {
            if (event.target.innerHTML == "Next") {
                this.setState({
                    currentPageNumber: this.state.currentPageNumber + 1
                });
            }
            else {
                this.setState({
                    currentPageNumber: this.state.currentPageNumber - 1
                });
            }
        }
    }

    isFirstPage = () => {
        return this.state.currentPageNumber === 0 || this.state.currentPageNumber === undefined;
    }

    isLastPage = () => {
        return this.state.currentPageNumber === Math.ceil(this.state.totalNumberOfPages) - 1 || this.state.currentPageNumber === undefined;
    }

    addRow = () => {
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
            
            this.getProjects(this.state.currentPageNumber);
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
    }

    deleteRow = (event) => {
        let id = parseInt(String(event.target.id).substring(3));
        axios.delete('http://localhost:3001/api/projects/' + id,
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            if (res.data.success === true) {
                toast.success("Project successfully deleted!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
            
            this.getProjects(this.state.currentPageNumber);
        })
        .catch(err => {
            toast.error("Project could not be deleted! " + err.response.data.text, {
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
    }

    render() {
        return <div style={{overflow: "auto"}}>
            <table className='table projects-table table-sm'>
                <thead className='thead-dark'>
                    <tr key={9997}>
                        <td>Project Id</td>
                        <td>Project Name</td>
                        <td>Owner</td>
                        <td>GIT Repo</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.table.slice(this.state.currentPageNumber * 5, this.state.currentPageNumber * 5 + 5)}
                    <tr className='input_field' key={9998}>
                        <td></td>
                        <td><input type="text" id="new_project_name"/></td>
                        <td><input type="text" id="new_owner"/></td>
                        <td><input type="text" id="new_git_repo"/></td>
                        <td colSpan={2} style={{'textAlign': 'center'}}><input type="button" className="btn btn-dark" onClick={this.addRow} value="Add Row"/></td>
                    </tr>
                    <tr className='pagination' key={9999}>
                        <td style={{display: this.isFirstPage() ? "none" : "inline-block"}} className='btn-dark' onClick={this.changePage}>Prev</td>
                        {this.state.pages}
                        <td style={{display: this.isLastPage() ? "none" : "inline-block"}} className='btn-dark' onClick={this.changePage}>Next</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}

export default ProjectsPage;