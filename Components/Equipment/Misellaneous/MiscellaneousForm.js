import React,{useState, useContext} from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import classes from  './MiscellaneousForm.module.css'
import {BiArrowBack} from 'react-icons/bi'
import { v4 as uuidv4 } from 'uuid';

const MiscellaneousForm = () => {
    
    const router=useRouter()


    const notify = () => toast.success("New Miscellaneous Added",{
      position:'top-center',autoClose: 100,
    });
    
      const [miscellaneousType, setMiscellaneousType] = useState('')
      const [date, setDate]=useState('')
      const [amount,setAmount]=useState(0)

      const onSubmitMiscellaneousForm=async(e)=>{
        e.preventDefault()
         
        setMiscellaneousType('')
        setDate('')
        setAmount('')
        
        const formdata= {
            miscellaneousId:uuidv4(),
               miscellaneousType,
               date,
               amount
             
          }
          console.log(formdata);
        }

  return (
    <div>  <div className={classes.AddMiscellaneousForm}>
    <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={()=>router.back()}/> <h1> </h1> 
      </div>
 <h2>Add Miscellaneous</h2>

 <form className={classes.MiscellaneousForm} onSubmit={onSubmitMiscellaneousForm}>
     <input type='text' required placeholder='Miscellaneous Name' value={miscellaneousType} onChange={(e)=>{setMiscellaneousType(e.target.value)}}/>

     <input type='date' required value={date} onChange={(e)=>{setDate(e.target.value)}}/>

     <input type='number' placeholder='Amount' required  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
    <div className={classes.addMiscellaneous}> <button type='submit'>Add Miscellaneous</button> </div>
    <ToastContainer/>
 </form>
</div></div>
  )
}

export default MiscellaneousForm