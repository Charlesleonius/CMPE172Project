import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = props => (
    <tr>
        <td>{props.employee.employees_Name}</td>
        <td>{props.employee.employees_Email}</td>
        <td>{props.employee.employees_ID}</td>
        <td>{props.employee.employees_Manager}</td>
        <td>{props.employee.employees_Team}</td>
        <td>{props.employee.employees_Status}</td>
        <td style={{ backgroundColor: "#353f48", textAlign: "center" }}>
            <Link to={"/edit/" + props.employee._id} style={{ color: "white" }}>Edit</Link>
        </td>
    </tr>
)

export default class EmployeesList extends Component {

    constructor(props) {
        super(props);
        this.state = { employees: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/employees')
            .then(response => {
                console.log(response.data)
                this.setState({ employees: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/employees')
            .then(response => {
                this.setState({ employees: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    employeesList() {
        var test = this.state.employees.map(function (currentEmployee, i) {
            return <Employee employee={currentEmployee} key={i} />;
        });
        console.log(test);
        return test
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
                            <th>Employee Status</th>
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