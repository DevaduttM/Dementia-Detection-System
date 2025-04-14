import React from 'react'
import Image from 'next/image'

const Loading = ({message}) => {
  return (
    <>
        <div className="fixed top-0 left-0 z-100 h-screen w-screen bg-[#00000083] flex items-center justify-center">
            <div className="h-1/2 aspect-square bg-white rounded-xl flex-col flex items-center gap-10 justify-center">
                <Image 
                src="/loading.gif"
                alt="loading"
                width={50}
                height={50}
                />
                <h1 className='font-bodoni-moda text-black text-3xl'>{message}</h1>
            </div>
        </div>
    </>
  )
}

export default Loading