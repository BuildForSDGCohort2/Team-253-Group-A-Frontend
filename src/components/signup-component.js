import React, { Component } from "react";
import fire from "../config/fire";

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {   
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
    this.signup = this.signup.bind(this);
  }
  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
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
      <form>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>First name</label>
          <input 
            type="text"
            className="form-control"
            name="firstname"
            placeholder="First name"
            onChange={this.handleChange}
            defaultValue={this.state.firstname} />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            placeholder="Last name"
            onChange={this.handleChange}
            defaultValue={this.state.lastname} />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            onChange={this.handleChange}
            defaultValue={this.state.email} />
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
        <button type="submit" className="btn btn-primary btn-block" onClick={this.signup}>Sign Up</button>
        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>
      </form>
    );
  }
}