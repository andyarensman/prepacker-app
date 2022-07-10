import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClosetContextProvider } from './context/ClosetContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClosetContextProvider>
      <App />
    </ClosetContextProvider>
  </React.StrictMode>
);

