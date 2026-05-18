import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';
import ReactGA from "react-ga4";

ReactGA.initialize("G-7CWHLYVZT4");

ReactDOM.render(<App/>, document.querySelector("#root"));