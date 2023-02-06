import React from 'react'
import classes from './Summary.module.css'

const CropSummary = ({crop}) => {
  // const {cropName,cropId, numberOfBags, startDate, endDate} = crop
  console.log(crop);
  return (
    <div>
        <ul className={classes.sumarryList}>
            {/* <li>Crop Number: <span>{crop && crop.cropId}</span></li> */}
            <li>Crop Name: <span>{crop && crop.cropName}</span></li>
            <li>Start Date: <span>{crop && crop.startDate}</span></li>
            <li>End Date: <span>{crop && crop.endDate}</span></li>
            <li>Number of Harvested bags: <span>{crop && crop.numberOfBags}</span></li>
            <li>Number of Bags Sold: <span>{}</span></li>
            <li>Total Sales: <span>{}</span></li>
            <li>Total Expenditure: <span>{}</span></li>
            <li>Total Miscellaneous: <span>{}</span></li>
            <li>Remaining Bags: <span>{}</span></li>
        </ul>
    </div>
  )
}

export default CropSummary