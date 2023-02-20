import React,{useEffect, useState, useContext} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { signOut, useSession } from "next-auth/react"
import classes from './InflowList.module.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { DeleteContext } from 'Context/DeleteContext'
import Delete from 'Components/Delete/Delete'


const fetcher = (...args) => fetch(...args).then(res => res.json())

const InflowsList = () => {
  const router = useRouter()
 const {equipmentId} = router.query


  const { data: session, status } = useSession()
  const deleteCtx = useContext(DeleteContext)
  const{ hideDeleteModal,showDeleteModal,deleteModal}=deleteCtx

  const [selectedId, setSelectedId] = useState()
  const[totalAmount, setTotalAmount] =useState(0)

  const { data, error } = useSWR(`/api/equipment/${router.query.equipmentId}`, fetcher,{refreshInterval: 1000})

  const deleteHandler = (id) =>{
    setSelectedId(id);
    showDeleteModal()
  }

  useEffect(() =>{
    const allAmounts = data?.equipment?.inflows?.map(inflow => +inflow.amount).reduce(
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
                 <th>Work Type</th>
                 <th>Amount</th>
                 {session?.user?.role === 'ADMIN' &&  <th>Actions</th> }
                
             </tr>
         </thead>
         <tbody>
          {data && data?.equipment?.inflows.map((inflow)=> <tr  key={inflow.inflowId}>
              <td>{inflow.workDate}</td>
              <td>{inflow.workType}</td>
              <td>{inflow.amount}</td>
              {session?.user?.role === 'ADMIN' &&  <td className={classes.actions}>  <span><AiOutlineDelete onClick={() => deleteHandler(inflow?.inflowId)}/></span></td>}    
          </tr>)}
         
         </tbody>
     </table>
</div>
{deleteModal && <Delete type='equipment' typeId={equipmentId} routeUrl="inflows" selectedId={selectedId}/>}
 </div>
  )
}

export default InflowsList