import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from 'Components/Header/Header'
import { BiArrowBack } from 'react-icons/bi'
import classes from './CropList.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const CropList = () => {
  const router = useRouter()
  const {year}=router.query
  const { data, error } = useSWR(`/api/crops/year/${year}`, fetcher,{refreshInterval: 1000})
 
  return (
    <div>
      <Header/>
      <BiArrowBack className={classes.back} onClick={() => router.back()}/>
      <h1 className={classes.header}>List of Crops for {year}</h1>
     <div className={classes.year}>
     {data?.crops.map((crop)=><ul key={crop._id}>
     <Link className={classes.croplistLink}  href={`/dashboard/${crop.year}/crops/${crop._id}`}> <li className={classes.croplist}> {crop.cropName} </li></Link>
        </ul>)}
     </div>

    </div>
  )
}

export default CropList