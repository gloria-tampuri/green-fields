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
  const {cropId} = router.query

  const [selectedId, setSelectedId] = useState()

  const deleteHandler = (id) => {
    setSelectedId(id);
    showDeleteModal()
  }

  const { data: session, status } = useSession()
  const [totalAmount, setTotalAmount] = useState(0)

  const { data, error } = useSWR(`/api/crops/${router.query.cropId}`, fetcher, { refreshInterval: 1000 })


  useEffect(() => {
    const allAmounts = data?.crop?.miscellaneous?.map(miscellaneous => +miscellaneous.amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
    setTotalAmount(allAmounts)
  }, [data])



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
              {session?.user?.role === 'ADMIN' && <th>Actions</th>}                </tr>
          </thead>
          <tbody>
            {data && data?.crop?.miscellaneous.map((miscellaneous) => <tr
              key={miscellaneous.miscellaneousId}>
              <td>{miscellaneous.date}</td>
              <td>{miscellaneous.miscellaneousType}</td>
              <td>{miscellaneous.amount}</td>
              {session?.user?.role === 'ADMIN' && <td className={''}><span><AiOutlineDelete onClick={() => deleteHandler(miscellaneous.miscellaneousId && miscellaneous.miscellaneousId)}/></span></td>}
            </tr>
            )}
          </tbody>
        </table>

      </div>
      {deleteModal && <Delete type='crops' typeId={cropId} routeUrl="miscellaneous" selectedId={selectedId} />}
    </div>
  )
}

export default MiscellaneousList