import miscellaneous from '@/pages/dashboard/[year]/[cropId]/miscellaneous';
import React, { useEffect, useState } from 'react'
import classes from './Summary.module.css'

const CropSummary = ({ crop }) => {
  // const {cropName,cropId, numberOfBags, startDate, endDate} = crop
  console.log(crop);

  // const[totalHarvestedbags, setTotalHarvestedbags]=useState(0)
  const [soldBags, SetSoldBags] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const [totalExpenditure, setTotalExpenditure] = useState(0)
  const [totalMiscellaneous, setTotalMiscellaneous] = useState(0)
  const [remainingBags, setRemainingBags] = useState(0)

  useEffect(() => {
    if (crop != null || crop !== undefined) {
      const totalSalesAmount = crop?.sales?.map(sale => +sale.amount).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0)

      const totalExpenditureAmount = crop?.expenditure?.map(expenditure => +expenditure.amount).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0)

        const totalMiscellaneousAmount= crop?.miscellaneous?.map(miscellaneous => +miscellaneous.amount).reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0 
        )

        const totalBagsSold = crop?.sales?.map(sale => +sale.numberOfBags).reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0)
          console.log(totalBagsSold);

      setTotalSales(totalSalesAmount)
      setTotalExpenditure(totalExpenditureAmount)
      setTotalMiscellaneous(totalMiscellaneousAmount)
      SetSoldBags(totalBagsSold)
    }

    else { return }
  }, [crop]);

  // useEffect(()=>{
  //   const bagsLeft = crop?.numberofbags - totalBagsSold
  //   bagsLeft > 0 ? setRemainingBags(bagsLeft) : setRemainingBags(0)
  // },[crop,soldBags])
  useEffect(()=>{
    const bagsLeft = crop?.numberofbags - soldBags
    bagsLeft >0? setRemainingBags(bagsLeft):setRemainingBags(0)
  },[crop,soldBags])
  
  return (
    <div>
      <ul className={classes.sumarryList}>
        {/* <li>Crop Number: <span>{crop && crop.cropId}</span></li> */}
        <li>Crop Name: <span>{crop && crop.cropName}</span></li>
        <li>Start Date: <span>{crop && crop.startDate}</span></li>
        <li>End Date: <span>{crop && crop.endDate}</span></li>
        <li>Number of Harvested bags: <span>{crop && crop.numberofbags}</span></li>
        <li>Number of Bags Sold: <span>{soldBags}</span></li>
        <li>Total Sales: <span>{totalSales}</span></li>
        <li>Total Expenditure: <span>{totalExpenditure}</span></li>
        <li>Total Miscellaneous: <span>{ totalMiscellaneous}</span></li>
        <li>Remaining Bags: <span>{remainingBags}</span></li>
      </ul>
    </div>
  )
}

export default CropSummary