import './App.css';
import React from 'react'
import { ExpenseContextProvider } from './context/ExpenseContext';
import { BrowserRouter } from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  return (
    <ExpenseContextProvider>
        <BrowserRouter>
          <div className='container'>
            <ExpenseTracker/>
          </div>
        </BrowserRouter>
    </ExpenseContextProvider>
  );
}

export default App;
