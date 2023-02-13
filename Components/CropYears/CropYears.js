import React from 'react'
import classes from './CropYears.module.css'
import useSWR from 'swr'
import Link from 'next/link'


const fetcher = (...args) => fetch(...args).then(res => res.json())

const CropYears = () => {
    const { data, error } = useSWR('/api/crops/year', fetcher,{refreshInterval: 1000})
   
  return (
    <div  className={classes.year}>
        {data && data.map((year,i)=><ul key={i}>
        <Link className={classes.yearlistLink} href={`/dashboard/${year}/crops`}> <li className={classes.yearlist}> {year} </li></Link>
        </ul>)}

    </div>
  )
}

export default CropYears