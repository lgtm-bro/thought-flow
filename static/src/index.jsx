import React, {useRef} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import Login from './Login.jsx';

const root = document.getElementById('root');
const app = createRoot(root);


app.render( <App /> );