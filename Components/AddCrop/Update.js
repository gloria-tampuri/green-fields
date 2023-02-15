import React,{useEffect, useState} from 'react'
import useSWR from 'swr'
import Header from 'Components/Header/Header'
import { useRouter } from 'next/router'
import classes from './AddCropForm.module.css'
import {BiArrowBack} from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Update = () => {
    const router = useRouter()
   
    const notify = () => toast.success("Crop Updated!",{
      position:'top-center',
      autoClose:2000
    });
    const[cropName, setCropName] = useState('')
    const[startDate, setStartDate]= useState('')
    const[numberofbags, setNumberofbags]=useState(0)
    const[endDate, setEndDate]=useState('')
    const[year, setYear] =useState('')

    const {cropId} = router.query
  

    const { data, error } = useSWR(`/api/crops/${cropId}`, fetcher, { refreshInterval: 1000 })
    

    useEffect(() => {
      if(data?.crop){
        setCropName(data?.crop?.cropName)
        setStartDate(data?.crop?.startDate)
        setNumberofbags(data?.crop?.numberofbags)
        setEndDate(data?.crop?.endDate)
        setYear(data?.crop?.year)
      }
     
    }, [data?.crop]);
  
    // Function to submit form data
    const handlerFormUpdate = async (e) => {
      e.preventDefault()

  
      const updatedData = {
        cropName:  cropName,
        // cropId:cropId,
        startDate:startDate,
        endDate:endDate,
        numberofbags:numberofbags,
        year:year,
        sales: [
          ...data.crop.sales,
       
      ],
      expenditure: [
          ...data.crop.expenditure,
      ],
      miscellaneous: [
          ...data.crop.expenditure,
      ]
      
    }
    
    
   
    
    const response = await fetch(`/api/crops/${cropId}`,{
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
    setCropName('')
    // setCropId('')
    setStartDate('')
    setNumberofbags('')
    setEndDate('')
    setYear('')
   
}
  return (
    <div>
    <Header/>
    <ToastContainer/>
    <BiArrowBack className={classes.back} onClick={() => router.back()}/>
    <h1 className={classes.addHeader}>Update Crop</h1>

    <form className={classes.addForm} onSubmit={handlerFormUpdate}>
   

    <label htmlFor='cropName'> Crop Name</label>
    <input  className={classes.addFormInput} type='text' placeholder='Enter Crop Name' id='cropName' required value={cropName} onChange={(e)=>setCropName(e.target.value)}  />

    <label htmlFor='year'>Year</label>
    <input className={classes.addFormInput} type='text' placeholder='Add year' id='year' required value={year} onChange={(e)=>setYear(e.target.value)}/>

    <label htmlFor='fishnumber'> Number of Harvested Bags </label>
    <input className={classes.addFormInput} type='number' placeholder='Enter Number of Harvested Bags' id='fishnumber' required value={numberofbags} onChange={(e)=>setNumberofbags(+e.target.value)}  />


    <label htmlFor='startdate'>Start Date</label>
    <input className={classes.addFormInput} type='date' placeholder='Select Start Date' id='startdate' required value={startDate} onChange={(e)=>setStartDate(e.target.value)}  />

    <label htmlFor='Enddate'>End Date</label>
    <input className={classes.addFormInput} type='date' placeholder='Select Start Date' id='startdate' value={endDate} onChange={(e)=>setEndDate(e.target.value)}  />
 <div className={classes.addbutton}> <button> Update Crop </button></div>

  </form>

</div>
  )
}

export default Update