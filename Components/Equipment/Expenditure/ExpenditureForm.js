import React,{useState, useEffect} from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import classes from './ExpenditureForm.module.css'
import {BiArrowBack} from 'react-icons/bi'
import { v4 as uuidv4 } from 'uuid';

const fetcher = (...args) => fetch(...args).then(res => res.json())


const ExpenditureForm = () => {
    const router=useRouter()

    const notify = () => toast.success("New Expenditure Added",{
        position:'top-center',autoClose: 100,
      });

      const [expenditureType, setExpenditureType] = useState('')
      const [date, setDate]=useState('')
      const [amount,setAmount]=useState(0)
    
      const { year, equipmentId } = router.query

      const { data, error } = useSWR(`/api/equipment/${equipmentId}`, fetcher, { refreshInterval: 1000 })

      const onSubmitExpenditureForm=async(e)=>{
        e.preventDefault()
         
        
        const formData= {
            expenditureId:uuidv4(),
            expenditureType,
            date,
            amount  
        }
        setExpenditureType('')
        setDate('')
        setAmount('')

        const postData = {
          equipmentType: data?.equipment?.equipmentType,
          model: data?.equipment?.model,
          makeYear: data?.equipment?.makeYear,
          datePurchased: data?.equipment?.datePurchased,
          year: data?.equipment?.year,
          createdAt: data?.equipment?.createdAt,
          inflows:[
              ...data.equipment.inflows,
          ],
          expenditure: [
              ...data.equipment.expenditure,
              formData
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
        }

  return (
    <div>  <div className={classes.AddExpenditureForm}>
    <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={()=>router.back()}/> <h1>{ data?.equipment?.equipmentType} </h1> 
      </div>
 <h2>Add Expenditure</h2>

 <form className={classes.ExpenditureForm} 
 onSubmit={ onSubmitExpenditureForm}>
     <input type='text' placeholder='Expenditure Name' required value={expenditureType} onChange={(e)=>{setExpenditureType(e.target.value)}}/>

     <input type='date' required  value={date} onChange={(e)=>{setDate(e.target.value)}}/>

     <input type='number' placeholder='Amount' required  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
    <div className={classes.addExpenditure}> <button type='submit'>Add Expenditure</button> </div>
    <ToastContainer/>
 </form>
</div></div>
  )
}

export default ExpenditureForm