
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useSWR from 'swr'
import classes from './InflowsForm.module.css'
import { BiArrowBack } from 'react-icons/bi'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const fetcher = (...args) => fetch(...args).then(res => res.json())


const InflowsForm = () => {

  const router = useRouter()

  const notify = () => toast.success("New Inflow Added", {
    position: 'top-center', autoClose: 1000,
});

  const[workType, setWorkType] = useState('')
  const[workDate, setWorkDate]=useState('')
  const[amount,setAmount]=useState(0)

  const { year,equipmentId } = router.query

  const { data, error } = useSWR(`/api/equipment/${equipmentId}`, fetcher, { refreshInterval: 1000 })

 

  const onSubmitForm=async(e)=>{
    e.preventDefault()

    const formData={
      inflowId: uuidv4(),
      workType,
      workDate,
      amount
    }

   
    const postData = {
      equipmentType: data?.equipment?.equipmentType,
      model: data?.equipment?.model,
      makeYear: data?.equipment?.makeYear,
      datePurchased: data?.equipment?.datePurchased,
      year: data?.equipment?.year,
      createdAt: data?.equipment?.createdAt,
      inflows:[
          ...data.equipment.inflows,
          formData
      ],
      expenditure: [
          ...data.equipment.expenditure,
      ],
      miscellaneous: [
          ...data.equipment.miscellaneous,
      ]
  }

   
  const response = await fetch(`/api/equipment/${equipmentId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: (JSON.stringify(postData))
})
if (response.ok) {
    notify();
}

    setWorkType('')
    setWorkDate('')
    setAmount('')

  }

  return (
    <div className={classes.AddSaleForm}>

      <div className={classes.arrowName}>
        <BiArrowBack className={classes.back} onClick={() => router.back()} />
        <h2> </h2>
      </div>
      <h2>Add Inflow</h2>

      <form className={classes.SaleForm} onSubmit={onSubmitForm}>

      <input className={classes.SaleFormInput} 
      type='text'
       placeholder='Name of Work Done'
       value={workType} 
        required 
        onChange={(e) => { setWorkType(e.target.value) }} 
        />

    <input className={classes.SaleFormInput} 
      type='date'
       placeholder='Date of Work Done'
       value={workDate} 
        required 
        onChange={(e) => { setWorkDate(e.target.value) }} 
        />

<input className={classes.SaleFormInput} 
      type='number'
       placeholder='amount'
       value={amount} 
        required 
        onChange={(e) => { setAmount(e.target.value) }} 
        />

<div className={classes.addSale}> <button type='submit' >Add Sale</button> </div>

<ToastContainer/>

      </form>

    </div>
  )
}

export default InflowsForm