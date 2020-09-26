import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  useFirebaseApp,
  preloadUser,
  preloadAuth,
  preloadFirestore,
  preloadStorage,
  SuspenseWithPerf,
  preloadAnalytics,
} from "reactfire";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Loading from "../Loading";

const Header = React.lazy(() => import("../Header"));
const Footer = React.lazy(() => import("../Footer"));
const Home = React.lazy(() => import("../Home"));
const SignIn = React.lazy(() => import("../signin/SignIn"));
const Register = React.lazy(() => import("../signup/Register"));
const About = React.lazy(() => import("../About"));
const GenericNotFound = React.lazy(() => import("../404"));
const PageViewLogger = React.lazy(() => import("../PageViewLogger"));
const Dashboard = React.lazy(() => import("../dashboard/Dashboard"));
const Terms = React.lazy(() => import("../Terms"));
const Privacy = React.lazy(() => import("../Privacy"));
const ResetPassword = React.lazy(() => import("../signin/ResetPassword"));

// My code
const UpdateProfile = React.lazy(() => import("../UpdateProfile"));

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  mainContainer: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const preloadSDKs = (firebaseApp) => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        /* if (window.location.hostname === "localhost") {
          firestore().settings({
            host: "localhost:8080",
            ssl: false,
          });
        } */
        return firestore().enablePersistence({
          synchronizeTabs: true,
        });
      },
    }),
    preloadStorage({
      firebaseApp,
      setup(storage) {
        return storage().setMaxUploadRetryTime(10000);
      },
    }),
    preloadAuth({ firebaseApp }),
    preloadAnalytics({ firebaseApp }),
  ]);
};

const preloadData = async (firebaseApp) => {
  const user = await preloadUser(firebaseApp);
  if (user) console.log("user is auhed");
};

function App() {
  const firebaseApp = useFirebaseApp();
  const classes = useStyles();

  preloadSDKs(firebaseApp).then(preloadData(firebaseApp));

  return (
    <React.Fragment>
      <SuspenseWithPerf fallback={<Loading />} traceId={"load-header-status"}>
        <Header />
      </SuspenseWithPerf>
      <div className={classes.offset} />
      <Container className={classes.mainContainer} maxWidth="md">
        <SuspenseWithPerf fallback={<Loading />} traceId={"load-views-status"}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/reset-password" exact component={ResetPassword} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/updateprofile" component={UpdateProfile} />
            <Route path="/terms-of-services" component={Terms} />
            <Route path="/privacy-policy" component={Privacy} />
            <Route path="*" exact={true} component={GenericNotFound} />
          </Switch>
          <PageViewLogger />
        </SuspenseWithPerf>
      </Container>

      <SuspenseWithPerf fallback={<Loading />} traceId={"load-footer-status"}>
        <Footer />
      </SuspenseWithPerf>
    </React.Fragment>
  );
}

export default App;
