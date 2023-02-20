import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { signOut, useSession } from "next-auth/react"
import classes from './MiscellaneousList.module.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import Delete from 'Components/Delete/Delete'
import { DeleteContext } from 'Context/DeleteContext'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const MiscellaneousList = () => {
    const router = useRouter()
    const deleteCtx = useContext(DeleteContext)
    const { hideDeleteModal, showDeleteModal, deleteModal } = deleteCtx
    const {equipmentId} = router.query

    const { data: session, status } = useSession()

    const[totalAmount, setTotalAmount] =useState(0)
    const [selectedId, setSelectedId] = useState()

  const { data, error } = useSWR(`/api/equipment/${router.query.equipmentId}`, fetcher,{refreshInterval: 1000})

  const deleteHandler = (id) =>{
    setSelectedId(id);
    showDeleteModal()
  }

  useEffect(() =>{
    const allAmounts = data?.equipment?.miscellaneous?.map(miscellaneous => +miscellaneous.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalAmount(allAmounts)
  },[data])

    return (
        <div>

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
                        {session?.user?.role === 'ADMIN' &&          <th>Actions</th>}              
                                  </tr>
                        </thead>
                        <tbody>
                        {data && data?.equipment?.miscellaneous.map((miscellaneous)=> <tr  key={miscellaneous.miscellaneousId
}>
                                <td>{miscellaneous.date}</td>
                                <td>{miscellaneous.miscellaneousType}</td>
                                <td>{miscellaneous.amount}</td>
                                {session?.user?.role === 'ADMIN' && <td className={classes.actions}>  <span><AiOutlineDelete onClick={() => deleteHandler(miscellaneous?.miscellaneousId)} /></span></td>}
                            </tr>)}

                        </tbody>
                    </table>

                </div>
                {deleteModal && <Delete type='equipment' typeId={equipmentId} routeUrl="miscellaneous" selectedId={selectedId}/>}
            </div>

        </div>
    )
}

export default MiscellaneousList