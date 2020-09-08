import React from 'react';
import {SuspenseWithPerf} from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Loading from '../Loading';

const EmailSignUp = React.lazy(() => import('./EmailSignUp'));
const SocialSignInUP = React.lazy(() => import('../signin/SocialSignInUp'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));


export default function Register() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <SuspenseWithPerf fallback={<Loading />}
          traceId={'load-signin-views-status'}>
          <Container maxWidth="sm">
              <EmailSignUp />
              <SocialSignInUP />
          </Container>
        </SuspenseWithPerf>
    </div>
  );
}