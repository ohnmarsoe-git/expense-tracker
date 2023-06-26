import React, {useContext} from 'react'
import ExpenseContext from '../context/ExpenseContext';
import {useForm} from 'react-hook-form';
import ModalContext from '../context/ModalContext';

const IncomeForm = ({}) => {

  const {setOpenModal} = useContext(ModalContext)

  const { addIncome } = useContext(ExpenseContext);
  
  const {register,handleSubmit, formState} = useForm();
  const {errors} = formState
  
  const onHandleSubmit = (data) => {
    if(data.income !== '') addIncome(data.income) // pass to context api
    setOpenModal(false)
  }

  return (
    <div className='main'>
    <form onSubmit={handleSubmit(onHandleSubmit)} className='exptk-form'>
        <h2>Add Income</h2>
        <input type="number" id="number"
          {...register("income", {
            required:{
              value: true,
              message: 'Income Amount is required!'
            } 
          })}
        />
        {errors.income?.message && (
          <p className='err'>{errors.income?.message}</p>
        )}
        <div><button className='btn-save' type='submit'>ADD</button></div>
    </form>
   </div>
  )
}

export default IncomeForm