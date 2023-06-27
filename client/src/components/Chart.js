import React, {useContext} from 'react'
import ExpenseContext from '../context/ExpenseContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {

  const { state, getExpenseId } = useContext(ExpenseContext)

  const labels = () => {
    let budgetName = [];
    let budgetTotalAmount = [];
    state.budgets.map((budget) => {
      budgetName.push(budget.name);
      const total =  getExpenseId(budget.name).reduce(
        (total, ex) => total + parseInt(ex.amount), 0 )
      budgetTotalAmount.push(total);
      return {budgetName, budgetTotalAmount}
    });
    return { budgetName, budgetTotalAmount };
  }

  let extractData = labels();

  const data = {
    labels: extractData.budgetName,
    datasets: [
      {
        label: '# of Votes',
        data: extractData.budgetTotalAmount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='chart-container'>
      <h2>Chart of Expenses by Budget</h2>
      <Pie data={data} />
    </div>
  )
}

export default Chart