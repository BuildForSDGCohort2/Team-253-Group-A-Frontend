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

import PostAddIcon from "@material-ui/icons/PostAdd";
import Fab from "@material-ui/core/Fab";
import Tabs from "@material-ui/core/Tabs";
import { Grid } from "@material-ui/core";

import DashboardTabPanel from "./DashboardTabPanel";
import { DashboardTab } from "./DashboardTab";

import Loading from "../Loading";

const AddTrashReport = React.lazy(() => import("../trash-report/AddReport"));
const TrashReportList = React.lazy(() =>
  import("../trash-report/TrashReportList")
);

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
    textTransform: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
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
                  <Tabs
                    variant="scrollable"
                    value={value}
                    indicatorColor="secondary"
                    onChange={handleChange}
                    aria-label="Dashboard tabs"
                    className={classes.tabs}
                  >
                    <DashboardTab label="Your spots" {...a11yProps(0)} />
                    <DashboardTab label="Your events" {...a11yProps(1)} />
                    <DashboardTab label="Your account" {...a11yProps(2)} />
                  </Tabs>
                </Grid>
                <Grid item xs={12}>
                  <Fab
                    variant="extended"
                    color="primary"
                    component={LinkRouter}
                    size="small"
                    to={`${url}/spots/create`}
                  >
                    <PostAddIcon className={classes.extendedIcon} />
                    New Spot
                  </Fab>
                </Grid>
                <Grid item xs={12}>
                  <DashboardTabPanel value={value} index={0}>
                    test
                    <TrashReportList uid={user.uid} />
                  </DashboardTabPanel>
                  <DashboardTabPanel value={value} index={1}>
                    Comming soon...
                  </DashboardTabPanel>
                  <DashboardTabPanel value={value} index={2}>
                    account
                  </DashboardTabPanel>
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
