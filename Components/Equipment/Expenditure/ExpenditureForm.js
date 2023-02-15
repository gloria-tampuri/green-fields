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

      const { data, error } = useSWR(`/api/equipments/${equipmentId}`, fetcher, { refreshInterval: 1000 })

      const onSubmitExpenditureForm=async(e)=>{
        e.preventDefault()
         
        
        const formdata= {
            expenditureId:uuidv4(),
            expenditureType,
            date,
            amount
            
        }
        setExpenditureType('')
        setDate('')
        setAmount('')
        console.log(formdata);
        }

  return (
    <div>  <div className={classes.AddExpenditureForm}>
    <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={()=>router.back()}/> <h2> </h2> 
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