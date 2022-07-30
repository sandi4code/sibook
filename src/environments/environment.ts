// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD0d1kygluzSMO__PWPvfGhoZbg9fFCtv8',
    authDomain: 'sinursa-sibook.firebaseapp.com',
    projectId: 'sinursa-sibook',
    storageBucket: 'sinursa-sibook.appspot.com',
    messagingSenderId: '264315181897',
    appId: '1:264315181897:web:1b5d7d3df739e5094f5898',
    measurementId: 'G-JWMZDYP4J6'
  }
};

export const API_URL = 'http://localhost:1001/v1/';
export const TOKEN_KEY = 'zvt9821j21jd';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
