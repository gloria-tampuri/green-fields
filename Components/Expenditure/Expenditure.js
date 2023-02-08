import React,{useState} from 'react'
import ExpenditureForm from './ExpenditureForm'
import ExpenditureList from './ExpenditureList'

const Expenditure = () => {
  const[updateData, setUpdateData]=useState()
  const [isUpdate, setIsUpdate] =useState(false)

  const getUpdateData=(data)=>{
    setUpdateData(data);
  }

  // Functio to set isUpdate to true
  const isUpdateHandler = () =>{
    setIsUpdate(true)
  }

  return (
    <div>
        <ExpenditureForm updateData={updateData} isUpdate={isUpdate}/>
        <ExpenditureList onUpdateData={getUpdateData} onIsUpdate={isUpdateHandler}/>
    </div>
  )
}

export default Expenditure