import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'


const fetcher = (...args) => fetch(...args).then(res => res.json())

const CropYears = () => {
    const { data, error } = useSWR('/api/crops/year', fetcher,{refreshInterval: 1000})
   
  return (
    <div>
        {data && data.map((year,i)=><ul key={i}>
        <li><Link href={`/dashboard/${year}`}> {year}</Link> </li>
        </ul>)}

    </div>
  )
}

export default CropYears