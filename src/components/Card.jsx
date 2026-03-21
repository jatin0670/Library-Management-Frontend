import React from 'react'

const Card = ({No, text}) => {
  return (
    <div className=' z-10 w-64 h-40 bg-[#294666] flex flex-col items-center justify-center gap-2 text-white
     shadow-lg shadow-black'>
      <h1 className=' text-4xl font-bold'>{No}</h1>
      <h3 className=' text-xl'>{text}</h3>
    </div>
  )
}

export default Card
