import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import classes from './MiscellaneousList.module.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const MiscellaneousList = () => {
    const router = useRouter()
 
    const[totalAmount, setTotalAmount] =useState(0)
  
    const { data, error } = useSWR(`/api/crops/${router.query.cropId}`, fetcher,{refreshInterval: 1000})
  
  
    useEffect(() =>{
      const allAmounts = data?.crop?.miscellaneous?.map(miscellaneous => +miscellaneous.amount).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
      setTotalAmount(allAmounts)
    },[data])
  return (
    <div className={classes.MiscellaneousList}>
    <div className={classes.Miscellaneoushead}>
      <h2>Total Miscellaneous</h2> 
      <h2 className={classes.totalMiscellaneous}>{totalAmount && totalAmount.toFixed(2)}</h2>
      </div>

      <div className={classes.List}>

        <table className={classes.Miscellaneoussection}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Miscellaneous Type</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
            {data && data?.crop?.miscellaneous.map((miscellaneous)=> <tr
             key={miscellaneous.miscellaneousId}>
                 <td>{miscellaneous.date}</td>
                 <td>{miscellaneous.miscellaneousType}</td>
                 <td>{miscellaneous.amount}</td>
                 <td className={classes.actions}> <AiOutlineEdit/> <span><AiOutlineDelete/></span></td>
             </tr>
               )}
            </tbody>
        </table>
         
    </div>
    </div>
  )
}

export default MiscellaneousList