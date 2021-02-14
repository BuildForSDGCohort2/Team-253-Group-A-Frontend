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

import * as APP_ROUTES from "../../constants/routes";

import Loading from "../Loading";

import PostAddIcon from "@material-ui/icons/PostAdd";
import Button from "@material-ui/core/Button";
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
    marginLeft: "auto",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  const { data: user } = useUser();

  let { path } = useRouteMatch();

  const [value, setValue] = React.useState(0);

  if (user == null) {
    return <Redirect to={APP_ROUTES.SIGN_IN} />;
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
        <AuthCheck fallback={<Redirect to={APP_ROUTES.SIGN_IN} />}>
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
              to={APP_ROUTES.DASHBOARD_SPOTS}
            />
            <DashboardTab
              label="Your events"
              component={LinkRouter}
              to={APP_ROUTES.DASHBOARD_EVENTS}
            />
            <DashboardTab
              label="Your account"
              component={LinkRouter}
              to={APP_ROUTES.DASHBOARD_ACCOUNT}
            />
          </Tabs>
          <Switch>
            <Route path={APP_ROUTES.DASHBOARD_SPOTS_CREATE}>
              <AddTrashReport />
            </Route>
            <Route exact path={APP_ROUTES.DASHBOARD_SPOTS}>
              <DashboardTabPanel value={value} index={0}>
                <Grid container spacing={2}>
                  <Grid item container xs={12} direction="row-reverse">
                    <Button
                      color="secondary"
                      component={LinkRouter}
                      size="small"
                      to={APP_ROUTES.DASHBOARD_SPOTS_CREATE}
                      startIcon={<PostAddIcon />}
                    >
                      New Spot
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TrashReportList uid={user.uid} />
                  </Grid>
                </Grid>
              </DashboardTabPanel>
            </Route>

            <Route exact path={APP_ROUTES.DASHBOARD_EVENTS}>
              <DashboardTabPanel value={value} index={1}>
                Comming soon...
              </DashboardTabPanel>
            </Route>
            <Route path={APP_ROUTES.DASHBOARD_ACCOUNT}>
              <DashboardTabPanel value={value} index={2}>
                <Account />
              </DashboardTabPanel>
            </Route>

            <Route path={path}>
              <Redirect to={APP_ROUTES.DASHBOARD_SPOTS} />
            </Route>
          </Switch>
        </AuthCheck>
      </SuspenseWithPerf>
    </div>
  );
}
