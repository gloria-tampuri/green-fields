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

    const { data: session, status } = useSession()

    return (
        <div>

            <div className={classes.MiscellaneousList}>
                <div className={classes.Miscellaneoushead}>
                    <h2>Total Miscellaneous</h2>
                    <h2 className={classes.totalMiscellaneous}>432432</h2>
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
                            <tr>
                                <td>23/45/5</td>
                                <td>dsgdgds</td>
                                <td>434</td>
                                {session?.user?.role === 'ADMIN' && <td className={classes.actions}> <AiOutlineEdit /> <span><AiOutlineDelete onClick={showDeleteModal} /></span></td>}
                            </tr>

                        </tbody>
                    </table>

                </div>
                {deleteModal && <Delete />}
            </div>

        </div>
    )
}

export default MiscellaneousList