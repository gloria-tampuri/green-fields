import Header from 'Components/Header/Header'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'
import classes from './EquipmentList.module.css'

const EquipmentList = () => {
  const router = useRouter()
  return (
    <div>
      <Header/>
      <BiArrowBack className={classes.back} onClick={() => router.back()}/>
      <h1 className={classes.header}>List of Equipments for 2023</h1>

      <div className={classes.year}>
      <ul>
      <Link className={classes.croplistLink} href={`/dashboard/2023/crops/sdf5434`}> 
      <li className={classes.croplist}> Tractor </li></Link> 
      </ul>
      </div>
     
      
    </div>
  )
}

export default EquipmentList