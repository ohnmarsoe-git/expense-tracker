import React, {useContext, useState} from 'react'
import ExpenseContext from '../context/ExpenseContext';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from '../assets/img/calendar.svg'
const {format} = require('date-fns');

const ExpenseLists = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { state, deleteExpense} = useContext(ExpenseContext);
  const [expenses, setExpenses] = useState();

  const handleFilter = () => {
   
    let sdate = startDate ? format(new Date(startDate), 'MM/dd/yyyy' ) : ''
    let edate = endDate ? format(new Date(endDate), 'MM/dd/yyyy' ) : ''

    const records = state.expense.filter( expense => format(new Date(expense.createdAt), 'MM/dd/yyyy' )  >= sdate && format(new Date(expense.createdAt), 'MM/dd/yyyy' ) <= edate );

    setExpenses(records);
  }

  const totalExpense = () => {
    return expenses.reduce((total, ex) => total + parseInt(ex.amount), 0);
  }

  const deleteExpenseView = (expense) => {
    deleteExpense(expense);
    return setExpenses( expenses?.filter( (ex) => ex._id !== expense._id));
  }


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


      {expenses?.length > 0 ?
        <>
          <div className='transaction-list'>
            <h2> Transactions list </h2>
            <ul className="expense-list expense-list-detail">
              <li key="date" className='heading'>Date</li>
              <li key="category" className='heading'>Category</li>
              <li key="name" className='heading'>Name</li>
              <li key="price" className='heading'>Price</li>
              <li key="actions" className='heading'>Actions</li>
              {expenses.map( (exp, index) => (
              <>
                <li key={'date' + index}  className='date'>{ exp.createdAt ? format(new Date(exp.createdAt), 'MM/dd/yyyy' ) : ''}</li>
                <li key={'budget' + index}>{exp.budget}</li>
                <li key={'name' + index}>{exp.name}</li>
                <li key={'price' + index} className='expense-list-row'><span>{exp.amount}</span> </li>
                <li key={'actions' +index}><button onClick={() => deleteExpenseView(exp)}>x</button></li>
              </>
              )
            )}
            
            <li key="null1"></li>
            <li key="null2"></li>
            <li key="null3">TOTAL</li>
            <li key="null4">{totalExpense()}</li> 
            <li key="null5"></li>

            </ul>
          </div>
        </>
        : <div className='not-found'>No Records!</div>
      }
    </div>
  )
}

export default ExpenseLists