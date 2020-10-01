import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#ffffff",
    paddingTop: theme.spacing(4),
  },
  subTitle: {
    paddingLeft: theme.spacing(2),
  },
  primary: {
    color: grey[800],
  },
  copyright: {
    fontSize: 12,
    color: grey[700],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item md={5} xs={12}>
              <Typography variant="h6" gutterBottom>
                CleanOut
              </Typography>
            </Grid>

            <Grid item md={3} xs={6}>
              <Typography
                variant="subtitle1"
                className={classes.subTitle}
                gutterBottom
              >
                Legal
              </Typography>

              <List component="nav" dense>
                <ListItem button component={LinkRouter} to="/terms-of-services">
                  <ListItemText
                    className={classes.primary}
                    primary="Terms of service"
                  />
                </ListItem>
                <ListItem button component={LinkRouter} to="/privacy-policy">
                  <ListItemText
                    className={classes.primary}
                    primary="Privacy policy"
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item md={2} xs={6}>
              <Typography
                variant="subtitle1"
                className={classes.subTitle}
                gutterBottom
              >
                Social
              </Typography>

              <List component="nav" dense>
                <ListItem button>
                  <ListItemText className={classes.primary} primary="Twitter" />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    className={classes.primary}
                    primary="Facebook"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText className={classes.primary} primary="Github" />
                </ListItem>
              </List>
            </Grid>

            <Grid item md={2} xs={6}>
              <Typography
                variant="subtitle1"
                className={classes.subTitle}
                gutterBottom
              >
                Project
              </Typography>

              <List component="nav" dense>
                <ListItem button component={LinkRouter} to="/about">
                  <ListItemText
                    className={classes.primary}
                    primary="About us"
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    className={classes.primary}
                    primary="Contact us"
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body1"
                className={classes.copyright}
                gutterBottom
              >
                © CleanOut 2020. Made with love from Africa!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
