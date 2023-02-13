import React from 'react'
import classes from './AddEquipment.module.css'
import Link from 'next/link'
import {AiOutlinePlus} from 'react-icons/ai'

const AddEquipment = () => {
  return (
    <div>
      <div className={classes.AddEquip}>
    <Link href='/dashboard/addequip' className={classes.addEquipLink}><AiOutlinePlus className={classes.plus} /> <h2>ADD Equipment</h2>
    </Link>
</div></div>
  )
}

export default AddEquipment