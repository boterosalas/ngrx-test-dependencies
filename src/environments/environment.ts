// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_SECURITY: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apisecurity/api/',
  URL_PROFILE: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apiprofile/api/',
  // URL_PROFILE: 'http://10.125.65.230/profile/api/',
  URL_VALIDATE_EMPLOYEE: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apiprofile/',
  URL_CONTENT: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apicontent/api/',
  // URL_CONTENT: 'http://10.125.65.230/content/api/',
  // URL_CONTENT: 'https://apimexito.azure-api.net/PD-clickam-md-apicontent/api/',
  URL_REFERAL: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apireferral/api/',
  URL_COMISSION: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apicommission/api/',
  // URL_COMISSION: ' http://10.125.65.230/commission/api/',
  URL_MASTER: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apimasterdata/api/',
  PDF: 'https://webclickamdev.blob.core.windows.net/clickacademy/pdf/',
  SUBSCRIPTION: 'f5edbcd2315e479aad33d80c58052fcc',
  // SUBSCRIPTION: 'e2d3328d254d4e52a11495b223f56e86'
  firebaseConfig: {
    apiKey: "AIzaSyCo8Iq_u0Q1Znya-Qt5r9HWB-SLSeIf4uw",
    authDomain: "notifications-6665e.firebaseapp.com",
    databaseURL: "https://notifications-6665e.firebaseio.com",
    projectId: "notifications-6665e",
    storageBucket: "notifications-6665e.appspot.com",
    messagingSenderId: "471373902459",
    appId: "1:471373902459:web:84cbd92b19b458300528de",
    measurementId: "G-SVL6VCELL4"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
