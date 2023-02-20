import Link from 'next/link'
import React from 'react'
import classes from './EquipmentYears.module.css'
import useSWR from 'swr'
import { useRouter } from 'next/router'


const fetcher = (...args) => fetch(...args).then(res => res.json())


const EquipmentYears = () => {
  const router = useRouter()
  const { data, error } = useSWR('/api/equipment/year', fetcher,{refreshInterval: 1000})


  return (
    <div className={classes.year}>
     {data && data.map((year,i) =>  <Link key={i} className={classes.yearlistLink} href={`/dashboard/${year}/equipments`}> <li className={classes.yearlist}> {year}</li></Link>) }
     </div>
  )
}

export default EquipmentYears