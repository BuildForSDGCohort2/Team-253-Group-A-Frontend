import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Container } from "@material-ui/core";
import { Route } from "react-router";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";

const breadcrumbNameMap = {
  "/spots": "Spots",
  "/spots/view": "View",
  "/events": "Events",
  "/covid": "Covid-19",
  "/about": "About us",
  "/profile": "Profile",
  "/contact-us": "Contact us",
  "/terms-of-services": "Terms of services",
  "/privacy-policy": "Privacy policy",
  "/dashboard": "Dashboard",
  "/dashboard/spots": "Spots",
  "/dashboard/spots/create": "New Spot",
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f1f1f1",
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function SubHeader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split("/").filter((x) => x);

            return (
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/" className={classes.link}>
                  <HomeIcon className={classes.icon} />
                  Home
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {breadcrumbNameMap[to]}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {breadcrumbNameMap[to]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
      </Container>
    </div>
  );
}
