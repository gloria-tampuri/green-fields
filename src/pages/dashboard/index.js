import React from 'react'
import { signOut, useSession } from "next-auth/react"

const DashboardPage = () => {
    const { data: session, status } = useSession()

    console.log(session?.user?.role);

  return (
   <>
    <div>DashboardPage</div>
   {session?.user?.role === 'ADMIN' && <div>
        <h1>Only show if the user role is an ADMIN</h1>
    </div>}
    <button onClick={()=>signOut()}>Sign out</button></>
  )
}

export default DashboardPage