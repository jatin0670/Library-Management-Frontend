import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import {RiBookOpenFill} from "@remixicon/react";

// add local host 8080 to run locally

const ManageStudent = () => {

  const [search, setSearch] = useState("")

   const [student, setStudent] = useState([]);
   const [load, setLoad] = useState(false)

   const [form, setForm] = useState({
        name: "",
        email: "",
        roll: "",
        course: ""

   })

   const handleChange = (e)=>{
       setForm({...form, [e.target.name] : e.target.value})
    }

   const handleSubmit = (e)=>{

    e.preventDefault()

    if(form.name === "" || form.email === "" || form.roll === "" || form.course === ""){
      window.alert("fill all the fields!")
      return;
    }

    setLoad(true)

       axios.post("https://library-management-backend-anmt.onrender.com/student", form)
       .then((response)=>{
           setStudent([...student, response.data]);
           setLoad(false)
           setForm({name: "", email: "", roll: "", course: ""})
       });
       
   }

   const deleteStudent = (id)=>{
    if(window.confirm("Are you sure you want to delete this record?")){
      axios.delete(`https://library-management-backend-anmt.onrender.com/student/${id}`)
      .then(()=>{
        setStudent(student.filter((e)=>e.id !== id))
      })
    }
   }
  
   useEffect(()=>{
     axios.get("https://library-management-backend-anmt.onrender.com/allstudents")
     .then((response)=>{
         setStudent(response.data);
         console.log(response.data)
     })
   }, [])

  return (
  <div>  {/* whole page */}

    <div className='h-screen w-full flex flex-col'>   {/*page 1 */}

        <div className='z-20 w-full h-16 top-0 left-0 bg-[#3666ad] flex items-center justify-between px-10  '>{/* top nav */}
       
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

      <div className=' h-full w-full flex'>  {/* bottom section */}

        <Navbar/>
  
        <div className=' bg-[#F2FAFF] w-5/6 full flex flex-col items-center pt-8 gap-4 '>
          <h1 className='p-3 text-4xl text-[#2f384a] font-bold flex items-center justify-center '>Manage Students </h1>
      
          <form onSubmit={handleSubmit} className='py-2 h-3/4 w-2/5 bg-white flex flex-col items-center justify-around rounded-md
           shadow-sm shadow-black'>
              <input name='name' value={form.name} onChange={handleChange} className='  w-2/3 py-3 px-3 text-black outline outline-gray-400 rounded-md' type="text" placeholder="Student Name" />
              <input name='email' value={form.email} onChange={handleChange} className='  w-2/3 py-3 px-3 text-black outline outline-gray-400 rounded-md' type="email" placeholder="Email" />
      
              {/* <input className='  w-2/3 py-3 px-3 text-black outline outline-gray-400 rounded-md' type="text" placeholder="Course" /> */}
              
              <input name='roll' value={form.roll} onChange={handleChange} className='  w-2/3 py-3 px-3 text-black outline outline-gray-400 rounded-md' type="number" placeholder="Roll Number" />
      
              <select name="course" value={form.course} onChange={handleChange} id="">
                <option value="">Select Cours</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="BA">BA</option>
                <option value="BSC">BSC</option>
                
              </select>
              <button className=' py-2 px-4 bg-[#294666] text-white font-bold rounded-md hover:scale-95 cursor-pointer shadow-sm shadow-black' type="submit">{load ? "Adding..." : "Add Student"}</button>
          </form>
        </div>

      </div>
       

    </div>

    

    <div className=' pt-16 pb-16 bg-gray-800 h-full w-full flex flex-col items-center gap-8' >
    <h1 className='p-3 text-4xl text-white font-bold flex items-center justify-center '>Records</h1>

    <div className=' w-1/4 rounded-3xl bg-white flex items-center justify-center px-4 overflow-hidden'>
        <input onChange={(e)=>{setSearch(e.target.value)}} className=' py-3 w-full h-full outline-none bg-white' type="text" placeholder='Search Books' />
        {/* <span><RiSearchLine color='grey' className=' cursor-pointer' /></span> */}
    </div>

    <table className='w-3/4 text-white border-collapse'>
        <thead>
            <tr className='bg-[#294666]'>
                <th className='p-3 border border-gray-500'>ID</th>
                <th className='p-3 border border-gray-500'>Name</th>
                <th className='p-3 border border-gray-500'>Email</th>
                <th className='p-3 border border-gray-500'>Roll No</th>
                <th className='p-3 border border-gray-500'>Course</th>
                <th className='p-3 border border-gray-500'>Remove</th>
            </tr>
        </thead>
        <tbody>
            {student.map((e) => (
                <tr key={e.id} className='text-center'>
                    <td className='p-3 border border-gray-500'>{e.id}</td>
                    <td className='p-3 border border-gray-500'>{e.name}</td>
                    <td className='p-3 border border-gray-500'>{e.email}</td>
                    <td className='p-3 border border-gray-500'>{e.roll}</td>
                    <td className='p-3 border border-gray-500'>{e.course}</td>
                    <td className='p-3 border border-gray-500'>
                      <button className=' py-2 px-5 rounded-md font-bold bg-red-500 text-white cursor-pointer' onClick={()=>{deleteStudent(e.id)}}>X</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>


    </div>

  </div>
  )
}

export default ManageStudent
