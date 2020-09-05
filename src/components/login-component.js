import React, { Component } from "react";
import fire from "../config/fire";
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  login = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
        console.log('Login success');
      }).catch((err) => {
        console.log(err);
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    }) 
  }

	render() {
		return (
      <>
        <form>
          <h3>Sign In</h3>          
          <div className="form-group">
            <label>Email address</label>
            <input 
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              defaulValue={this.state.email} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              onChange={this.handleChange}
              defaultValue={this.state.password} />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>Submit</button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
      </form>
    </>
		);
	}
}