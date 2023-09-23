import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'; // Import persistStore and persistReducer
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

import storage from 'redux-persist/lib/storage';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import './assets/css/custom.css';
import loginReducer from './store/reducers/login';
import { BrowserRouter } from 'react-router-dom';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  login: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a persisted reducer

const myStore = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});

const persistor = persistStore(myStore); // Create the persistor

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={myStore}>
    <PersistGate loading={null} persistor={persistor}>
     
        <App />
     
    </PersistGate>
  </Provider>
);


reportWebVitals();











// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import Meeting from './meeting';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// let payload = {

//   meetingNumber: 4458295102,
//   sdkKey: "NnIttE3LhVlyHlR3j2siLjOpwVwi2P9UMRhV",
//   sdkSecret: "RYswGyCAzniI16OVC6Dtn41i7iiuw6owGz5Q",
//   // sdkKey: "IXCD5Ye4YUnbjeBpQoLLW6pQeD1LSuSciVsI",
//   // sdkSecret: "JDdvofaaXbWgsBU9R0evYnoplj9eX23NAg5S",
//   role: 0,
//   leaveUrl: "http://localhost:3000",
//   userName: "Rohit tn developer",
//   passWord: "733215",
//   userEmail: "",

//   // 4458295102

//   // 733215

// }
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />
//   }, {

//     path: '/meeting',
//     element: <Meeting payload={payload} />
//   }
// ])

// root.render(
//   <RouterProvider router={router}></RouterProvider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
