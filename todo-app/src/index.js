import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBgDvdj1DUsZF5KIhqdXupS8gMX3VAZFl8",
  authDomain: "todo-react-71af5.firebaseapp.com",
  projectId: "todo-react-71af5",
  storageBucket: "todo-react-71af5.appspot.com",
  messagingSenderId: "537767494661",
  appId: "1:537767494661:web:bc676c7b1ca4234133486c",
  measurementId: "G-93BN7H9X42",
  databaseURL: "https://todo-react-71af5-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database ;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
