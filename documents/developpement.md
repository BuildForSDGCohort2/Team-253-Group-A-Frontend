## Project environment Configuration

Copy & Rename `.env.template` to `.env`
Fill `.env` from firebase console and from Re-Captcha admin console.

DO NOT PUSH `.env` to Github (already ignored with `.gitignore`)

```javascript
REACT_APP_FIREBASE_APIKEY = "";
REACT_APP_FIREBASE_AUTHDOMAIN = "";
REACT_APP_FIREBASE_DATABASEURL = "";
REACT_APP_FIREBASE_PROJECTID = "";
REACT_APP_FIREBASE_STORAGEBUCKET = "";
REACT_APP_MESSAGINGSENDERID = "";
REACT_APP_CLIENTID = "";
REACT_APP_MEASUREMENTID = "";

REACT_APP_API_REMOTE_URL = "";
REACT_APP_API_LOCAL_URL = "";

REACT_APP_RECAPTCHA_CLIENT_KEY = "";
```

## Start API

Please check [the backend repository](https://github.com/BuildForSDGCohort2/Team-253-Group-A-Backend/tree/develop/ai_part/model_api) for more details on how to launch the API.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment

We're deploying our frontend on [Netlify](https://www.netlify.com/), you
may use other free services like heroku, Firebase & ...

Before deplyoing to your hosting service, make sure to declare build environment variables mentioned before. here how to do it on Netlify:
https://docs.netlify.com/configure-builds/environment-variables/#declare-variables

To deploy on Netlify please follow steps privided in this following detailed guide: https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/
