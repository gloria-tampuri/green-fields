import React from 'react'
import classes from './Summary.module.css'

const CropSummary = ({crop}) => {
  // const {cropName,cropId, numberOfBags, startDate, endDate} = crop
  console.log(crop);
  return (
    <div>
        <ul className={classes.sumarryList}>
            <li>Batch Number: <span>{crop && crop.cropId}</span></li>
            <li>Batch Name: <span>{crop && crop.cropName}</span></li>
            <li>Start Date: <span>{crop && crop.startDate}</span></li>
            <li>End Date: <span>{crop && crop.endDate}</span></li>
            <li>Start Fingerlings Number: <span>{crop && crop.numberOfBags}</span></li>
            <li>Number of Fishes Sold: <span>{}</span></li>
            <li>Total Sales: <span>{}</span></li>
            <li>Total Expenditure: <span>{}</span></li>
            <li>Mortality: <span>{}</span></li>
            <li>Remaining Fishes: <span>{}</span></li>
        </ul>
    </div>
  )
}

export default CropSummary