import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import { NODE_ENV } from "./constants/constApiUri";


/**
 * Подключение переменных из .env
 */

const StrictModeComponent = NODE_ENV === 'development' ? React.StrictMode : React.Fragment;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictModeComponent>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictModeComponent>
);
