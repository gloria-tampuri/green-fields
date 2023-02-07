import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'
import classes from './Crop.module.css'
import CropSummary from './CropSummary'
import Header from 'Components/Header/Header'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Crop = () => {
   const router = useRouter()
  const {year,cropId} = router.query
  console.log(year, cropId);
 
    const { data, error } = useSWR(`/api/crops/${cropId}`, fetcher, { refreshInterval: 1000 })
  return (
    <div>
        <Header/>
        <div>
        <BiArrowBack className={classes.back} onClick={() => router.back()} />
        <h1 className={classes.header}>{data?.crop?.cropName}</h1>
        <div className={classes.actions}>
        <div className={classes.actionbtn} onClick={() => router.push(`/dashboard/${year}/${cropId}/sales`)}>Sales</div>
        <div className={classes.actionbtn} onClick={() => router.push(`/dashboard/${year}/${cropId}/expenditure`)}>Expenditure</div>
        <div className={classes.actionbtn} onClick={() => router.push(`/dashboard/${year}/${cropId}/miscellaneous`)}>Miscellaneous</div>
      </div>
        </div>
        <div className={classes.edit}><p>Edit</p></div>
        <CropSummary crop = {data && data.crop}/>
  </div>
  )
}

export default Crop