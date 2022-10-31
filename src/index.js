import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import './styles/user_ui.css'
import './styles/table.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ContextProvider } from './contexts/ContextProvider';
import ContextWrapper from './contexts/ContextWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextWrapper>
    <ContextProvider>
        <App />
    </ContextProvider>
    </ContextWrapper>
);
reportWebVitals();
