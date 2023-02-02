import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from 'Components/Header/Header'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const CropList = () => {
  const router = useRouter()
  const {year}=router.query
  const { data, error } = useSWR(`/api/crops/year/${year}`, fetcher,{refreshInterval: 1000})
  console.log(data?.crops);
  return (
    <div>
      <Header/>

      {data?.crops.map((crop)=><ul key={crop._id}>
        <li><Link href={''}> {crop.cropName}</Link> </li>
        </ul>)}

    </div>
  )
}

export default CropList