
import React, { useState, useContext } from 'react'
import ExpenseContext from '../context/ExpenseContext'
import {useForm} from 'react-hook-form';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from '../assets/img/calendar.svg'
import ModalContext from '../context/ModalContext';

// const {format} = require('date-fns');

const ExpenseForm = ({visible}) => {

  const { setbudgetModal, setExpenseModal, category} = useContext(ModalContext)
  const {state, addExpense} = useContext(ExpenseContext)
  
  const {register, handleSubmit, reset, formState} = useForm();
  const {errors} = formState

  const [startDate, setStartDate] = useState(new Date());

  const handleVisiblitly = (e) => {
    e.preventDefault();
    setExpenseModal(false);
    setbudgetModal(true);

  }
  
  const OnhandleSubmit = (data, e) => {
    e.preventDefault();
    if(data.amount !== '' && data.name !=='' && startDate !== '' ) {
      const expense = { 
        createdAt: startDate.toISOString(), 
        name: data.name, 
        budget :data.category, 
        amount: data.amount, 
        note: data.note
      }
      addExpense(expense) // pass to context api
      setStartDate(new Date())
      reset()
    }
  }


  return (
    <div className='main'>
    <form onSubmit={handleSubmit(OnhandleSubmit)} className='exptk-form'>
        <h2>Add Expense</h2>
      
        {/* <input type='number' id="number" placeholder='MMK 0' value={amount > 0 && amount} onChange={(e) => setAmount(e.target.value)} {...register(amount)}/> 
          <input type='text' id="name" placeholder='Name' value={name} onChange= {(e) => setName(e.target.value)} />
        */}
        
        <input type='text' id="name" placeholder='Name' {...register('name', {
          required:{
            value: true,
            message: 'Name is required!'
          } 
        })} 
          className={errors.name?.message ? 'err-txtbox' : ''}
        />
        {errors.name?.message && (
          <p className='err' style={{textAlign: 'left'}}>{errors.name?.message}</p>
        )}

        <input type='number' id="number" placeholder='Amount' {...register("amount", {
          required:{
            value: true,
            message: 'Amount is required!'
          } 
        })}
          className={errors.amount?.message ? 'err-txtbox' : ''}
        />
        {errors.amount?.message && (
          <p className='err' style={{textAlign: 'center'}}>{errors.amount?.message}</p>
        )}

        {state?.budgets.length > 0 ?
        <>
          <div className='category-box'>
            <select value={category} {...register('category', {
              required: {
                value: true,
                message: 'Please choose a budget category!'
              }
            })}
            className={errors.category?.message ? 'err-txtbox' : ''}
            >
              {state.budgets.map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              )
              )}
            </select>
          </div>
          {errors.category?.message && (
            <p className='err' style={{textAlign: 'left'}}>{errors.category?.message}</p>
          )}
        </>
        :
        <>
          <button onClick={handleVisiblitly}>Add Budget</button>
        </>
        }

        <input type='text' id="note" placeholder='Note' {...register('note')} />
        
        <div className='calendar'>
          <img src={calendarIcon} alt="calendar icon" className="calendar-icon" />
          <DatePicker 
            className='calendar-input'  
            selected={startDate} 
            onChange={(date) => setStartDate(date)} />
        </div>

        <button className='btn-save' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default ExpenseForm