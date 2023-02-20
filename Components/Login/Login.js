import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import classes from './Login.module.css'
import Header from 'Components/Header/Header'
import google from '/public/google.png'
import Logo from '/public/greenfieldsLogo.png'
import Image from 'next/image'

const Login = () => {
  const { data: session } = useSession()
const currentYear = new Date().getFullYear()

  return (
    <div className={classes.login}>
      {/* <Header /> */}
      <div className={classes.logoBanner}>
      <Image className={classes.Logo} src={Logo} alt='logo' width={250} height={250}/>
      </div>
      <h1 className={classes.welcome}>
        Welcome To Green-Fields Staff Portal
      </h1>
      <div onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })} className={classes.medium}>
        <p> Sign in with</p>
        <Image src={google} alt='google sign' width={30} height={30} />
      </div>
      <div className={classes.footer}>
        <p>Green-Fields @{currentYear}</p>
      </div>
    </div>
  )

}

export default Login

// return (
//   <div><p>Welcome,{session.user.email}</p>
//     <button onClick={()=>signOut()}>Sign out</button>
//   </div>
// )
// }else
// return (
// <div>
//   <p>You are not signed in</p>
//   <button onClick={()=>signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })}>Sign in</button>
// </div>
// )