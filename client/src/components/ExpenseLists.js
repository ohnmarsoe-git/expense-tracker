import React, {useContext, useEffect, useState} from 'react'
import ExpenseContext from '../context/ExpenseContext';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from '../assets/img/calendar.svg'
import BudgetCard from './BudgetCard';
const {format} = require('date-fns');

const ExpenseLists = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {state, deleteExpense, getExpensesFilterByDate} = useContext(ExpenseContext);

  const handleFilter = () => {
    let sdate = startDate ? startDate.toISOString() : ''
    let edate = endDate ? endDate.toISOString() : ''
    // return state.expense.filter(expense => expense.createdAt >= sdate && expense.createdAt <= edate);
    getExpensesFilterByDate(sdate, edate);
  }

  const totalExpense = () => {
    return state.expense.reduce((total, ex) => total + parseInt(ex.amount), 0);
  }

  useEffect(() => {
    let sdate = startDate ? startDate.toISOString() : ''
    let edate = endDate ? endDate.toISOString() : ''
    getExpensesFilterByDate(sdate, edate);
  }, [])

  console.log(state);

  return (
    <div className='main'>
      <h2>Filter Expenses Transactions</h2>
      <div>Choose Date</div>
      <div className="date-box">
        <div className='calendar'>
          <span>Start:</span>
          <div>
            <img src={calendarIcon} alt="calendar icon" className="calendar-icon" />
            <DatePicker 
              className='calendar-input'  
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              maxDate={endDate}
               />
          </div>
        </div>

        <div className='calendar'>
          <span>End:</span>
          <div>
            <img src={calendarIcon} alt="calendar icon" className="calendar-icon" />
            <DatePicker 
              className='calendar-input'  
              selected={endDate} 
              onChange={(date) => setEndDate(date)} 
              minDate={startDate}
              />
          </div>
        </div>
        <div className='btn-box' onClick={handleFilter}><button>search</button></div>
      </div>


      {state.expense.length > 0 ?
        <>
          <div className='transaction-list'>
            <h2> Transactions list </h2>
            <ul className="expense-list expense-list-detail">
              <li className='heading'>Date</li>
              <li className='heading'>Category</li>
              <li className='heading'>Name</li>
              <li className='heading'>Price</li>
              <li className='heading'>Actions</li>
              {state.expense.map( (exp, index) => (
              <>
                <li className='date' key={exp.createdAt + index}>{ exp.createdAt ? format(new Date(exp.createdAt), 'MM/dd/yyyy' ) : ''}</li>
                <li key={exp.budget + index}>{exp.budget}</li>
                <li key={exp.name + index}>{exp.name}</li>
                <li key={index} className='expense-list-row'>
                  <span>{exp.amount}</span> 
                </li>
                <li><button onClick={() => deleteExpense(exp)}>x</button></li>
              </>
              )
            )}
            
            <li></li>
            <li></li>
            <li>TOTAL</li>
            <li>{totalExpense()}</li> 
            <li></li>

            </ul>
          </div>
        </>
        : <div className='not-found'>No Records!</div>
      }
    </div>
  )
}

export default ExpenseLists