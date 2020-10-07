import React from "react";
import { Redirect } from "react-router-dom";
import { AuthCheck, SuspenseWithPerf, useUser } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link as LinkRouter,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import Loading from "../Loading";

import PostAddIcon from "@material-ui/icons/PostAdd";
import Fab from "@material-ui/core/Fab";
import Tabs from "@material-ui/core/Tabs";
import { Grid } from "@material-ui/core";

import DashboardTabPanel from "./DashboardTabPanel";
import { DashboardTab } from "./DashboardTab";

const Account = React.lazy(() => import("../Account"));
const AddTrashReport = React.lazy(() => import("../trash-report/AddReport"));
const TrashReportList = React.lazy(() =>
  import("../trash-report/TrashReportList")
);

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
          <Tabs
            variant="scrollable"
            value={value}
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="Dashboard tabs"
            className={classes.tabs}
          >
            <DashboardTab
              label="Your spots"
              component={LinkRouter}
              to={`${url}/spots`}
            />
            <DashboardTab
              label="Your events"
              component={LinkRouter}
              to={`${url}/events`}
            />
            <DashboardTab
              label="Your account"
              component={LinkRouter}
              to={`${url}/account`}
            />
          </Tabs>
          <Switch>
            <Route path={`${path}/spots/create`}>
              <AddTrashReport />
            </Route>
            <Route exact path={`${path}/spots`}>
              <DashboardTabPanel value={value} index={0}>
                <Grid container spacing={2}>
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
                    <TrashReportList uid={user.uid} />
                  </Grid>
                </Grid>
              </DashboardTabPanel>
            </Route>

            <Route exact path={`${path}/events`}>
              <DashboardTabPanel value={value} index={1}>
                Comming soon...
              </DashboardTabPanel>
            </Route>
            <Route path={`${path}/account`}>
              <DashboardTabPanel value={value} index={2}>
                <Account />
              </DashboardTabPanel>
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
