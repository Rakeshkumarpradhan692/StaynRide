// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router';
// import { Auth0Provider } from '@auth0/auth0-react';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Auth0Provider
//     domain="dev-wijyul1hk1fq6s88.us.auth0.com"
//     clientId="JGxDjGmRsxNBW0i2X3n7ch3RpelBkho1"
//     authorizationParams={{
//       redirect_uri: window.location.origin
//     }}
//   >
//     <App />
//   </Auth0Provider>,
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./context/authContext";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// const domain = "YOUR_AUTH0_DOMAIN"; // e.g. dev-abc123.us.auth0.com
// const clientId = "YOUR_CLIENT_ID";
// const audience = "https://your-api-name";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
