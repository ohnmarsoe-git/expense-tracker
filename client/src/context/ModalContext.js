import React, {useState} from 'react'

const ModalContext = React.createContext();

export const ModalContextProvider = ({children}) => {
  const [openModal, setOpenModal] = useState(false);
  const [incomeModal, setincomeModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [budgetModal, setbudgetModal] = useState(false);
  const [viewAllModal, setViewAllModal] = useState(false);
  const [category, setCategory] = useState(false)
  const [chartModal, setChartModal] = useState(false)
  const [modalName, setModalName] = useState('');

  const handleModal = (content, cat = '') => {
    setOpenModal(!openModal)
    setCategory(cat);
    setModalName(content)
  }
  
  return (
    <ModalContext.Provider value={{ 
      openModal: openModal, 
      setOpenModal: setOpenModal, 
      handleModal: handleModal,
      modalName: modalName,
      setModalName: setModalName,
      category: category,
      }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext