import React, {useState}from 'react'
import { BiArrowBack } from 'react-icons/bi'
import classes from './AddEquipForm.module.css'
import { useRouter } from 'next/router'

const AddEquipForm = () => {
    const router= useRouter()
    const[equipType,setEquipType]=useState('')
    const[model, setModel]=useState('')
    const[makeYear, setMakeYear] =useState('')
    const [datePurchased, setDatePurchased]=useState('')

    const formSubmitHandler=(e)=>{
        e.preventDefault()

        const data={
            equipType,
            model,
            makeYear,
            datePurchased
        }

        console.log(data);

        setEquipType('')
        setModel('')
        setMakeYear('')
        setDatePurchased('')

       router.back() 
       
    }


  return (
    <div>
          <BiArrowBack className={classes.back} onClick={() => router.back()}/>

          <h1 className={classes.addHeader}>Add New Equipment</h1>
          <form className={classes.addForm} onSubmit={formSubmitHandler}>

          <label htmlFor='cropName'>Equipment Type</label>
        <input className={classes.addFormInput}
          type='text'
          placeholder='Enter Equipment Type'
          id='equipType'
          required
          value={equipType}
          onChange={(e) => setEquipType(e.target.value)}
        />

        
<label htmlFor='model'>Model</label>
        <input className={classes.addFormInput}
          type='text'
          placeholder='Enter Model'
          id='model'
          required
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

<label htmlFor='makeYear'>Make Year</label>
        <input className={classes.addFormInput}
          type='text'
          placeholder='Enter Make Year'
          id='makeYear'
          required
          value={makeYear}
          onChange={(e) => setMakeYear(e.target.value)}
        />

<label htmlFor='datePurchased'>Date Purchased</label>
        <input className={classes.addFormInput}
          type='Date'
          placeholder='Enter Date Purchased'
          id='datePurchased'
          required
          value={datePurchased}
          onChange={(e) => setDatePurchased(e.target.value)}
        />

<div className={classes.addbutton}> <button> ADD Equipment </button></div>

          </form>
    </div>
  )
}

export default AddEquipForm