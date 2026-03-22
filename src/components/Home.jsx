import React, { useEffect, useState } from 'react'
import Card from './Card'
import img from '../assets/bgimg.jpg'
import axios from 'axios'


// add local host 8080 to run locally 

const Home = () => {

  const [bookNo, setBookNo] = useState(0)
  const [studentNo, setStudentNo] = useState(0)
  const [issueBookNo, setIssueBookNo] = useState(0)

  useEffect(()=>{
    axios.get("https://library-management-backend-anmt.onrender.com/allbooks")
    .then((response)=>{
       setBookNo(response.data.length)
       console.log(response.data.length);
    })
 
 }, [])

 useEffect(()=>{
  axios.get("https://library-management-backend-anmt.onrender.com/allstudents")
  .then((response)=>{
     setStudentNo(response.data.length)
     console.log(response.data.length);
  })

}, [])

useEffect(()=>{
  axios.get("https://library-management-backend-anmt.onrender.com/allissuebooks")
  .then((response)=>{
     setIssueBookNo(response.data.length)
     console.log(response.data.length);
  })

}, [])

  return (

    <div>
      <div className=' h-screen w-full bg-[#F2FAFF] flex items-center justify-center gap-10 pt-16 relative'>
        <img className=' absolute h-full w-full' src={img} alt="" />
      {/* <div className=' fixed top-0 left-0 w-full h-16 bg-purple-500 flex justify-between items-center px-10'>
        <div className=' text-white text-2xl font-bold'>LibraryManagement</div>
        <div className=' text-white font-medium text-[15px] flex gap-10 items-center'>
            <h1 className=' cursor-pointer'>Dashboard</h1>
            <h1 className=' cursor-pointer'>Manage Books</h1>
            <h1 className=' cursor-pointer'>Manage Students</h1>
            <h1 className=' cursor-pointer'>Issue Book</h1>
            <h1 className=' cursor-pointer'>Return Book</h1>
            <h1 className=' cursor-pointer'>Fines</h1>
            <h1 className=' cursor-pointer hover:scale-95 p-3 bg-red-500 rounded-md shadow-lg '>SignUp/Login</h1>
        </div>
      </div> */}

      <Card No={bookNo} text="Total Books"/>
      <Card No={studentNo} text="Total students"/>
      <Card No={issueBookNo} text="Total Issue Books"/>
      
    </div>

    <div className=' pt-16 bg-gray-800 h-screen w-full flex flex-col items-center gap-10'>

      <h1 className='text-4xl text-white font-bold'>About</h1>
      
      <p className='text-gray-300 text-xl text-center w-3/4'>
        A Library Management System built with React and Spring Boot. 
        Manage books, students, and track issued books easily.
      </p>
      
      <div className='flex gap-30 text-white text-center'>
      
        <a target='blank' href="https://react.dev/">
           <div className='bg-[#294666] px-10 py-6 rounded-lg'>
               <h2 className='text-2xl font-bold'>React.JS</h2>
               <p className='text-gray-300'>Frontend</p>
           </div>
        </a>
      
        <a target='blank' href="https://spring.io/projects/spring-boot">
            <div className='bg-[#294666] px-10 py-6 rounded-lg'>
                <h2 className='text-2xl font-bold'>Spring Boot</h2>
                <p className='text-gray-300'>Backend</p>
            </div>
        </a>
      
        <a target='blank' href="https://www.mysql.com/">
            <div className='bg-[#294666] px-10 py-6 rounded-lg'>
                <h2 className='text-2xl font-bold'>MySQL</h2>
                <p className='text-gray-300'>Database</p>
            </div>
        </a>
      
      </div>
    </div>
  </div>
    
  )
}

export default Home
