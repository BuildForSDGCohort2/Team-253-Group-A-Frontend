import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

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

import * as APP_ROUTES from "../../constants/routes";
import Loading from "../Loading";

const Header = React.lazy(() => import("../header/Header"));
const SubHeader = React.lazy(() => import("../header/SubHeader"));
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

const Profile = React.lazy(() => import("../Profile"));
const ContactUs = React.lazy(() => import("../ContactUs"));
const UpdateProfile = React.lazy(() => import("../UpdateProfile"));

const TrashReportView = React.lazy(() =>
  import("../trash-report/TrashReportView")
);

const TrashReportList = React.lazy(() =>
  import("../trash-report/TrashReportList")
);

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
        <div className={classes.offset} />
        <SubHeader />
      </SuspenseWithPerf>

      <Container className={classes.mainContainer} maxWidth="md">
        <SuspenseWithPerf fallback={<Loading />} traceId={"load-views-status"}>
          <Switch>
            <Route path={APP_ROUTES.INDEX} exact>
              <Redirect to={APP_ROUTES.SPOTS} />
            </Route>
            <Route path={APP_ROUTES.SPOTS} exact component={Home} />
            <Route
              path={APP_ROUTES.SPOTS_VIEW_ID}
              component={TrashReportView}
            />

            <Route path={APP_ROUTES.ABOUT} exact component={About} />
            <Route path={APP_ROUTES.SIGN_IN} exact component={SignIn} />
            <Route
              path={APP_ROUTES.RESET_PASSWORD}
              exact
              component={ResetPassword}
            />
            <Route path={APP_ROUTES.REGISTER} exact component={Register} />
            <Route path={APP_ROUTES.DASHBOARD} component={Dashboard} />
            <Route path="/updateprofile" component={UpdateProfile} />
            <Route path={APP_ROUTES.TERMS_SERVICE} component={Terms} />
            <Route path={APP_ROUTES.PRIVACY_POLICY} component={Privacy} />
            <Route path={APP_ROUTES.COVID}>
              <TrashReportList tagId="covid19" />
            </Route>
            <Route path={APP_ROUTES.PROFILE_ID} component={Profile} />
            <Route path={APP_ROUTES.CONTACT_US} component={ContactUs} />

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
