import React from 'react';
import {SuspenseWithPerf} from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading'

const EmailSignIngnIn = React.lazy(() => import('./EmailSignIn'));
const SocialSignInUP = React.lazy(() => import('./SocialSignInUp'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));


export default function SignIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <SuspenseWithPerf fallback={<Loading />}
        traceId={'load-signin-views-status'}>
          <EmailSignIngnIn />
          <SocialSignInUP />
        </SuspenseWithPerf>
    </div>
  );
}