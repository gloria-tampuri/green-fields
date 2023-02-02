import React from 'react'
import classes from './Header.module.css'
import Logo from '/public/greenfieldsLogo.png'
import Image from 'next/image'
import Link from 'next/link'
import {useSession,signOut} from 'next-auth/react'

const Header = () => {
    const {data:session,status}=useSession()
    
  return (
    <div className={classes.header}>
      <div className={classes.header1}>
      <Image className={classes.Logo} src={Logo} alt='logo' width={50} height={50}/>
       <h3> Green-Fields Agric</h3>
      </div>
     {status==='authenticated' && <button  onClick={()=>signOut(('google', {callbackUrl: 'http://localhost:3000'}))} className={classes.signOut}>Sign out</button>}
    </div>
  )
}

export default Header
  