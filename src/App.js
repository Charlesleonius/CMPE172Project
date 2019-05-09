import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import Map from './components/pages/Map';
import Edit from './components/pages/Edit';
import Search2 from './components/pages/Search2';
import NewEmployee from './components/pages/NewEmployee';
import Titles from './components/pages/Titles';
import Profile from './components/pages/Profile';
import EmployeesList from './components/pages/EmployeesList';
import Search from './components/pages/Search';
import Settings from './components/pages/settings';
import Portal from './components/pages/Portal';
import "./App.css"
import Login from './components/auth/login';


function onAuthRequired({ history }) {
    history.push('/login');
}
class App extends Component {
    render() {
        return (
            <Router>
                <Security
                    issuer="https://dev-614540.okta.com/oauth2/default"
                    client_id="0oakfst9qaSL2Vrx6356"
                    redirect_uri={window.location.origin + "/implicit/callback"}
                    onAuthRequired={onAuthRequired}
                >
                    <div className="App">
                        <Navbar/>
                        <div className="container">
                            <Route path="/" exact={true} component={Home} />
                            <SecureRoute path="/Profile" exact={true} component={Profile} />
                            <SecureRoute path="/Admin" exact={true} component={Admin} />
                            <SecureRoute path="/Settings" exact={true} component={Settings} />
                            <SecureRoute path="/Portal" exact={true} component={Portal} />
                            <SecureRoute path="/Search" exact={true} component={Search} />
                            <SecureRoute path="/EmployeesList" exact={true} component={EmployeesList} />
                            <SecureRoute path="/Edit/:id" exact={true} component={Edit} />
                            <SecureRoute path="/NewEmployee" exact={true} component={NewEmployee} />
                            <SecureRoute path="/Map" exact={true} component={Map} />
                            <SecureRoute path="/Search2" exact={true} component={Search2} />
                            <SecureRoute path="/Titles" exact={true} component={Titles} />
                            <Route
                                path="/login"
                                render={() => <Login baseUrl="https://dev-614540.okta.com" />}
                            />
                            <Route path="/implicit/callback" component={ImplicitCallback} />
                        </div>
                    </div>
                </Security>
            </Router>
        );
    }
}

export default App;
