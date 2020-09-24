import React from "react";
import { Redirect } from "react-router-dom";
import { AuthCheck, SuspenseWithPerf } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Loading from "../Loading";

const EmailSignIn = React.lazy(() => import("./EmailSignIn"));

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  subTitle: {
    textAlign: "center",
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SuspenseWithPerf
        fallback={<Loading />}
        traceId={"load-signin-views-status"}
      >
        <AuthCheck
          fallback={
            <Container maxWidth="sm">
              <EmailSignIn />
            </Container>
          }
        >
          <Redirect to="/dashboard" />
        </AuthCheck>
      </SuspenseWithPerf>
    </div>
  );
}
