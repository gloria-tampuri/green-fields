import React,{useState, useEffect} from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import classes from './ExpenditureForm.module.css'
import {BiArrowBack} from 'react-icons/bi'
import { v4 as uuidv4 } from 'uuid';


const fetcher = (...args) => fetch(...args).then(res => res.json())

const ExpenditureForm = ({updateData,isUpdate}) => {
  const router=useRouter()
  
  
  const notify = () => toast.success("New Expenditure Added",{
    position:'top-center',autoClose: 100,
  });
  
  const [expenditureType, setExpenditureType] = useState('')
  const [date, setDate]=useState('')
  const [amount,setAmount]=useState(0)

  // Effect hook to update the form field
  useEffect(()=>{
    if(!updateData) return 
    setExpenditureType(updateData.expenditureType)
    setDate(updateData.date)
    setAmount(updateData.amount)
  }, [updateData])

  const { year, cropId } = router.query

  const { data, error } = useSWR(`/api/crops/${cropId}`, fetcher, { refreshInterval: 1000 })

 const onSubmitExpenditureForm=async(e)=>{
  e.preventDefault()
   
  setExpenditureType('')
  setDate('')
  setAmount('')
  
  const formdata= {
          expenditureId:uuidv4(),
         expenditureType,
         date,
         amount
       
    }
    const postData = {
      cropName: data?.crop?.cropName,
      cropId: data?.crop?.cropId,
      startDate: data?.crop?.startDate,
      endDate: data?.crop?.endDate,
      numberofbags: data?.crop?.numberofbags,
      year: data?.crop?.year,
      createdAt: data?.crop?.createdAt,
      sales: [
          ...data.crop.sales,
      ],
      expenditure: [
          ...data.crop.expenditure,
          formdata
      ],
      miscellaneous: [
          ...data.crop.miscellaneous,
      ]
  }

  const response = await fetch(`/api/crops/${cropId}`, {
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

//  const onUpdateExpenditure = async (e) =>{
//   e.preventDefault()
   
//   setExpenditureType('')
//   setDate('')
//   setAmount('')
  
//   const formdata= {
//          expenditureType,
//          date,
//          amount
       
//     }
//     const postData = {
//       cropName: data?.crop?.cropName,
//       cropId: data?.crop?.cropId,
//       startDate: data?.crop?.startDate,
//       endDate: data?.crop?.endDate,
//       numberofbags: data?.crop?.numberofbags,
//       year: data?.crop?.year,
//       createdAt: data?.crop?.createdAt,
//       sales: [
//           ...data.crop.sales,
//       ],
//       expenditure: [
//           ...data.crop.expenditure,
//           formdata
//       ],
//       miscellaneous: [
//           ...data.crop.miscellaneous,
//       ]
//   }

//   const response = await fetch(`/api/crops/${cropId}/expenditure/${expenditureId}`, {
//     method: "PATCH",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: (JSON.stringify(postData))
// })
// if (response.ok) {
//     notify();
// }
//  }
  return (
    <div>  <div className={classes.AddExpenditureForm}>
    <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={()=>router.back()}/> <h2> {data && data.batchName}</h2> <h1></h1>
      </div>
 <h2>Add Expenditure</h2>

 <form className={classes.ExpenditureForm} 
 onSubmit={ onSubmitExpenditureForm}>
     <input type='text' placeholder='Expenditure Name' value={expenditureType} onChange={(e)=>{setExpenditureType(e.target.value)}}/>

     <input type='date'  value={date} onChange={(e)=>{setDate(e.target.value)}}/>

     <input type='number' placeholder='Amount'  value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
    <div className={classes.addExpenditure}> <button type='submit'>Add Expenditure</button> </div>
    <ToastContainer/>
 </form>
</div></div>
  )
}

export default ExpenditureForm