import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { RiBookOpenFill} from "@remixicon/react";

// add local host 8080 to run locally

const IssueBook = () => {

  const [search, setSearch] = useState("")

  const [issueBook, setIssueBook] = useState([]);
  
  const [student, setStudent] = useState([]);

  const [book, setBook] = useState([])

  const [load, setLoad] = useState(false)

  const [form, setForm] = useState({
    name: "",
    book: "",
    issueDate: "",
    returnDate: ""
  })

  const handleChange = (e)=>{
      setForm({...form, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e)=>{
    
    e.preventDefault()

    if(form.name === "" || form.book === "" || form.issueDate === "" || form.returnDate === ""){
      window.alert("fill all the fields!")
      return;
    }

    setLoad(true)

      axios.post("https://library-management-backend-anmt.onrender.com/issuebook", form)
      .then((response)=>{
        setIssueBook([...issueBook, response.data])
        setLoad(false)
        setForm({name: "", book: "", issueDate: "", returnDate: ""})

      })
  }

  const deleteIssueBook = (id)=>{
    if(window.confirm("Are you sure you want to delete this record?")){
        axios.delete(`https://library-management-backend-anmt.onrender.com/issuebook/${id}`)
        .then(()=>{
           setIssueBook(issueBook.filter((e)=> e.id !== id))
        })
      }
  }

  useEffect(()=>{
    axios.get("https://library-management-backend-anmt.onrender.com/allissuebooks")
    .then((response)=>{
          setIssueBook(response.data)
          console.log(response.data)
    })
  }, [])

  useEffect(()=>{                                   
    axios.get("https://library-management-backend-anmt.onrender.com/allbooks")
    .then((response)=>{
        setBook(response.data);
        console.log(response.data);
    })
 }, [])

 useEffect(()=>{
  axios.get("https://library-management-backend-anmt.onrender.com/allstudents")
  .then((response)=>{
      setStudent(response.data);
      console.log(response.data)
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

    <div className='h-full w-full flex'>

      <Navbar/>

      <div className=' bg-[#F2FAFF] h-full w-5/6 flex flex-col items-center pt-8 gap-4'>
           <h1 className='p-3 text-4xl text-[#2f384a] font-bold flex items-center justify-center '>Isssue Books </h1>
     
           <form onSubmit={handleSubmit} className='py-2 h-3/4 w-2/5 bg-white flex flex-col items-center justify-around rounded-md
            shadow-sm shadow-black'>
     
              <div className='w-3/4 flex items-center justify-around outline outline-gray-400 p-2 rounded-md'>
               <label className=' text-xl' htmlFor="">Student Name: </label>
               <select onChange={handleChange} name="name" value={form.name} className=''>
                <option value="" >Select Student</option>
                {student.map((e)=>(
                 <option key={e.id} value={e.name}>{e.name}</option>
                ))}
              </select>
              </div>
            
              <div className='w-3/4 flex items-center justify-around outline outline-gray-400 rounded-md p-2'>
               <label className=' text-xl' htmlFor="">Select Book: </label>
               <select onChange={handleChange} name="book" value={form.book}>
                <option value="" >Select Book</option>
               {book.map((e)=>(
                  <option key={e.id} value={e.title}>{e.title}</option>
               ))}
              </select>
              </div>
            
              <div className='w-3/4 flex items-center justify-around outline outline-gray-400 rounded-md p-2'>
               <label className=' text-xl' htmlFor="">Issue Date: </label>
               <input onChange={handleChange} name='issueDate' value={form.issueDate} type="date" />
              </div>
            
              <div className='w-3/4 flex items-center justify-around outline outline-gray-400 rounded-md p-2'>
               <label className=' text-xl' htmlFor="">Return Date: </label>
               <input onChange={handleChange} name="returnDate" value={form.returnDate} type="date" />
              </div>
            
              <button className=' py-2 px-4 bg-[#294666] text-white font-bold rounded-md hover:scale-95 cursor-pointer shadow-sm shadow-black' type="submit">{load ? "Adding..." : "Issue Book"}</button>
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

        <table className='w-3/4 text-white border-collapse'>
        <thead>
            <tr className='bg-[#294666]'>
                <th className='p-3 border border-gray-500'>Student</th>
                <th className='p-3 border border-gray-500'>Book</th>
                <th className='p-3 border border-gray-500'>IssueDate</th>
                <th className='p-3 border border-gray-500'>ReturnDate</th>
                <th className='p-3 border border-gray-500'>Remove</th>
            </tr>
        </thead>
        <tbody>
            {issueBook.map((e) => (
                <tr key={e.id} className='text-center'>
                    <td className='p-3 border border-gray-500'>{e.name}</td>
                    <td className='p-3 border border-gray-500'>{e.book}</td>
                    <td className='p-3 border border-gray-500'>{new Date(e.issueDate).toLocaleDateString()}</td>
                    <td className='p-3 border border-gray-500'>{new Date(e.returnDate).toLocaleDateString()}</td>
                    <td className='p-3 border border-gray-500'>
                      <button className=' py-2 px-5 rounded-md font-bold bg-red-500 text-white cursor-pointer' onClick={()=>{deleteIssueBook(e.id)}}>X</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
 

</div>
  )
}

export default IssueBook
