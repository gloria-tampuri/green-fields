import React from 'react'
import classes from './ManageUsers.module.css'
import { useRouter } from 'next/router'

const ManageUsers = () => {
  const router = useRouter()

  return (
    <div className={classes.manage}>
        <h1>Admin</h1>
        <button onClick={()=> router.push('/dashboard/users')}>Manage Users</button>
    </div>
  )
}

export default ManageUsers