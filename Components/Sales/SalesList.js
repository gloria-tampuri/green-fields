import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import classes from './SalesList.module.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'


const fetcher = (...args) => fetch(...args).then(res => res.json())

const SalesList = () => {
  const router = useRouter()
 
  const[totalAmount, setTotalAmount] =useState(0)

  const { data, error } = useSWR(`/api/crops/${router.query.cropId}`, fetcher,{refreshInterval: 1000})
  // const {}= data
 

  useEffect(() =>{
    const allAmounts = data?.crop?.sales?.map(sale => +sale.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalAmount(allAmounts)
  },[data])
  return (
    <div className={classes.SalesList}>
    <div className={classes.saleshead}>
      <h2>Total Sales</h2> 
      <h2 className={classes.totalSales}>{totalAmount && totalAmount.toFixed(2)}</h2>
      </div>

      <div className={classes.List}>
    
<table className={classes.salesection}>
         <thead>
             <tr>
                 <th>Date</th>
                 <th>Cust Name</th>
                 <th>No. Bags</th>
                 <th>Amount</th>
                 <th>Actions</th>
             </tr>
         </thead>
         <tbody>
         {data && data?.crop?.sales.map((sale)=> <tr  key={sale.saleId}>
              <td>{sale.date}</td>
              <td>{sale.customerName}</td>
              <td>{sale.numberOfBags}</td>
              <td>{sale.amount}</td>
              <td className={classes.actions}> <AiOutlineEdit/> <span><AiOutlineDelete/></span></td>
          </tr>
            )}
         </tbody>
     </table>


      </div>
 </div>
  )
}

export default SalesList