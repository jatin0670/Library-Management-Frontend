import React from 'react'

const ReturnBook = () => {
  return (
    <div className=' pt-16 bg-[#F2FAFF] h-screen w-full flex flex-col items-center gap-10'>
      <h1 className='p-3 text-4xl text-[#294666] font-bold flex items-center justify-center '>Return Books </h1>

      <form className='py-2 h-3/4 w-2/5 bg-white flex flex-col items-center justify-around rounded-md
       shadow-sm shadow-black'>

         <div className='w-3/4 flex items-center justify-around outline outline-gray-400 p-2 rounded-md'>
          <label className=' text-xl' htmlFor="">Student Name: </label>
          <select className=''>
           <option value="">Select Student</option>
           <option>Jatin</option>
           <option>Vivek  </option>
         </select>
         </div>
       
         <div className='w-3/4 flex items-center justify-around outline outline-gray-400 rounded-md p-2'>
          <label className=' text-xl' htmlFor="">Select Book: </label>
          <select>
           <option value="">Select Book</option>
           <option>Java Basics</option>
           <option>React Guide</option>
         </select>
         </div>
       
         <div className='w-3/4 flex flex-col items-center justify-around outline outline-gray-400 rounded-md p-2'>
             <h1>Issue: </h1>
             <h1>Due: </h1>
             <h1>Fine: </h1>
         </div>
       
         <button className=' py-2 px-4 bg-[#294666] text-white font-bold rounded-md hover:scale-95 cursor-pointer shadow-sm shadow-black' type="submit">Return Book</button>
      </form>
    </div>
  )
}

export default ReturnBook
