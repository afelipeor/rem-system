import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalProvider';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalProvider>
                <Routes>
                    <Route
                        path="/*"
                        element={<App />}
                    />
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    </React.StrictMode>
);
