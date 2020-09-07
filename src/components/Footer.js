import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    background: "#ffffff",
    paddingTop: 32
  },
  subTitle: {
    paddingLeft: 16,
  },
  copyright: {
    fontSize: 12,
    color: "#555555"
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
              <Typography variant="h6">
              CleanOut
              </Typography>
            </Grid>

            <Grid item md={3} xs={6}>
              <Typography variant="subtitle1" className={classes.subTitle} gutterBottom>
              Legal
              </Typography>

              <List component="nav" dense>
                <ListItem button>
                  <ListItemText primary="Terms of services" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Privacy policy" />
                </ListItem>
              </List>
            </Grid>

            <Grid item md={2} xs={6}>
              <Typography variant="subtitle1" className={classes.subTitle} gutterBottom>
              Social
              </Typography>

              <List component="nav" dense>
                <ListItem button>
                  <ListItemText primary="Twitter" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Facebook" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Github" />
                </ListItem>
              </List>
            </Grid>

            <Grid item md={2} xs={6}>
              <Typography variant="subtitle1" className={classes.subTitle} gutterBottom>
              Project
              </Typography>

              <List component="nav" dense>
                <ListItem button>
                  <ListItemText primary="About us" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Contact us" />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}><Divider /></Grid>
            
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.copyright} gutterBottom>
                © CleanOut 2020. Made with love from Africa!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
  </React.Fragment>
  );
}