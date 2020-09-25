import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>About Us</h1>
      <p>
        <strong>CleanOut</strong> is a web App built by Team 253 Group A of BuildforSDG Challenge 2020, sponsored by Facebook and Andela.
        <br /><br />
        The App utilises the power of AI to detect trashes from pictures. Users are required to take a snapshot or video of a location, upload on it on the app. The app detects possible trashes on the image. The image and location is then forwarded to cleanup agencies.
      </p>
      <div className="members">
        <p className="about-grid-header"><b>Team Members</b></p>
        <div className="about-grid-container">
          <div className="about-grid-item">
            <img src="#" alt=""></img>
            <p>Chinonso</p>
          </div>
          <div className="about-grid-item">
            <img src="#" alt=""></img>
            <p>Sara</p>
          </div>
          <div className="about-grid-item">
            <img src="#" alt=""></img>
            <p>Hammami</p>
          </div>
          <div className="about-grid-item">
            <img src="#" alt=""></img>
            <p>Sofia</p>
          </div>
        </div>
      </div>
    </div>
  );
}