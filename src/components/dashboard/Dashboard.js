import React from "react";
import { Redirect } from "react-router-dom";
import { AuthCheck, SuspenseWithPerf, useUser } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Account from "../Account";

import {
  Link as LinkRouter,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import Loading from "../Loading";

import PostAddIcon from "@material-ui/icons/PostAdd";
import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

const AddTrashReport = React.lazy(() => import("../trash-report/AddReport"));
const TrashReportList = React.lazy(() =>
  import("../trash-report/TrashReportList")
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  extendedFab: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const user = useUser();

  let { path, url } = useRouteMatch();

  const [value, setValue] = React.useState(0);

  if (user == null) {
    return <Redirect to="/signin" />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <SuspenseWithPerf
        fallback={<Loading />}
        traceId={"load-dashboard-views-status"}
      >
        <AuthCheck fallback={<Redirect to="/signin" />}>
          <Switch>
            <Route path={`${path}/spots/create`}>
              <AddTrashReport />
            </Route>
            <Route path={`${path}/account`}>
              <Account />
            </Route>
            <Route exact path={`${path}/spots`}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Fab
                    variant="extended"
                    color="secondary"
                    component={LinkRouter}
                    size="small"
                    to={`${url}/spots/create`}
                  >
                    <PostAddIcon className={classes.extendedIcon} />
                    New Report
                  </Fab>
                </Grid>
                <Grid item sm={2}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Dashboard tabs"
                    className={classes.tabs}
                  >
                    <Tab label="Your spots" {...a11yProps(0)} />
                    <Tab label="Your events" {...a11yProps(1)} />
                    <Tab label="Your account" {...a11yProps(2)} />
                  </Tabs>
                </Grid>
                <Grid item sm={10}>
                  <TabPanel value={value} index={0}>
                    <TrashReportList uid={user.uid} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    events
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    account
                  </TabPanel>
                </Grid>
              </Grid>
            </Route>

            <Route path={path}>
              <Redirect to={`${path}/spots`} />
            </Route>
          </Switch>
        </AuthCheck>
      </SuspenseWithPerf>
    </div>
  );
}
