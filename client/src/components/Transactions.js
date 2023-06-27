import React, { useContext, useEffect, useState } from 'react'
import ExpenseContext from '../context/ExpenseContext'
import ModalContext from '../context/ModalContext'

const {format} = require('date-fns');

const Transactions = () => {
  
  const {category} = useContext(ModalContext);

  const { deleteExpense, getExpenseId } = useContext(ExpenseContext)

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getRecords = getExpenseId(category)
    setExpenses(getRecords)

    // eslint-disable-next-line
  },[category])

  const totalExpense = () => {
    return expenses.reduce((total, ex) => total + parseInt(ex.amount), 0);
  }

  const deleteExpenseView = (expense) => {
    deleteExpense(expense);
    const getRecords = getExpenseId(category)
    setExpenses(getRecords)
  }

  return (
    <>
      {expenses.length > 0 ?
        <>
          <div className='transaction-list'>
            <h2> {category} - Transactions list </h2>
            <ul className="expense-list">
              <li className='heading'>Date</li>
              <li className='heading'>Name</li>
              <li className='heading'>Price</li>
            {expenses.map( (exp, index) => (
              <>
                <li key={exp.createdAt + index}>{ exp.createdAt ? format(new Date(exp.createdAt), 'yyyy/MM/dd' ) : ''}</li>
                <li key={exp.name + index}>{exp.name}</li>
                <li key={index} className='expense-list-row'>
                  <span>{exp.amount}</span> 
                  <button onClick = {() => deleteExpenseView(exp)}>x</button>
                </li>
              </>
              )
            )}
            
              
            <li></li>
            <li>TOTAL</li>
            <li>{totalExpense()}</li> 

            </ul>
          </div>
        </>
        : <div className='not-found'>No Records!</div>
      }
    </>
  ) 
}

export default Transactions