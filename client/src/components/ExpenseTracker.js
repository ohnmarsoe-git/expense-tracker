import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ExpenseContext from '../context/ExpenseContext';
import Modal from './Modal';
import BudgetFrom from './BudgetFrom';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import ModalContext from '../context/ModalContext';
import homeIcon from '../assets/img/icons8-budget-80.png'
import BudgetTransactions from './BudgetTransactions';
import Transactions from './Transactions';
import { AiFillPieChart } from "react-icons/ai";
import { BsFillCalendar2MinusFill } from "react-icons/bs";
import Chart from './Chart';
import ExpenseLists from './ExpenseLists';

const ExpenseTracker = () => {

  const { 
    openModal, setOpenModal,
    modalName, setModalName
  } = useContext(ModalContext)

  const {state, getIncome, getBudget, getExpenses } = useContext(ExpenseContext)

  const handleModal = (e) => {
    e.preventDefault();
    setModalName(e.currentTarget.id);
    setOpenModal(!openModal)
  }

  const modalContent = (name) => {

    switch(name) {
      case 'budget':
        return <BudgetFrom budgets={state.budgets} />

      case 'income':
        return <IncomeForm />

      case 'expense':
      case 'expense-lists':
        return <ExpenseForm />

      case 'viewall':
        return <Transactions />

      case 'filter':
        return <ExpenseLists />

      case 'chart':
        return <Chart />

      default:
        return setModalName('');
    }
  }

  useEffect(() => {
    getIncome()
    getBudget()
    getExpenses();

    // eslint-disable-next-line
  }, [])

  const totalExpense = (income) => {
    return income.reduce( (total, income) => total + parseInt(income.amount), 0 )
  }

  const currentMonth = () => {
    let today = new Date(); 
    return `${today.toLocaleString("en-US", { month: "long" })} / ${today.getFullYear()}`
  }
  
  return (
    <>
    <div className='month'><span>{<BsFillCalendar2MinusFill/>}</span><span>{currentMonth()} </span></div>
    <div className='main'>
      <div className='balance'>
          <span>Account Balance</span>
          <span>{ state?.totalIncome - state?.totalExpense} MMK</span>
        </div>

        <div className='box-container'>
            <div className='box'>
              <button 
                onClick={handleModal}
                id="income"
                >
                <span>Income</span>
                <span className='amount'> + { totalExpense(state.income) } MMK</span>
              </button>
            </div>
          <div className='box'>
              <button 
                onClick={handleModal} 
                id= "expense-lists"
                >
                <span>Expense</span>
                <span className='amount'> - {state?.totalExpense} MMK</span>
              </button>
          </div>
        </div>

        <BudgetTransactions />

    </div> {/* end main */}
    
      <div className='footer-warp'>
      <div className='footer'>
        <ul>
          <li><Link onClick={handleModal} id="chart" alt="chart"><span><AiFillPieChart size={40}/></span></Link></li>
          <li><Link onClick={handleModal} id="filter" alt="filter"><span><img src={homeIcon} width={40} height={40} alt="filter"/></span></Link></li>
        </ul>
      </div>
      </div>

      <Modal open={openModal}> 
        {modalContent(modalName)}
      </Modal >
    </>
  )
}

export default ExpenseTracker