import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from './App'
// import BudgetFrom from '../components/BudgetFrom'
// import ExpenseForm from '../components/ExpenseForm'
// import ExpenseTracker from '../components/ExpenseTracker'

const GlobalRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/" />
         <Route path="/income" element={<BudgetFrom />} />
        <Route path="/expense" element={<ExpenseForm/> } /> */}
      </Routes>
    </>
  )
}

export default GlobalRoutes