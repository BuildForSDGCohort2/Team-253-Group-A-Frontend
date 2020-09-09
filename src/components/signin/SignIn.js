import React from 'react';
import  { Redirect } from 'react-router-dom';
import {AuthCheck , SuspenseWithPerf} from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Loading from '../Loading';

const EmailSignIn = React.lazy(() => import('./EmailSignIn'));
const SocialSignInUP = React.lazy(() => import('./SocialSignInUp'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  subTitle: {
    textAlign: "center",
  }
}));


export default function SignIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <SuspenseWithPerf fallback={<Loading />}
          traceId={'load-signin-views-status'}>

          <AuthCheck fallback={
            <Container maxWidth="sm">
              <EmailSignIn />
              <Typography variant="h6"  className={classes.subTitle} gutterBottom>
                    Or
                </Typography>
              <SocialSignInUP signText="in"/>
            </Container>
          }>
          
            <Redirect to="/dashboard"/>
          </AuthCheck>
        </SuspenseWithPerf>
    </div>
  );
}