import axios from 'axios';
import React, { useEffect, useState } from 'react'

// add local host 8080 to run locally

const ManageStudent = () => {

   const [student, setStudent] = useState([]);

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
       axios.post("http://localhost:8080/student", form)
       .then(response);
       setStudent([...student, response.data]);
   }

   const deleteStudent = (id)=>{
    if(window.confirm("Are you sure you want to delete this record?")){
      axios.delete(`http://localhost:8080/student/${id}`)
      .then(()=>{
        setStudent(student.filter((e)=>e.id !== id))
      })
    }
   }
  
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
      <h1 className='p-3 text-4xl text-[#294666] font-bold flex items-center justify-center '>Manage Students </h1>

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
          <button className=' py-2 px-4 bg-[#294666] text-white font-bold rounded-md hover:scale-95 cursor-pointer shadow-sm shadow-black' type="submit">Add Student</button>
      </form>
    </div>

    <div className=' pt-16 bg-gray-800 h-screen w-full flex flex-col items-center gap-10' >
    <h1 className='p-3 text-4xl text-white font-bold flex items-center justify-center '>Records</h1>

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
