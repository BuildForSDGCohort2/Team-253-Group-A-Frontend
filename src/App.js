import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap'

import Login from "./components/login-component";
import SignUp from './components/signup-component';
import Home from './components/home';
import Logout from './components/logout';
import Landing from './components/landing-page';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: {} }
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState( {user: null })
      }
    })
  }

  logout() {
    fire.auth().signOut();
    console.log('Logged out!')
  }
  
  render() {    
    return (
      <Router>
        <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">CleanOut App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              </Nav>
              <Nav>
                <Nav.Link href="/sign-in">Login</Nav.Link>
                <Nav.Link href="/sign-out" onClick={this.logout}>Logout</Nav.Link>
                <Nav.Link eventKey={2} href="/sign-up">
                  Sign up
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="auth-wrapper">
            <div className="auth-inner">              
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route
                  path="/sign-in" 
                  render={() => (this.state.user ? 
                    <Redirect to='/home' /> : 
                    <Login />)} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/home" component={Home} />
                <Route exact path="/sign-out" component={Logout} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
