import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import TopNav from './TopNav'
import { RiBookOpenFill, RiSearchLine } from "@remixicon/react";
// import data from './data.json'

// add this - http://localhost:8080   to run locally

const ManageBook = () => {  

  const [book, setBook] = useState([])

  const [load, setLoad] = useState(false)

  const [search, setSearch] = useState("")


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

    e.preventDefault()

    if(form.title === "" || form.author === "" || form.qty === "" || form.available=== ""){
      window.alert("fill all the fields!")
      return;
    }
    // e.preventDefault()

    setLoad(true)
     axios.post("https://library-management-backend-anmt.onrender.com/book", form)
     .then((response)=>{
        setBook([...book, response.data])
        setLoad(false)
        setForm({title: "", author: "", qty: "", available: ""})
     })
  }

  const deleteBook = (id)=>{
    if(window.confirm("Are you sure you want to delete this record?")){
      axios.delete(`https://library-management-backend-anmt.onrender.com/book/${id}`)
      .then(() =>{
        setBook(book.filter((e)=> e.id !== id))
      })
    }
  }

  useEffect(()=>{                                    //data retrieve when page loaded
     axios.get("https://library-management-backend-anmt.onrender.com/allbooks")
     .then((response)=>{
         setBook(response.data);
         console.log(response.data);
     })
  }, [])

  return (
    
    <div>

     <div className='h-screen w-full flex flex-col'>

        <div className='z-20 w-full h-16 top-0 left-0 bg-[#3666ad] flex items-center justify-between px-10  '>

          <div className='flex gap-4 items-center justify-cente'>
            <RiBookOpenFill color='white' size={36} />
            <h2 className=' text-white text-3xl font-bold'>Library Management</h2>
          </div>

          <div className=' flex gap-2 items-center justify-cente'>
              <span className=' w-12 h-12 rounded-full'>
                <img className='h-full w-full object-fit ' src="https://www.selectmarket.ae/wp-content/uploads/2016/05/5ed0bc59411f1356d4fdf40b_dummy-person.png" alt="" />
              </span>
              <h2 className='text-white'>Admin</h2>
          </div>

        </div>
    
       <div className=' h-full w-full flex ' >

        <Navbar/>

        <div className=' bg-[#F2FAFF] h-full w-5/6 flex flex-col items-center pt-8 gap-4'>
        
         <h1 className='p-3 text-4xl text-[#2f384a] font-bold flex items-center justify-center '>Manage Books </h1>
         
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
         
           <button type='submit' className=' py-2 px-4 bg-[#294666] text-white font-bold rounded-md hover:scale-95 cursor-pointer shadow-sm shadow-black'>{load ? "Adding..." : "Add Book"}</button>
         </form>
        </div>
       </div>


       

     </div>

      


    <div className=' pt-16 pb-16 bg-gray-800 h-full w-full flex flex-col items-center gap-8'>
        <h1 className='p-3 text-4xl text-white font-bold flex items-center justify-center '>Records</h1>

        <div className=' w-1/4 rounded-3xl bg-white flex items-center justify-center px-4 overflow-hidden'>
        <input onChange={(e)=>{setSearch(e.target.value)}} className=' py-3 w-full h-full outline-none bg-white' type="text" placeholder='Search Books' />
        {/* <span><RiSearchLine color='grey' className=' cursor-pointer' /></span> */}
        </div>

        <table className='w-3/4  text-white border-collapse'>
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
            {book.filter((e)=>{
              return search.toLowerCase() === "" ? e : e.title.toLowerCase().includes(search)
            }).map((e) => (
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
