import Header from 'Components/Header/Header'
import Link from 'next/link'
import React from 'react'
import classes from './Banned.module.css'

const Banned = () => {
  return (
    <div>
        <Header/>
        <h2 className={classes.about}>
            This website is for stakeholders of the Green Fields farm Project.
        </h2>
        <p className={classes.access}>To be allowed access, please contact the administrator Ben at  <Link href='mailto:benjaymah@gmail.com'>benjaymah@gmail.com</Link>. Please logout and login again after being granted access. Thank you</p>
    </div>
  )
}

export default Banned