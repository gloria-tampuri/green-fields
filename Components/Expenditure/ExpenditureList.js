import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import classes from './ExpenditureList.module.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const ExpenditureList = () => {
    const router = useRouter()
 
  const[totalAmount, setTotalAmount] =useState(0)

  const { data, error } = useSWR(`/api/crops/${router.query.cropId}`, fetcher,{refreshInterval: 1000})


  useEffect(() =>{
    const allAmounts = data?.crop?.expenditure?.map(expenditure => +expenditure.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalAmount(allAmounts)
  },[data])

  return (
     <div className={classes.ExpenditureList}>
    <div className={classes.Expenditurehead}>
      <h2>Total Expenditure</h2> 
      <h2 className={classes.totalExpenditure}>{totalAmount && totalAmount.toFixed(2)}</h2>
      </div>

      <div className={classes.List}>

        <table className={classes.expendituresection}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Expenditure Type</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
            {data && data?.crop?.expenditure.map((expenditure,index)=> <tr>
                 <td>{expenditure.date}</td>
                 <td>{expenditure.expenditureType}</td>
                 <td>{expenditure.amount}</td>
                 <td className={classes.actions}> <AiOutlineEdit/> <span><AiOutlineDelete/></span></td>
             </tr>
               )}
            </tbody>
        </table>
         
    </div>
    </div>
  )
}

export default ExpenditureList