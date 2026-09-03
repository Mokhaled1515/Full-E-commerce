import React from 'react'
import NothingImage from "../assets/nothing here yet.webp"
const NoData = () => {
  return (
    <div className='flex justify-center items-center flex-col p-4 gap-2'>
       <img src={NothingImage}
        alt="no data"
        className='w-36'
        />
        <p className='text-neutral-600'>No Data</p>
    </div>
  )
}

export default NoData