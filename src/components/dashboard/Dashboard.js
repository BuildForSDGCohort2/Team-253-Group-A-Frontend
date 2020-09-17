import React from "react";
import { Redirect } from "react-router-dom";
import { AuthCheck, SuspenseWithPerf } from "reactfire";
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

const AddTrashReport = React.lazy(() => import("../trash-report/AddReport"));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  extendedFab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  let { path, url } = useRouteMatch();

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
            <Route exact path={path}>
              <Fab
                variant="extended"
                color="secondary"
                component={LinkRouter}
                to={`${url}/spots/create`}
                className={classes.extendedFab}
              >
                <PostAddIcon className={classes.extendedIcon} />
                New Report
              </Fab>
            </Route>
          </Switch>
        </AuthCheck>
      </SuspenseWithPerf>
    </div>
  );
}
