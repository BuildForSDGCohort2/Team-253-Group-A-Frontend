import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import {
  useFirebaseApp,
  preloadUser,
  preloadAuth,
  preloadFirestore,
  preloadDatabase,
  preloadStorage,
  SuspenseWithPerf,
  preloadAnalytics,
} from 'reactfire';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import Loading from '../Loading';
import Header from '../Header';
import Footer from '../Footer';

const Home = React.lazy(() => import('../Home'));
const SignIn = React.lazy(() => import('../signin/SignIn'));
const Register = React.lazy(() => import('../signup/Register'));
const About = React.lazy(() => import('../About'));
const GenericNotFound = React.lazy(() => import('../404'));
const PageViewLogger = React.lazy(() => import('../PageViewLogger'));
const Dashboard = React.lazy(() => import('../dashboard/Dashboard'));

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  mainContainer: {
    display: "flex",
    minHeight: '100vh',
    flexDirection: "column",
  },
}));


const preloadSDKs = firebaseApp => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence();
      }
    }),
    preloadDatabase({ firebaseApp }),
    preloadStorage({
      firebaseApp,
      setup(storage) {
        return storage().setMaxUploadRetryTime(10000);
      }
    }),
    preloadAuth({ firebaseApp }),
    preloadAnalytics({ firebaseApp }),
  ]);
};

const preloadData = async firebaseApp => {
  const user = await preloadUser(firebaseApp);
  if(user) console.log("user is auhed")
};

function App() {
  const firebaseApp = useFirebaseApp();
  const classes = useStyles();

  preloadSDKs(firebaseApp).then(preloadData(firebaseApp));
  
  return (
    <React.Fragment>
      <Header />
      <div className={classes.offset} />
      <Container className={classes.mainContainer}>
      <SuspenseWithPerf fallback={<Loading />}
        traceId={'load-views-status'}>
        <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/signin" exact component={SignIn} />
              <Route path="/register" exact component={Register} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="*" exact={true} component={GenericNotFound} />
        </Switch>
        <PageViewLogger />
      </SuspenseWithPerf>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
