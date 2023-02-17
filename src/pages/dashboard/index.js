import React from 'react'
import { signOut, useSession, getSession } from "next-auth/react"
import Header from 'Components/Header/Header';
import Dashboard from 'Components/Dashboard/Dashboard';
import ManageUsers from 'Components/ManageUsers/ManageUsers';
import Banned from 'Components/Banned/Banned';
import { useRouter } from 'next/router';

const DashboardPage = ({ session }) => {
  const { data } = useSession()
  const router = useRouter()

  // let landingPage;

  // if (data?.user?.isBanned) {
  //   router.push('/banned')
  // } else {
  //   landingPage = <div>
  //     {session?.user?.role === 'ADMIN' && <div>
  //       <ManageUsers />
  //     </div>}
  //     <Dashboard />
  //   </div>
  // }

  return (
    <>
      <Header />
      <div>
      {session?.user?.role === 'ADMIN' && <div>
        <ManageUsers />
      </div>}
      <Dashboard />
    </div>
    </>
  )
}

export default DashboardPage

export async function getServerSideProps(context) {
  // console.log(context.session);
  const session = await getSession({
    req: context.req
  })
  

  if(session?.user?.isBanned){
    return {
      redirect: {
        destination: '/banned',
        permanent: false
      }
    }
  }

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}