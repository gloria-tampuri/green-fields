import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { signOut, useSession } from "next-auth/react"
import { BiArrowBack } from 'react-icons/bi'
import classes from './Equipment.module.css'
import EquipmentSummary from './EquipmentSummary'
import Header from 'Components/Header/Header'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Equipment = () => {
    const router = useRouter()

    const {year,equipmentId} = router.query
    const { data: session, status } = useSession()
 
 
    const { data, error } = useSWR(`/api/equipment/${equipmentId}`, fetcher, { refreshInterval: 1000 })
  

    const getToEdit = () => {
        return router.push(`/dashboard/${year}/equipments/${equipmentId}/update`)
       }

  return (
    <div>
           <Header/>
        <div>
        <BiArrowBack className={classes.back} onClick={() => router.back()} />
        <h1 className={classes.header}>{data?.equipment?.equipmentType}</h1>
        <div className={classes.actions}>
        <div className={classes.actionbtn} onClick={() => router.push(`/dashboard/${year}/equipments/${equipmentId}/inflows`)}>Inflows</div>
        <div className={classes.actionbtn} onClick={() => router.push(`/dashboard/${year}/equipments/${equipmentId}/expenditure`)}>Expenditure</div>
        <div className={classes.actionbtn} onClick={() => router.push(`/dashboard/${year}/equipments/${equipmentId}/miscellaneous`)}>Miscellaneous</div>
      </div>
        </div>
       {session?.user?.role === 'ADMIN' && <div className={classes.edit}><p onClick={getToEdit}>Edit</p></div>}
        <EquipmentSummary equipment={data && data.equipment}/>

    </div>
  )
}

export default Equipment