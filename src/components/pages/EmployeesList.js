import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = props => (
    <tr>
        <td>{props.employee.firstName + " " + props.employee.lastName}</td>
        <td>{props.employee.email}</td>
        <td style={{textAlign: 'center'}}>{props.employee.id}</td>
        <td style={{textAlign: 'center'}}>{props.employee.managerId}</td>
        <td style={{textAlign: 'center'}}>{props.employee.departentNumber}</td>
        <td style={{ textAlign: "center", padding: 0 }}>
            <Link to={"/edit/" + props.employee._id} style={{ color: "white", width: "100%" }}>
                <button style={{width: "100%"}} className="btn btn-dark btn-lg">Edit</button>
            </Link>
        </td>
    </tr>
)

export default class EmployeesList extends Component {

    constructor(props) {
        super(props);
        this.state = { employees: [] };
    }

    componentDidMount() {
        let oktaTokenStorage = JSON.parse(window.localStorage.getItem("okta-token-storage"));
        let accessToken = oktaTokenStorage.accessToken.accessToken;
        if (!accessToken) {
            this.props.auth.logout("/");
            return
        }
        axios.get('http://localhost:8080/employees', {
            headers: {
                Authorization: 'Bearer ' + accessToken //the token is a variable which holds the token
            }
        }).then(response => {
            this.setState({ employees: response.data });
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentDidUpdate() {
        let oktaTokenStorage = JSON.parse(window.localStorage.getItem("okta-token-storage"));
        let accessToken = oktaTokenStorage.accessToken.accessToken;
        if (!accessToken) {
            this.props.auth.logout("/");
            return
        }
        axios.get('http://localhost:8080/employees', {
            headers: {
                Authorization: 'Bearer ' + accessToken //the token is a variable which holds the token
            }
        }).then(response => {
            this.setState({ employees: response.data });
        }).catch(function (error) {
            console.log(error);
        })
    }

    employeesList() {
        var employeeComponents = this.state.employees.map(function (currentEmployee, i) {
            return <Employee employee={currentEmployee} key={i} />;
        });
        return employeeComponents;
    }

    render() {
        return (
            <div>
                <h3>Employees List</h3>
                <Link className="nav-link" to="/Profile">
                    <button className="btn btn-dark btn-lg" style={{ float: 'right', marginBottom: 20 }}
                        onClick={this.addEmployee}>Add</button>
                </Link>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee Email</th>
                            <th>Employee ID</th>
                            <th>Employee Manager</th>
                            <th>Employee Team</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.employeesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}