import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthCheck, SuspenseWithPerf } from "reactfire";

import * as APP_ROUTES from "../../constants/routes";
import NavigationDrawer from "../nav/NavigationDrawer";

const AccountMenu = React.lazy(() => import("../AccountMenu"));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function HeaderAuthButtons() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Button
        className={classes.headerButton}
        variant="outlined"
        color="secondary"
        component={LinkRouter}
        to={APP_ROUTES.SIGN_IN}
      >
        Log in
      </Button>
      <Button
        className={classes.headerButton}
        variant="contained"
        color="secondary"
        component={LinkRouter}
        to={APP_ROUTES.REGISTER}
      >
        Register
      </Button>
    </React.Fragment>
  );
}

export default function Header() {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            <Link
              component={LinkRouter}
              to={APP_ROUTES.INDEX}
              underline="none"
              color="secondary"
            >
              CleanOut
            </Link>
          </Typography>
          <Hidden smDown>
            <Button
              className={classes.headerButton}
              color="secondary"
              component={LinkRouter}
              to={APP_ROUTES.SPOTS}
            >
              Spots
            </Button>
            <Button
              className={classes.headerButton}
              color="secondary"
              component={LinkRouter}
              to={APP_ROUTES.EVENTS}
            >
              Events
            </Button>
            <Button
              className={classes.headerButton}
              color="secondary"
              component={LinkRouter}
              to={APP_ROUTES.COVID}
            >
              Covid-19
            </Button>
            <Button
              className={classes.headerButton}
              color="secondary"
              component={LinkRouter}
              to={APP_ROUTES.ABOUT}
            >
              About
            </Button>
          </Hidden>
          <SuspenseWithPerf
            fallback={<HeaderAuthButtons />}
            traceId={"load-account-menu-status"}
          >
            <AuthCheck fallback={<HeaderAuthButtons />}>
              <AccountMenu />
            </AuthCheck>
          </SuspenseWithPerf>
        </Toolbar>
      </AppBar>
      <NavigationDrawer open={openDrawer} closeHandler={handleDrawerClose} />
    </React.Fragment>
  );
}
