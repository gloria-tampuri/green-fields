import Header from 'Components/Header/Header'
import Link from 'next/link'
import useSWR from 'swr'
import React from 'react'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'
import classes from './EquipmentList.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const EquipmentList = () => {
  const router = useRouter()
  const {year}=router.query
  console.log(year);
  const { data, error } = useSWR(`/api/equipment/year/${year}`, fetcher,{refreshInterval: 1000})
  return (
    <div>
      <Header/>
      <BiArrowBack className={classes.back} onClick={() => router.back()}/>
      <h1 className={classes.header}>List of Equipments for {year}</h1>

      <div className={classes.year}>
    { data?.equipments.map((equipment)=><ul key={equipment._id}>
      <Link className={classes.croplistLink} href={`/dashboard/${year}/equipments/${equipment._id}`}> 
      <li className={classes.croplist}> {equipment.equipmentType} </li></Link> 
      </ul>)}
      </div>
     
      
    </div>
  )
}

export default EquipmentList