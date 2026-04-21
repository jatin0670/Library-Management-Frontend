import React from 'react'

const Card = ({No, text, icon}) => {
  return (
    <div className=' z-10 p-7 w-64 h-40 bg-[#3666ad] flex flex-col items-start justify-center gap-2 text-white
     shadow-lg shadow-black'>
      <div className=' flex gap-2 '>
        <span>{icon}</span>
        <h3 className=' text-lg'>{text}</h3>
      </div>
      <h1 className=' text-5xl font-bold'>{No}</h1>
      
    </div>
  )
}

export default Card