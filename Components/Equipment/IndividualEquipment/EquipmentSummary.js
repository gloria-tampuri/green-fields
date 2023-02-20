import React, { useEffect, useState } from 'react'
import classes from './Summary.module.css'

const EquipmentSummary = ({equipment}) => {

  const[totalInflow, setTotalInflow]=useState(0)
   const [totalExpenditure, setTotalExpenditure] = useState(0)
  const [totalMiscellaneous, setTotalMiscellaneous] = useState(0)

  useEffect(()=>{
    if (equipment != null || equipment !== undefined) {
      const totalInflowAmount = equipment?.inflows?.map(inflow => +inflow.amount).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0)

      const totalExpenditureAmount = equipment?.expenditure?.map(expenditure => +expenditure.amount).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0)

        const totalMiscellaneousAmount= equipment?.miscellaneous?.map(miscellaneous => +miscellaneous.amount).reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0 
        )

        setTotalInflow(totalInflowAmount)
      setTotalExpenditure(totalExpenditureAmount)
      setTotalMiscellaneous(totalMiscellaneousAmount)
          }
  },[equipment])

  return (
    <div>
           <ul className={classes.sumarryList}>
        {/* <li>equipment Number: <span>{crop && crop.cropId}</span></li> */}
        <li>Equipment Name: <span>{equipment&&equipment.equipmentType}</span></li>
        <li>Model: <span>{equipment&&equipment.model}</span></li>
        <li>Make Year: <span>{equipment&&equipment.makeYear}</span></li>
        <li>Date Purchased: <span>{equipment&&equipment.datePurchased}</span></li>
        <li>Inflows:<span>{totalInflow}</span></li>
        <li>Expenditure:<span>{totalExpenditure}</span></li>
        <li>Miscellaneous:<span>{totalMiscellaneous}</span></li>
        <li>Added By: <span>{equipment && equipment.createdBy.name}</span></li>
      </ul>
    </div>
  )
}

export default EquipmentSummary