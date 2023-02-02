import React from 'react'
import { signOut, useSession } from "next-auth/react"
import Header from 'Components/Header/Header';
import Dashboard from 'Components/Dashboard/Dashboard';
import ManageUsers from 'Components/ManageUsers/ManageUsers';

const DashboardPage = () => {
    const { data: session, status } = useSession()

  

  return (
   <>
    <Header/>
   {session?.user?.role === 'ADMIN' && <div>
    <ManageUsers/>
    </div>}
    <Dashboard/>
    </>
  )
}

export default DashboardPage