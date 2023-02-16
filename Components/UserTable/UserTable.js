import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import classes from './UserTable.module.css'
const fetcher = (...args) => fetch(...args).then(res => res.json())

const UserTable = () => {
    const router = useRouter()
    const { data, error } = useSWR(`/api/users`, fetcher, { refreshInterval: 1000 })

     const {data: session} = useSession()
     console.log(session?.user);

    const roleHandler =async (role, user) => {
        // setUserId(userId)
        const userUpdate = {
            name: user.name,
            email: user.email,
            image: user.image,
            isBanned:user.isBanned,
            emailVerified: user.emailVerified,
            role: role,
        }
        const response = await fetch(`/api/users/${user._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: (JSON.stringify(userUpdate))
        })

    }

    const isBannedHandler = async (banned, user) =>{
        let isBanned;
        banned === "true" ? isBanned = true : isBanned = false
         
        const userUpdate = {
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.emailVerified,
            role: user.role,
            isBanned:isBanned,
        }
        const response = await fetch(`/api/users/${user._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: (JSON.stringify(userUpdate))
        })

        console.log(response);
    }



    return (
        <div>
            <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={() => router.back()} /> <h2> {data && data.batchName}</h2> <h1></h1>
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
                            <td>
                                {/* {user.role} */}
                                <select onChange={(e) => roleHandler(e.target.value, user)} defaultValue={user.role}>
                                    <option value='ADMIN'>ADMIN</option>
                                    <option value='USER'>USER</option>
                                </select>
                            </td>
                            <td>
                                <select onChange={(e) => isBannedHandler(e.target.value, user)} defaultValue={user.isBanned}>
                                <option value={false}>Allowed</option>
                                    <option value={true}>Not Allowed</option>
                                </select>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    )
}

export default UserTable