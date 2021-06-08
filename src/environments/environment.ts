// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import firebase from "firebase";

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyCE3XBaecbJAnyEt4wQMlQG-5NV57duYz4",
  authDomain: "kanban-project-5f5b8.firebaseapp.com",
  projectId: "kanban-project-5f5b8",
  storageBucket: "kanban-project-5f5b8.appspot.com",
  messagingSenderId: "1012642303879",
  appId: "1:1012642303879:web:e12ba3cd4f3f6b4305cd22",
  measurementId: "G-6388DJZMSK"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
