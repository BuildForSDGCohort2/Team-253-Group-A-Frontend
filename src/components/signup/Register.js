import React from 'react';
import {SuspenseWithPerf} from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Loading from '../Loading';

const EmailSignUp = React.lazy(() => import('./EmailSignUp'));
const SocialSignInUP = React.lazy(() => import('../signin/SocialSignInUp'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  subTitle: {
    textAlign: "center",
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
              <Typography variant="h6"  className={classes.subTitle} gutterBottom>
                    Or
                </Typography>
              <SocialSignInUP  signText="up"/>
          </Container>
        </SuspenseWithPerf>
    </div>
  );
}