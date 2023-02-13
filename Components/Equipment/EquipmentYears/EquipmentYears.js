import Link from 'next/link'
import React from 'react'
import classes from './EquipmentYears.module.css'

const EquipmentYears = () => {
  return (
    <div className={classes.year}>
      <Link className={classes.yearlistLink} href={`/dashboard/2045/equipments`}> <li className={classes.yearlist}> 2023</li></Link>
     </div>
  )
}

export default EquipmentYears