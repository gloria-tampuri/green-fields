import React, { useEffect, useState } from 'react'
import classes from './Summary.module.css'

const EquipmentSummary = ({equipment}) => {


  return (
    <div>
           <ul className={classes.sumarryList}>
        {/* <li>Crop Number: <span>{crop && crop.cropId}</span></li> */}
        <li>Equipment Name: <span>{equipment&&equipment.equipmentType}</span></li>
        <li>Model: <span>{equipment&&equipment.model}</span></li>
        <li>Make Year: <span>{equipment&&equipment.makeYear}</span></li>
        <li>Date Purchased: <span>{equipment&&equipment.datePurchased}</span></li>
        <li>Inflows:<span></span></li>
        <li>Expenditure:<span></span></li>
        <li>Miscellaneous:<span></span></li>
      </ul>
    </div>
  )
}

export default EquipmentSummary