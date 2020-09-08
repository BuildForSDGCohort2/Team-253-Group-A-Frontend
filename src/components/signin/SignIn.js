import React from 'react';
import {SuspenseWithPerf} from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Loading from '../Loading';

const EmailSignIngnIn = React.lazy(() => import('./EmailSignIn'));
const SocialSignInUP = React.lazy(() => import('./SocialSignInUp'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));


export default function SignIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <SuspenseWithPerf fallback={<Loading />}
          traceId={'load-signin-views-status'}>
          <Container maxWidth="sm">
              <EmailSignIngnIn />
              <SocialSignInUP />
          </Container>
        </SuspenseWithPerf>
    </div>
  );
}