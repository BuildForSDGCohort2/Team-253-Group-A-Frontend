/* import firebase from 'firebase/app' */
import React, { Suspense } from 'react';
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
} from 'reactfire';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '../Header';
import Footer from '../Footer';

const Home = React.lazy(() => import('../Home'));
const SignIn = React.lazy(() => import('../SignIn'));
const Register = React.lazy(() => import('../Register'));
const About = React.lazy(() => import('../About'));
const GenericNotFound = React.lazy(() => import('../404'));

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  mainContainer: {
    display: "flex",
    minHeight: '100vh',
    flexDirection: "column",
  },
}));


// Our components will lazy load the
// SDKs to decrease their bundle size.
// Since we know that, we can start
// fetching them now
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
    
  ]);
};

const preloadData = async firebaseApp => {
  const user = await preloadUser(firebaseApp);
  if(user) console.log("user is auhed")
};

function App() {
  const firebaseApp = useFirebaseApp();
  const classes = useStyles();

  // Kick off fetches for SDKs and data that
  // we know our components will eventually need.
  //
  // This is OPTIONAL but encouraged as part of the render-as-you-fetch pattern
  // https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense
  preloadSDKs(firebaseApp).then(preloadData(firebaseApp));
  
  return (
    <React.Fragment>
      <Header />
      <div className={classes.offset} />
      <Container className={classes.mainContainer}>
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/signin" exact component={SignIn} />
              <Route path="/register" exact component={Register} />
              <Route path="*" exact={true} component={GenericNotFound} />
        </Switch>
      </Suspense>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;
