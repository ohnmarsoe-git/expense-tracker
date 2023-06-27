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
              <li key={'heading1'} className='heading'>Date</li>
              <li key={'heading2'} className='heading'>Name</li>
              <li key={'heading3'} className='heading'>Price</li>
              <li key={'heading4'} className='heading'>Action</li>
            {expenses.map( (exp, index) => (
              <>
                <li key={'date-' + index}>{ exp.createdAt ? format(new Date(exp.createdAt), 'yyyy/MM/dd' ) : ''}</li>
                <li key={'name-' + index}>{exp.name}</li>
                <li key={'amount-' + index} className='expense-list-row'>
                  <span>{exp.amount}</span> 
                </li>
                <li  key={'del-' + index}><button onClick = {() => deleteExpenseView(exp)}>x</button></li>
              </>
              )
            )}

            <li key={'null1'}>&nbsp;</li>
            <li key={'null2'}>TOTAL</li>
            <li key={'null3'}>{totalExpense()}</li> 
            <li key={'null4'}>&nbsp;</li>
            </ul>
          </div>
        </>
        : <div className='not-found'>No Records!</div>
      }
    </>
  ) 
}

export default Transactions