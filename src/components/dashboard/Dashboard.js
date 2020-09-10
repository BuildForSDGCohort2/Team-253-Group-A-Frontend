import React from 'react';
import  { Redirect } from 'react-router-dom';
import {AuthCheck , SuspenseWithPerf} from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';

import Loading from '../Loading';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));


export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <SuspenseWithPerf fallback={<Loading />}
          traceId={'load-dashboard-views-status'}>
          <AuthCheck fallback={<Redirect to="/signin"/>}>
            dashboard
          </AuthCheck>
        </SuspenseWithPerf>
    </div>
  );
}