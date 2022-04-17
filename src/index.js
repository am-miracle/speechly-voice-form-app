import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
    <React.StrictMode>
    <SpeechProvider appId="c3e3c5db-f876-45ab-a062-b2161b5b1587" language='en-US'>
      <App />
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
