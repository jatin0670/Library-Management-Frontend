import React, { useEffect, useState } from 'react'
import Card from './Card'
import img from '../assets/bgimg.jpg'
import axios from 'axios'
import Navbar from './Navbar'
import { RiDashboardFill, RiBookFill, RiUserFill, RiBookmarkFill, RiBookOpenFill} from "@remixicon/react";
import {Chart as ChartJS} from 'chart.js/auto';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';



// add local host 8080 to run locally 

const Home = () => {

  const [bookNo, setBookNo] = useState()
  const [studentNo, setStudentNo] = useState()
  const [issueBookNo, setIssueBookNo] = useState()

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

        <div className='flex w-full h-full'>

          <Navbar/>

          <div className=' h-full w-5/6 flex flex-col items-center gap-4 relative bg-[#F2FAFF]'>
            <img className=' absolute h-full w-full' src={img} alt="" />
             
            <h1 className='p-3 text-4xl text-[#2f384a] font-bold flex items-center justify-center mt-8 z-10 '>Dashboard</h1>
            <div className=' z-10 flex gap-28' >
            <Card No={bookNo} text="Total Books" icon={<RiBookFill/>}/>
            <Card No={studentNo} text="Total students" icon={<RiUserFill/>}/>
            <Card No={issueBookNo} text="Total Issue Books" icon={<RiBookmarkFill/>}/>
            </div>
            {/* <Card No="0" text="Total Fine Received"/> */}

            <div className=' bg-[#F2FAFF] p-5 h-72 w-2/5 z-10 mt-7 shadow-lg shadow-black'>
                 <Bar
                   data={{
                      labels: ["Books", "Students", "Issued Books"],
                      datasets: [{
                        label: "Data",
                        data: [bookNo, studentNo ,issueBookNo],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.5)',
                          'rgba(255, 159, 64, 0.5)',
                          'rgba(153, 102, 255, 0.5)'
                        ],
                        borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(255, 159, 64)',
                          'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1,
                        borderRadius: 5,
                      }],
                   }}
                  />
            </div>
          
          </div>
        </div>
  

      </div>

      
    <div className=' pt-16 bg-gray-800 h-screen w-full flex flex-col items-center justify-center gap-10'>

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
