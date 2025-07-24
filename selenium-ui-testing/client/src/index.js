import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TestResultsProvider } from './context/TestResultsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TestResultsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TestResultsProvider>
)