import axios from 'axios';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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
            totalNumberOfPages: 0
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
                elements.push(<Dropdown.Item href={"#/action-" + i} onClick={this.renderTable}>{res.data[i].name}</Dropdown.Item>);
            }
            this.setState({
                projectsName: elements
            })
        });
    }

    renderTable = () => {
        axios.get('http://localhost:3001/api/bugs',
        { headers: { 
            'Content-Type': 'application/json'
            }}
        ).then(res => {
            console.log(res.data);
            this.setState({
                table:  res.data.map((bug, index) => {
                    const {id, severity, priority, description, commit, name, asignee, reporter} = bug;
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{severity}</td>
                            <td>{priority}</td>
                            <td>{description}</td>
                            <td>{commit}</td>
                            <td>{name}</td>
                            <td>{asignee}</td>
                            <td>{reporter}</td>
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

    render() {
        return <div>
            <Dropdown className='select-project'>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Projects list
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {this.state.projectsName}
                </Dropdown.Menu>
            </Dropdown>
            <table className='table projects-table table-sm'>
                <thead className='thead-dark' style={{display: "none"}}>
                    <tr key={9997}>
                        <td>Project Id</td>
                        <td>Project Name</td>
                        <td>Owner</td>
                        <td>GIT Repo</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                {this.state.tbody}
            </table>
        </div>;
    }
}

export default BugsPage;