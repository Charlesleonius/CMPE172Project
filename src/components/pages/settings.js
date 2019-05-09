import React, { Component } from 'react';

class Staff extends Component {
    state = {
        currentUserName: "",
        currentUserEmail: ""
    };

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
        this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            currentUserName: idToken.idToken.claims.name
        });
    }

    render() {
        const { currentUserEmail, currentUserName } = this.state;
        return (
            <div>
                <h1>
                    <b>{currentUserName}</b>
                </h1>
                <p>
                    <b>Email: {currentUserEmail}</b>
                </p>
                <p>You have reached the authorized portal area of the portal</p>
            </div>
        );
    }
}

export default Staff;