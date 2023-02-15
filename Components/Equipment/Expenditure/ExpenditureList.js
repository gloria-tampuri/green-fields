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
  return (
    <div className={classes.ExpenditureList}>
    <div className={classes.Expenditurehead}>
      <h2>Total Expenditure</h2> 
      <h2 className={classes.totalExpenditure}>43434</h2>
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
             <tr >
                 <td>3/5/7</td>
                 <td>gfee</td>
                 <td>46546</td>
                 {session?.user?.role === 'ADMIN' &&   <td className={classes.actions}> <AiOutlineEdit 
                //  onClick={()=>passUpdateData(expenditure)}
                 /> <span><AiOutlineDelete onClick={showDeleteModal}/></span></td> }  
             </tr>
              
            </tbody>
        </table>
         
    </div>
{deleteModal && <Delete/>}

    </div>
  )
}

export default ExpenditureList