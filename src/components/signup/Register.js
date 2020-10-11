import React from "react";
import { Redirect } from "react-router-dom";
import { useUser, SuspenseWithPerf } from "reactfire";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Loading from "../Loading";

const EmailSignUp = React.lazy(() => import("./EmailSignUp"));
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  subTitle: {
    textAlign: "center",
  },
}));

export default function Register() {
  const classes = useStyles();
  const user = useUser();

  return (
    <div className={classes.root}>
      <SuspenseWithPerf
        fallback={<Loading />}
        traceId={"load-register-views-status"}
      >
        {!user && (
          <Container maxWidth="sm">
            <EmailSignUp />
          </Container>
        )}

        {user && <Redirect to="/dashboard" />}
      </SuspenseWithPerf>
    </div>
  );
}
