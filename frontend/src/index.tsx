import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './components/layout/layout/Layout';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
