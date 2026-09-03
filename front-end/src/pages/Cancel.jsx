import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='m-2 dark:m-0 dark:mx-auto dark:bg-red-400 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-red-800 dark:text-black font-bold text-lg text-center'>Order Cancel</p>
        <Link to="/" className="border border-red-900 dark:hover:text-neutral-300 text-red-900 hover:bg-red-900 hover:text-white transition-all px-4 py-1">Go To Home</Link>
    </div>
  )
}

export default Cancel