import axios from 'axios';
import React, { useEffect, useState } from 'react'

// add local host 8080 to run locally

const IssueBook = () => {

  const [issueBook, setIssueBook] = useState([]);
  
  const [student, setStudent] = useState([]);

  const [book, setBook] = useState([])

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
      axios.post("http://localhost:8080/issuebook", form)
      .then((response)=>{
        setIssueBook([...issueBook, response.data])

      })
  }

  const deleteIssueBook = (id)=>{
    if(window.confirm("Are you sure you want to delete this record?")){
        axios.delete(`http://localhost:8080/issuebook/${id}`)
        .then(()=>{
           setIssueBook(issueBook.filter((e)=> e.id !== id))
        })
      }
  }

  useEffect(()=>{
    axios.get("http://localhost:8080/allissuebooks")
    .then((response)=>{
          setIssueBook(response.data)
          console.log(response.data)
    })
  }, [])

  useEffect(()=>{                                   
    axios.get("http://localhost:8080/allbooks")
    .then((response)=>{
        setBook(response.data);
        console.log(response.data);
    })
 }, [])

 useEffect(()=>{
  axios.get("http://localhost:8080/allstudents")
  .then((response)=>{
      setStudent(response.data);
      console.log(response.data)
  })
}, [])

  return (
<div>

   <div className=' pt-16 bg-[#F2FAFF] h-screen w-full flex flex-col items-center gap-10'>
         <h1 className='p-3 text-4xl text-[#294666] font-bold flex items-center justify-center '>Isssue Books </h1>
   
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
          
            <button className=' py-2 px-4 bg-[#294666] text-white font-bold rounded-md hover:scale-95 cursor-pointer shadow-sm shadow-black' type="submit">Issue Book</button>
         </form>
   
       </div> 


       <div className=' pt-16 bg-gray-800 h-screen w-full flex flex-col items-center gap-10'>
        <h1 className='p-3 text-4xl text-white font-bold flex items-center justify-center '>Records</h1>
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
