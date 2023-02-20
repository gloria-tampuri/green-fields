import React,{useEffect, useState} from 'react'
import useSWR from 'swr'
import Header from 'Components/Header/Header'
import { useRouter } from 'next/router'
import classes from './AddEquipForm.module.css'
import {BiArrowBack} from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const Update = () => {
    const router= useRouter()

    const{equipmentId}=router.query
    
    const notify = () => toast.success("Equipment Updated!",{
        position:'top-center',
        autoClose:2000
      });

      const { data, error } = useSWR(`/api/equipment/${equipmentId}`, fetcher, { refreshInterval: 1000 })

  

    const[equipType,setEquipType]=useState('')
    const[model, setModel]=useState('')
    const[makeYear, setMakeYear] =useState('')
    const [datePurchased, setDatePurchased]=useState('')


    useEffect(()=>{
      if(data?.equipment){
        setEquipType(data?.equipment?.equipmentType)
        setModel(data?.equipment?.model)
        setMakeYear(data?.equipment?.makeYear)
        setDatePurchased(data?.equipment?.datePurchased)
      }
    }, [data?.equipment]);

    const formSubmitHandler=async(e)=>{
        e.preventDefault()

      
        const updatedData={
          equipmentType:equipType,
          model:model,
          year: moment(datePurchased).format('YYYY'),
          makeYear:makeYear,
          datePurchased:datePurchased,
          inflows: [
            ...data.equipment.inflows,
         
        ],
        expenditure: [
            ...data.equipment.expenditure,
        ],
        miscellaneous: [
            ...data.equipment.miscellaneous,
        ]
        
        }

        const response = await fetch(`/api/equipment/${equipmentId}`,{
          method: "PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body: (JSON.stringify(updatedData))
        })
        if(response.ok){
          notify()
          return router.back()
        }

        setEquipType('')
        setModel('')
        setMakeYear('')
        setDatePurchased('')

        notify()
       router.back() 
    }
  return (
    <div>
        <Header/>
    <BiArrowBack className={classes.back} onClick={() => router.back()}/>

    <h1 className={classes.addHeader}>Update Equipment</h1>
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
    type='number'
    placeholder='Enter Make Year'
    id='makeYear'
    required
    value={makeYear}
    onChange={(e) => setMakeYear(e.target.value)}
  />

<label htmlFor='datePurchased'>Date Purchased</label>
  <input className={classes.addFormInput}
    type='date'
    placeholder='Enter Date Purchased'
    id='datePurchased'
    required
    value={datePurchased}
    onChange={(e) => setDatePurchased(e.target.value)}
  />

<div className={classes.addbutton}> <button> ADD Equipment </button></div>

    </form>
    <ToastContainer/>
</div>
  )
}

export default Update