import React from 'react';
import { Provider } from 'react-redux';

import './index.sass';
import * as serviceWorker from './serviceWorker';
import CreateStore from './store';
import Routes from './config/Routes';
import * as ReactDOMClient from 'react-dom/client';

const store = CreateStore();
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }

if('serviceWorker' in navigator) { 
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
.then(function(registration) {
 console.log("Service Worker Registered");
// messaging.useServiceWorker(registration);  
  }); 
  }
// @ts-ignore
const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Routes />
    </Provider>
);
serviceWorker.unregister();
