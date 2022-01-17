import axios from 'axios';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/BugsPage.css';

class BugsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectsName: [],
            bugs: [],
            table: [],
            currentPage: [],
            currentPageNumber: 1,
            totalNumberOfPages: 0,
            currentProject: "Projects list"
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = () => {
        axios.get('http://localhost:3001/api/projects',
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            let elements = [];
            for (let i = 0; i < res.data.length; i ++) {
                elements.push(<Dropdown.Item onClick={this.renderTable} id={res.data[i].id}>{res.data[i].name}</Dropdown.Item>);
            }
            this.setState({
                projectsName: elements
            })
        });
    }

    renderTable = (event) => {
        axios.post('http://localhost:3001/api/bugs',
        {
            id: event.target.id
        },
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            this.setState({
                table:  res.data.map((bug, index) => {
                    console.log(bug);
                    const {id, severity, priority, description, commit, project_id, asignee, reporter} = bug;
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{severity}</td>
                            <td>{priority}</td>
                            <td>{description}</td>
                            <td>{commit}</td>
                            <td>{project_id}</td>
                            <td>{asignee}</td>
                            <td>{reporter}</td>
                            <td>
                                <input type="button" className="btn btn-dark" value="Delete Row" id={"id-" + id} onClick={this.deleteRow}/>
                            </td>
                        </tr>
                    )
                }),
                totalNumberOfPages: res.data.length / 5,
                currentPageNumber: 0,
                pages: this.getPages(res.data),
                currentProject: event.target.innerHTML === undefined || event.target.innerHTML === '' ? this.state.currentProject : event.target.innerHTML
            });
            console.log(event.target.innerHTML);
            document.getElementById("myThead").style.display = "table";
            document.getElementById("myTbody").style.display = "table";

        })
        .catch(err => {
            toast.error("Bugs could not be retrieved! " + err.response.data.text, {
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

    deleteRow = (event) => {
        let id = parseInt(String(event.target.id).substring(3));
        axios.delete('http://localhost:3001/api/bugs/' + id,
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            if (res.data.success === true) {
                toast.success("Bug successfully deleted!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
            let simmedEvent = { target: { id: res.data.projectId }};
            console.log(simmedEvent);
            this.renderTable(simmedEvent);
            
        })
        .catch(err => {
            toast.error("Bug could not be deleted! " + err.response.data.text, {
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

        console.log(event);
        this.renderTable(event);
    }

    getPages = (data) => {
        let elements = [];
        for (let i = 0; i < data.length / 5; i ++) {
            elements.push(<td className="btn btn-dark" style={{display: 'initial'}} onClick={this.changePage}>{i + 1}</td>);
        }
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
        return  Math.ceil(this.state.totalNumberOfPages) == 0 || this.state.currentPageNumber === Math.ceil(this.state.totalNumberOfPages) - 1 || this.state.currentPageNumber === undefined;
    }

    addRow = () => {
        let bugSeverity = document.getElementById("new_bug_severity").value;
        let bugPriority = document.getElementById("new_bug_priority").value;
        let bugDescription = document.getElementById("new_bug_description").value;
        let lastCommit = document.getElementById("new_last_commit").value;
        let projectId = document.getElementById("new_project_id").value;
        let asignee = document.getElementById("new_asignee").value;
        let reporter = document.getElementById("new_reporter").value;

        let simmedEvent = { target: { id: projectId } };

        if (bugSeverity === '' || bugPriority === '' || bugDescription === '' || projectId === '' || reporter === '') {
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

        axios.post('http://localhost:3001/api/bugsInsert', {
            severity: bugSeverity,
            priority: bugPriority,
            description: bugDescription,
            commit: lastCommit,
            project_id: projectId,
            reporter: reporter,
            asignee: asignee
        },
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            if (res.data.success === true) {
                toast.success("Bug successfully added!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
            
            this.renderTable(simmedEvent);
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

    render() {
        return <div style={{overflow: "auto"}}>
            <Dropdown className='select-project'>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {this.state.currentProject}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {this.state.projectsName}
                </Dropdown.Menu>
            </Dropdown>
            <table className='table bugs-table table-sm'>
                <thead className='thead-dark' style={{display: "none"}} id="myThead">
                    <tr key={9997}>
                        <td>Bug Id</td>
                        <td>Bug Severity</td>
                        <td>Bug Priority</td>
                        <td>Bug Description</td>
                        <td>Last Commit</td>
                        <td>Project Id</td>
                        <td>Asignee</td>
                        <td>Reporter</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody style={{display: "none"}} id="myTbody">
                    {this.state.table.slice(this.state.currentPageNumber * 5, this.state.currentPageNumber * 5 + 5)}
                    <tr className='input_field' key={9998}>
                        <td></td>
                        <td><input type="text" id="new_bug_severity" placeholder='Severity'/></td>
                        <td><input type="text" id="new_bug_priority" placeholder='Priority'/></td>
                        <td><input type="text" id="new_bug_description" placeholder='Description'/></td>
                        <td><input type="text" id="new_last_commit" placeholder='Commit'/></td>
                        <td><input type="text" id="new_project_id" placeholder='Project Id'/></td>
                        <td><input type="text" id="new_asignee" placeholder='Asignee'/></td>
                        <td><input type="text" id="new_reporter" placeholder='Reporter'/></td>
                        <td colSpan={2} style={{'textAlign': 'center'}}><input type="button" className="btn btn-dark" onClick={this.addRow} value="Add Row"/></td>
                    </tr>
                    <tr className='pagination' key={9999}>
                        <td style={{display: this.isFirstPage() ? "none" : "initial"}} className='btn-dark' onClick={this.changePage}>Prev</td>
                        {this.state.pages}
                        <td style={{display: this.isLastPage() ? "none" : "initial"}} className='btn-dark' onClick={this.changePage}>Next</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}

export default BugsPage;