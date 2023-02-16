import React,{useEffect, useState, useContext} from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { DeleteContext } from 'Context/DeleteContext'
import { signOut, useSession } from "next-auth/react"
import classes from './ExpenditureList.module.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import Delete from 'Components/Delete/Delete'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const ExpenditureList = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const deleteCtx = useContext(DeleteContext)
  const{ hideDeleteModal,showDeleteModal,deleteModal}=deleteCtx
   

  const[totalAmount, setTotalAmount] =useState(0)
  const [selectedExpenditureId, setSelectedExpenditureId] = useState()

  const deleteHandler = (id) =>{
    setSelectedExpenditureId(id);
    showDeleteModal()
  }

  const { data, error } = useSWR(`/api/equipment/${router.query.equipmentId}`, fetcher,{refreshInterval: 1000})

  useEffect(() =>{
    const allAmounts = data?.equipment?.expenditure?.map(expenditure => +expenditure.amount).reduce(
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
                    {session?.user?.role === 'ADMIN' &&  <th>Actions</th> }
                </tr>
            </thead>
            <tbody>
            {data && data?.equipment?.expenditure.map((expenditure)=> <tr  key={expenditure.expenditureId}>
                 <td>{expenditure.date}</td>
                 <td>{expenditure.expenditureType}</td>
                 <td>{expenditure.amount}</td>
                 {session?.user?.role === 'ADMIN' &&   <td className={classes.actions}> <AiOutlineEdit 
                //  onClick={()=>passUpdateData(expenditure)}
                 /> <span><AiOutlineDelete onClick={()=>deleteHandler(expenditure.expenditureId && expenditure.expenditureId)}/></span></td> }  
             </tr>)}
              
            </tbody>
        </table>
         
    </div>
{deleteModal && <Delete routeUrl="expenditure" selectedId={selectedExpenditureId}/>}

    </div>
  )
}

export default ExpenditureList