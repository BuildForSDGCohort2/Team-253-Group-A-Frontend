import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useAuth, useUser } from 'reactfire';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function UpdateProfile() {
  const classes = useStyles();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const auth = useAuth();
  const user = useUser();
  let splitDisplayName = user.displayName.split(" ");
  let userFirstName = splitDisplayName[0];
  let userLastName = splitDisplayName[1];
  let userEmail = user.email;

  const updateUserProfile = (event) => {
    event.preventDefault();

    let user = auth.currentUser;

    // Update displayname
    user.updateProfile({
      displayName: `${firstName} ${lastName}`,
    }).then(function() {
      console.log('displayName update successful');
    }).then(function(err) {
      console.log('Error updating displayName: ', err)
    })

    // Update emaill
    user.updateEmail(email).then(function() {
      console.log('Email update successful');
    }).catch(function(err) {
      console.log('Error updating email', err)
    });
    
    console.log(user.email);
  }

  

  return (
    <>
      <h1>Update your profile information</h1>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={updateUserProfile}>
        <div>
          <TextField 
            id="firstname" 
            name="firstName"
            label="First name:" 
            type="text"
            defaultValue={userFirstName}
            onChange={e => setFirstName(e.target.value)} />
          <TextField 
            id="lastname" 
            name="lastName"
            label="Last name"
            type="text" 
            defaultValue={userLastName}
            onChange={e => setLastName(e.target.value)} />
          <TextField 
            id="email"
            name="email"
            label="Email"
            type="email" 
            defaultValue={userEmail}
            onChange={e => setEmail(e.target.value)} />
          <TextField
            id="password"
            label="Password"
            type="password"
            defaultValue="" />
          <TextField
            id="confirmpassword"
            label="Confirm password"
            type="password"
            defaultValue="" />
          <Button type="submit" variant="contained" color="secondary">
            Update
          </Button>
        </div>      
      </form>
    </>
  );
}


export default UpdateProfile;