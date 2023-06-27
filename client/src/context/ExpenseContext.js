import React, {useReducer} from 'react'
import BASEAPI from '../API/config.js'

const ExpenseContext = React.createContext();

export const ExpenseContextProvider = ({children}) => {
  
  const initialState = {
    budgets: [
      {
        "id": 1,
        "name": 'Uncategoried',
        "amount": 0
      }
    ],
    income: [],
    expense: [],
    categoryGroup: [],
    totalExpense: 0,
    totalIncome: 0
  }

  const reducer = (state, action) => {
    switch(action.type) {

      case "LOADING":
        return state

      case "ADD_INCOME":
        return {
          ...state,
          income: [...state.income, action.payload.data],
        }
      
      case "GET_INCOME":
        return {
          ...state,
          income: action.payload,
          totalIncome: action.payload.reduce( (total, income) => total + parseInt(income.amount), 0 )
        }

      case "ADD_BUDGET":
        return {
          ...state,
          budgets: [...state.budgets, action.payload.data]
        }

      case "GET_BUDGET":
        return {
          ...state,
          budgets: action.payload
        }
    
      case "ADD_EXPENSE":
        return {
          ...state,
          expense: [...state.expense, action.payload],
          totalExpense: parseInt(state.totalExpense) + parseInt(action.payload.amount)
        }
      
      case "GET_EXPENSES":
        return {
          ...state,
          expense: action.payload,
          totalExpense: action.payload.reduce( (total, expense) => total + parseInt(expense.amount), 0 )
        }

      case "GET_EXPENSES_DATE_FILTER":
        if(action.payload.length > 0 ) {
          return {
            ...state,
            expense: action.payload,
          }
        } else {
          return state;
        }

      case "GET_EXPENSES_CATEGORY":
        return {
          ...state,
          expense: action.payload,
          totalExpense: action.payload.reduce( (total, expense) => total + parseInt(expense.amount), 0 )
        }
       
      case "DELETE_EXPENSE":
        return {
          ...state,
          expense: state.expense.filter( (ex) => ex._id !== action.payload._id && ex.budget === action.payload.budget),
          totalExpense: parseInt(state.totalExpense) - parseInt(action.payload.amount)
        }
      default: 
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const addIncome = async (income) => {
    const newIncome = {
      'amount': income,
      'date': new Date().toISOString()
    }
    try {
      await BASEAPI.post(`/income`, newIncome ).then((response) => {
        dispatch({type: 'ADD_INCOME', payload: response.data})
      });
    }catch(e) {
      console.log(e);
    }
  }

  const getIncome = async() => {
    dispatch({type: 'LOADING'})
    try {
      await BASEAPI.get(`/income`).then( response => {
        dispatch({type: 'GET_INCOME', payload: response.data})
      }).catch(error => {console.log(error)})
    } catch(e) {
      console.log(e);
    }
  }

  const addBudget = async (budget) => {
    await BASEAPI.post(`/budget`, {
      "name": budget.name,
      "amount": budget.amount
    }).then((response) => {
      dispatch({type: 'ADD_BUDGET', payload: response.data})
    }).catch(error => console.log(error));
  }

  const getBudget = async() => {
    dispatch({type: 'LOADING'})
    try {
      await BASEAPI.get(`/budgets`).then(response => {
        dispatch({type: 'GET_BUDGET', payload: response.data})
      }).catch(error => {console.log(error)})
    } catch(e) {
      console.log(e);
    }
  }

  const addExpense = async (expense) => {
    const newExpense = {
      'name': expense.name,
      'amount': expense.amount,
      'budget': expense.budget,
      'createdAt': expense.createdAt
    }
    try {
      await BASEAPI.post(`/expense`, newExpense ).then ( (response) => {
        dispatch({ type: 'ADD_EXPENSE', payload: response.data.data })
      })
    }catch(e) {
      console.log(e);
    }
  }

  const getExpenses = async (expense) => {
    try {
      await BASEAPI.get(`/expenses`).then(response => {
        dispatch({type: 'GET_EXPENSES', payload: response.data})
      }).catch(error => {console.log(error)})
    }catch(e) {
      console.log(e);
    }
  }

  const deleteExpense = async (expense) => {
    try {
      await BASEAPI.delete(`/expense`, {
        params: {
          id: expense._id
        }
      }).then(response => {
        dispatch({type: 'DELETE_EXPENSE', payload: expense})
      }).catch(error => {console.log(error)})
    }catch(e) {
      console.log(e);
    }
  }

  const getExpensesFilterByDate = async (startDate, endDate) => {
    try {
      await BASEAPI.get(`/expensesfilter`, {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      }).then(response => { 
          dispatch({type: 'GET_EXPENSES_DATE_FILTER', payload: response.data})
      }).catch(error => {console.log(error)})
    }catch(e) {
      console.log(e);
    }
  }

  const getExpenseId = (budget) => {
    return state.expense?.filter( (ex) => ex.budget === budget)
  }

  return(
    <ExpenseContext.Provider value={{
      state: state, 
      addIncome:addIncome,
      addBudget: addBudget,
      getIncome: getIncome, 
      getBudget: getBudget,
      addExpense: addExpense,
      getExpenses: getExpenses,
      deleteExpense: deleteExpense,
      getExpenseId: getExpenseId,
      getExpensesFilterByDate: getExpensesFilterByDate
      }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseContext