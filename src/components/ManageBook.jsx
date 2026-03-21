import axios from 'axios'
import React, { useEffect, useState } from 'react'

// add this - http://localhost:8080   to run locally

const ManageBook = () => {  

  const [book, setBook] = useState([])

  const [form, setForm] = useState({
    title: "",
    author: "",
    qty: "",
    available: ""

  })

  const handleChange = (e)=>{
       setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e)=>{
    // e.preventDefault()
     axios.post("http://localhost:8080/book", form)
     .then((response)=>{
        setBook([...book, response.data])
     })
  }

  const deleteBook = (id)=>{
    if(window.confirm("Are you sure you want to delete this record?")){
      axios.delete(`http://localhost:8080/book/${id}`)
      .then(() =>{
        setBook(book.filter((e)=> e.id !== id))
      })
    }
  }

  useEffect(()=>{                                    //data retrieve when page loaded
     axios.get("http://localhost:8080/allbooks")
     .then((response)=>{
         setBook(response.data);
         console.log(response.data);
     })
  }, [])

  return (
    
    <div>

      <div className=' pt-16 bg-[#F2FAFF] h-screen w-full flex flex-col items-center gap-10'>
      <h1 className='p-3 text-4xl text-[#294666] font-bold flex items-center justify-center '>Manage Books </h1>

      <form onSubmit={handleSubmit} className='py-2 h-3/4 w-2/5 bg-white flex flex-col items-center justify-around rounded-md 
      shadow-sm shadow-black' action="">
        <div className=' w-4/5 flex flex-col gap-2'>
          <label className=' text-gray-600 text-2xl font-medium' htmlFor="">Title</label>
          <input name='title' value={form.title} onChange={handleChange} className='px-3 py-2 text-black outline-gray-600 outline rounded-lg' type="text" />
        </div>

        <div className='w-4/5  flex flex-col gap-2'>
          <label className=' text-gray-600 text-2xl font-medium' htmlFor="">Author</label>
          <input name='author' value={form.author} onChange={handleChange} className='px-3 py-2 text-black outline-gray-600 outline rounded-lg' type="text" />
        </div>

        <div className=' w-4/5 flex flex-col gap-2'>
          <label className=' text-gray-600 text-2xl font-medium' htmlFor="">Qty</label>
          <input name='qty' value={form.qty} onChange={handleChange} className='px-3 py-2 text-black outline-gray-600 outline rounded-lg' type="number" />
        </div>

        <div className=' w-4/5 flex flex-col gap-2'>
          <label className=' text-gray-600 text-2xl font-medium' htmlFor="">Available</label>
          <input name='available' value={form.available} onChange={handleChange} className='px-3 py-2 text-black outline-gray-600 outline rounded-lg' type="number" />
        </div>

        <button type='submit' className=' py-2 px-4 bg-[#294666] text-white font-bold rounded-md hover:scale-95 cursor-pointer shadow-sm shadow-black'>Add Book</button>
      </form>
    </div>


    <div className=' pt-16 bg-gray-800 h-screen w-full flex flex-col items-center gap-10'>
        <h1 className='p-3 text-4xl text-white font-bold flex items-center justify-center '>Records</h1>
        <table className='w-3/4 text-white border-collapse'>
        <thead>
            <tr className='bg-[#294666]'>
                <th className='p-3 border border-gray-500'>ID</th>
                <th className='p-3 border border-gray-500'>Title</th>
                <th className='p-3 border border-gray-500'>Author</th>
                <th className='p-3 border border-gray-500'>Qty</th>
                <th className='p-3 border border-gray-500'>Available</th>
                <th className='p-3 border border-gray-500'>Remove</th>
            </tr>
        </thead>
        <tbody>
            {book.map((e) => (
                <tr key={e.id} className='text-center'>
                    <td className='p-3 border border-gray-500'>{e.id}</td>
                    <td className='p-3 border border-gray-500'>{e.title}</td>
                    <td className='p-3 border border-gray-500'>{e.author}</td>
                    <td className='p-3 border border-gray-500'>{e.qty}</td>
                    <td className='p-3 border border-gray-500'>{e.available}</td>
                    <td className='p-3 border border-gray-500'>
                      <button className=' py-2 px-5 rounded-md font-bold bg-red-500 text-white cursor-pointer' onClick={()=>{deleteBook(e.id)}}>X</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>

  </div>

  )
}

export default ManageBook
