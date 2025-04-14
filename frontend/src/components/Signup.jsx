import React from 'react'
import Link from 'next/link'

const Signup = () => {
  return (
    <>
        <div className="h-[100dvh] w-screen flex items-center justify-center bg-[#ececec]">
            <div className="bg-[#ffffff] flex justify-center items-center h-[70%] md:w-[30%] w-[90%] shadow-2xl flex-col rounded-xl gap-10">
                <h1 className='text-black md:text-4xl text-2xl -mb-5 w-full text-center flex justify-center items-center'>SignUp</h1>
                <div className="h-[70%] w-full flex flex-col justify-center items-center md:gap-3 gap-1">
                    <label htmlFor="" className='sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm'>Name</label>
                    <input required type="text" className=' h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-5' />
                    <label htmlFor="" className='sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm'>Email Id</label>
                    <input required type="email" className=' h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-5' />
                    <label htmlFor="" className='sm:-mb-3 -mb-1 w-[78%] text-gray-800 md:text-lg text-sm'>Password</label>
                    <input required type="password" className=' h-[10%] md:h-[12%] pl-3 text-black w-[80%] border-[1px] border-[#494949] rounded-lg mb-5' />
                    <button className='h-[12%] w-[80%] bg-[#000000] md:text-lg text-sm text-white rounded-md cursor-pointer hover:shadow-xl transition-all duration-200 ease-in-out'>Sign Up</button>
                    <p className='text-gray-800 mt-3'>Already have an account? <Link href={'/login'} className='text-red-700'>Log In</Link></p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup