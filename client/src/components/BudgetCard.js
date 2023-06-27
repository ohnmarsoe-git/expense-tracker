import React, {useContext} from 'react'
import ExpenseContext from '../context/ExpenseContext'
import ModalContext from '../context/ModalContext';

const BudgetCard = ({heading}) => {

  const { handleModal } = useContext(ModalContext);

  const {state, getExpenseId } = useContext(ExpenseContext);

  const budgets = state?.budgets.filter( (budget) => budget.name !== 'Uncategoried');

  const card = budgets.map( (budget, index) => {
      const total =  getExpenseId(budget.name).reduce(
        (total, ex) => total + parseInt(ex.amount), 0 )
      return (
        <div key={index} className='card'>
          <div className='title'> <span>{budget.name}</span> <span> {total} MMK</span></div>
          <div className='btn-box'>
          <button onClick={() => handleModal('expense', budget.name)} >Add Expense</button> 
          <button onClick={() => handleModal('viewall', budget.name)} >View All</button>
          </div>
        </div>
      )
    })


  const unCategoriedTotal = getExpenseId('Uncategoried').reduce(
    (total, ex) => total + parseInt(ex.amount), 0 )

  const unCategoriedCard = <div className='card'>
      <div className='title'> <span>unCategoried</span> <span> {unCategoriedTotal} MMK</span></div>
      <div className='btn-box'>
        <button onClick={() => handleModal('expense','Uncategoried')}>Add Expense</button> 
        <button onClick={() => handleModal('viewall', 'Uncategoried')}>View All</button>
      </div>
    </div>

  return (
    <>
      <div className='heading'>
          <h2>{heading}</h2>
          <button onClick={() => handleModal('budget', '')} >Add Budget</button> 
      </div>

      <div className='card-container'>
        {card}
        {unCategoriedCard}
      </div>
      <div className='card'>
        <div className='title'> <span>Total:  </span> <span> {state.totalExpense} MMK</span></div>
      </div>
      
    </>
  )
}

export default BudgetCard