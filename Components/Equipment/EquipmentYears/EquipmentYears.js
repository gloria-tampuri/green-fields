import Link from 'next/link'
import React from 'react'
import classes from './EquipmentYears.module.css'
import useSWR from 'swr'
import { useRouter } from 'next/router'


const fetcher = (...args) => fetch(...args).then(res => res.json())


const EquipmentYears = () => {
  const router = useRouter()
  const { data, error } = useSWR('/api/equipment', fetcher,{refreshInterval: 1000})
  const {year}=router.query

console.log(data);

  return (
    <div className={classes.year}>
     {data?.equipments.map((equipment) =>  <Link key={equipment._id} className={classes.yearlistLink} href={`/dashboard/${equipment.year}/equipments`}> <li className={classes.yearlist}> {equipment.year}</li></Link>) }
     </div>
  )
}

export default EquipmentYears