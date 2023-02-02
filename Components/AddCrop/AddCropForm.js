import React,{useState} from 'react'
import Header from 'Components/Header/Header'
import { useRouter } from 'next/router'
import classes from './AddCropForm.module.css'
import {BiArrowBack} from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCropForm = () => {
    const router = useRouter()
   
    const notify = () => toast.success("Crop Added!",{
      position:'top-center',
    });
    const[cropName, setCropName] = useState('')
    const[cropId,setCropId]=useState(0)
    const[startDate, setStartDate]= useState('')
    const[numberofbags, setNumberofbags]=useState(0)
    const[endDate, setEndDate]=useState('')
    const[year, setYear] =useState('')
  
    // Function to submit form data
    const handlerFormSubmit = async (e) => {
      e.preventDefault()
  
      const data = {
        cropName:  cropName,
        cropId:cropId,
        startDate:startDate,
        endDate:endDate,
        numberofbags:numberofbags,
        year:year,
       sales:[
         
       ],
       expenditure:[
         
      ],
      miscellaneous:[
        
      ],
      
    }
    console.log(data);
    notify()
   
    
    const response = await fetch("/api/crops",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: (JSON.stringify(data))
    })
    setCropName('')
    setCropId('')
    setStartDate('')
    setNumberofbags('')
    setEndDate('')
    setYear('')
    router.push('/dashboard')
      
    }
  return (

 
    <div>
        <Header/>
        <ToastContainer/>
        <BiArrowBack className={classes.back} onClick={() => router.back()}/>
        <h1 className={classes.addHeader}>Create New Crop</h1>

        <form className={classes.addForm} onSubmit={handlerFormSubmit}>
        <label htmlFor='batchnumber'> Crop ID</label>
        <input className={classes.addFormInput} type='number' placeholder='Enter Batch Number' id='batchnumber' value={cropId} onChange={(e)=>setCropId(+e.target.value)}  required/>

        <label htmlFor='cropName'> Crop Name</label>
        <input  className={classes.addFormInput} type='text' placeholder='Enter Batch Name' id='cropName' required value={cropName} onChange={(e)=>setCropName(e.target.value)}  />

        <label htmlFor='year'>Year</label>
        <input className={classes.addFormInput} type='text' placeholder='Add year' id='year' required value={year} onChange={(e)=>setYear(e.target.value)}/>

        <label htmlFor='fishnumber'> Number of Harvested Bags </label>
        <input className={classes.addFormInput} type='number' placeholder='Enter Number of Harvested Bags' id='fishnumber' required value={numberofbags} onChange={(e)=>setNumberofbags(+e.target.value)}  />


        <label htmlFor='startdate'>Start Date</label>
        <input className={classes.addFormInput} type='date' placeholder='Select Start Date' id='startdate' required value={startDate} onChange={(e)=>setStartDate(e.target.value)}  />

        <label htmlFor='Enddate'>End Date</label>
        <input className={classes.addFormInput} type='date' placeholder='Select Start Date' id='startdate' value={endDate} onChange={(e)=>setEndDate(e.target.value)}  />
     <div className={classes.addbutton}> <button> ADD Crop </button></div>

      </form>

    </div>
  )
}

export default AddCropForm