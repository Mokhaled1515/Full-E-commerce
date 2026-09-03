

import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios.js';
import SummaryApi from '../components/Common/SummerCommon.js';
import AxiosToastError from '../utils/AxiosToatsError.js';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verify-otp",{
                  state : data
                })
                setData({
                    email : "",
                })
                
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }

    return (
        <section className='flex items-center justify-center w-full container mx-auto px-2 dark:text-white'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 dark:bg-black'>
                <p className='font-semibold text-lg'>Forgot Password </p>
                <form className='grid gap-4 py-4 w-full' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email: </label>
                        <input
                            type='email'
                            id='email'
                            className='bg-blue-50 dark:text-green-400 dark:bg-transparent dark:placeholder:text-neutral-700 p-2 border rounded outline-none focus:border-primary-200 w-full'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
             
                    <button disabled={!valideValue} className={` cursor-pointer ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white py-2 w-full rounded font-semibold my-3 tracking-wide`}>Send Otp</button>

                </form>

                <p>
                    Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default ForgotPassword

