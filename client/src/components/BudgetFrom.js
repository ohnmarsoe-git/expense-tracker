import React, {useContext, useEffect } from 'react'
import ExpenseContext from '../context/ExpenseContext';
import {useForm} from 'react-hook-form';
import ModalContext from '../context/ModalContext';

const BudgetFrom = ({visible, budgets}) => {
  const {setOpenModal} = useContext(ModalContext)
  const { addBudget } = useContext(ExpenseContext);
  const {register, handleSubmit, setError, clearErrors, reset, formState} = useForm();
  const {errors} = formState
  
  const onHandleSubmit = (data) => {
    const budget = { "name": data.name, "amount": data.budget }
    addBudget(budget) // pass to context api
    setOpenModal(false);
    reset();
  }

  return (
   <div>
    <form onSubmit={handleSubmit(onHandleSubmit)} className='exptk-form main'>
        <h2>Add Budget</h2>
       
        <input type='text' id="name" placeholder='Name' 
          {...register('name', {
            required: "Name is required!",
            validate: {
              duplicate: value => {
                if(!budgets.find(budget => budget.name === value)) return true;
                return false;
              }
            }
          })}
          className={errors.name?.message || errors.dupliName?.message  ? 'err-txtbox' : ''}
         />

        {errors.name?.message && (
          <p className='err' style={{textAlign: 'left'}}>{errors.name?.message}</p>
        )}

        { errors.name?.type === 'duplicate' && (
          <p className='err' style={{textAlign: 'left'}}>Budget Name Already Set Up! Add others...</p>
        )}

        { errors.dupliName?.message && (
          <p className='err' style={{textAlign: 'left'}}>{errors.dupliName?.message}</p>
        )}

        <input type="number" id="number" placeholder='Amount'
          {...register("budget", {
            required:{
              value: true,
              message: 'Budget Amount is required!'
            } 
          })}
          className={errors.name?.message || errors.dupliName?.message  ? 'err-txtbox' : ''}
        />
        {errors.budget?.message && (
          <p className='err' style={{textAlign: 'left'}}>{errors.budget?.message}</p>
        )}

        <div><button className='btn-save' type='submit'>ADD</button></div>
    </form>
   </div>
  )
}

export default BudgetFrom