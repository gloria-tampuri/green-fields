import React from 'react'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'
import useSWR from 'swr'
import classes from './UserTable.module.css'
const fetcher = (...args) => fetch(...args).then(res => res.json())

const UserTable = () => {
    const router = useRouter()
    const { data, error } = useSWR(`/api/users`, fetcher, { refreshInterval: 1000 })

   

    return (
        <div>
             <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={()=>router.back()}/> <h2> {data && data.batchName}</h2> <h1></h1>
      </div>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>IsBanned</th>
                    </tr>
                </thead>
                <tbody className={classes.tablebody}>
                        {data && data.users.map(user =>
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.isBanned === false ? "Allowed" : "Not Allowed"}</td>
                            </tr>
                        )}
                    
                </tbody>
            </table>
        </div>
    )
}

export default UserTable