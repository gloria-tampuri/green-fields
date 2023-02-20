import AddCrop from 'Components/AddCrop/AddCrop'
import classes from './Dashboard.module.css'
import CropYears from 'Components/CropYears/CropYears'
import React, { useState } from 'react'
import AddEquipment from 'Components/Equipment/AddEquipment/AddEquipment'
import EquipmentYears from 'Components/Equipment/EquipmentYears/EquipmentYears'
import { useRouter } from 'next/router'


const Dashboard = () => {
  const router =useRouter()
  const [type, setType] = useState(true)
  const changeTypeToEquip = () => {
    setType(false)
  }
  const changeTypeToCrop = () => {
    setType(true)
  }
  
  return (
    <div>
      <div className={classes.cropequip}>
        <h2 className={type ? classes.option : ''} 
        onClick={changeTypeToCrop}>Crops</h2>
        <h2 className={type ?'': classes.option} 
        onClick={changeTypeToEquip}>Equipments</h2>
      </div>
      {type ? <div><AddCrop />
        <CropYears /></div> : <div> <AddEquipment/> <EquipmentYears/> </div>}
    </div>
  )
}

export default Dashboard;
