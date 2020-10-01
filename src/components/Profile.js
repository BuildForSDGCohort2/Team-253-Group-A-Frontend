import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6} sm={3}>
          <Avatar
            src="https://avatars2.githubusercontent.com/u/46009285?s=460&v=4"
            component="div"
            className={classes.profilePicture}
          >
            OC
          </Avatar>
          <Typography
            align="center"
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            Ojoechem Chinonso
          </Typography>
          <Typography
            align="center"
            gutterBottom
            variant="caption"
            component="div"
          >
            Nigeria
          </Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Avatar
            src="https://avatars1.githubusercontent.com/u/297917?s=460&v=4"
            component="div"
            className={classes.profilePicture}
          >
            KH
          </Avatar>
          <Typography
            align="center"
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            Khalil Hammami
          </Typography>
          <Typography
            align="center"
            gutterBottom
            variant="caption"
            component="div"
          >
            Tunisia
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
