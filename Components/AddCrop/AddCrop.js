import React from 'react'
import classes from './AddCrop.module.css'
import Link from 'next/link'
import {AiOutlinePlus} from 'react-icons/ai'

const AddCrop = () => {
    return (
        <div>
            <div className={classes.AddCrop}>
                <Link href='/dashboard/addcrop' className={classes.addCropLink}><AiOutlinePlus className={classes.plus} /> <h2>ADD CROP</h2>
                </Link>
            </div>
        </div>
    )
}

export default AddCrop