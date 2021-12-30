// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_SECURITY: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apisecurity/api/',
  URL_PROFILE: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apiprofile/api/',
  URL_VALIDATE_EMPLOYEE: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apiprofile/',
  URL_CONTENT: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apicontent/api/',
  URL_REFERAL: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apireferral/api/',
  URL_COMISSION: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apicommission/api/',
  URL_REPORTS: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apireport/api/',
  URL_MASTER: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apimasterdata/api/',
  URL_EXTERNAL: 'https://apitestexito.azure-api.net/Dllo-clickam-md-apiexternal/api/',
  PDF: 'https://webclickamdev.blob.core.windows.net/clickacademy/pdf/',
  SUBSCRIPTION: 'f5edbcd2315e479aad33d80c58052fcc',

  // URL_SECURITY: 'https://apitestexito.azure-api.net/QA-clickam-md-apisecurity/api/',
  // URL_PROFILE: 'https://apitestexito.azure-api.net/QA-clickam-md-apiprofile/api/',
  // URL_VALIDATE_EMPLOYEE: 'https://apitestexito.azure-api.net/QA-clickam-md-apiprofile/',
  // URL_CONTENT: 'https://apitestexito.azure-api.net/QA-clickam-md-apicontent/api/',
  // URL_REFERAL: 'https://apitestexito.azure-api.net/QA-clickam-md-apireferral/api/',
  // URL_COMISSION: 'https://apitestexito.azure-api.net/QA-clickam-md-apicommission/api/',
  // URL_REPORTS: 'https://apitestexito.azure-api.net/QA-clickam-md-apireport/api/',
  // URL_MASTER: 'https://apitestexito.azure-api.net/QA-clickam-md-apimasterdata/api/',
  // PDF: 'https://webclickamdev.blob.core.windows.net/clickacademy/pdf/',
  // URL_EXTERNAL: 'https://apitestexito.azure-api.net/QA-clickam-md-apiexternal/api/',
  // SUBSCRIPTION: 'f5edbcd2315e479aad33d80c58052fcc',

  firebaseConfig: {
    apiKey: 'AIzaSyDi89VEe3hUKkOxIoGyd4RUz_lv_9oazrc',
    authDomain: 'app-clickam-dev-278016.firebaseapp.com',
    databaseURL: 'https://app-clickam-dev-278016.firebaseio.com',
    projectId: 'app-clickam-dev-278016',
    storageBucket: 'app-clickam-dev-278016.appspot.com',
    messagingSenderId: '158450297764',
    appId: '1:158450297764:web:0ab01b0d9b7f175aa26f31',
  },


  idsBussinesWidget: [
    {
      id: 1,
      code: 'exito_widget',
      url: 'https://www.exito.com',
    },
    {
      id: 3,
      code: 'segurosexito_widget',
      url: 'https://www.segurosexito.com',
    },
    {
      id: 2,
      code: 'carulla_widget',
      url: 'https://www.carulla.com',
    },
    {
      id: 14,
      code: 'movilexito_widget',
      url: 'https://www.movilexito.com',
    },
    {
      id: 4,
      code: 'viajesexito_widget',
      url: 'https://www.viajesexito.com',
    },
    {
      id: 24,
      code: 'beautyholics_widget',
      url: 'https://www.beautyholics.com',
    },
    {
      id: 20,
      code: 'haceb_widget',
      url: 'https://www.haceb.com',
    },
    {
      id: 46,
      code: 'habi_widget',
      url: 'https://habi.co',
    },
     {
      id: 5,
      code: 'wesura_widget',
      url: 'https://www.wesura.com',
    },
    {
      id: 25,
      code: 'anutibara_widget',
      url: 'https://anutibara.com',
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
