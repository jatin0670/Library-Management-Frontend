import React from 'react'
import { Link } from 'react-router-dom'
import { RiDashboardFill, RiBookFill, RiUserFill, RiBookmarkFill} from "@remixicon/react";



const Navbar = () => {
  return (
    <div className=' w-1/6 h-full bg-[#2f384a] flex flex-col items-center px-10 pt-10 gap-10'>
        {/* <div className=' text-white text-2xl font-bold '>LibraryManagement</div> */}
        <div className=' text-white font-medium text-[15px] flex flex-col gap-10 items-center '>
            <Link to="/" className=' cursor-pointer flex gap-1 items-center justify-center text-lg'>
              <RiDashboardFill />
              <h2>Dashboard</h2>
            </Link>

            <Link to="/managebooks" className=' cursor-pointer flex gap-1 items-center justify-center text-lg'>
              <RiBookFill />
              <h2>Manage Books</h2>
              </Link>

            <Link to="/managestudents" className=' cursor-pointer flex gap-1 items-center justify-center text-lg'>
              <RiUserFill />
              <h2>Manage Students</h2>
            </Link>

            <Link to="/issuebooks" className=' cursor-pointer flex gap-1 text-lg items-center justify-center'>
              <RiBookmarkFill />
              <h2>Issue Book</h2>
            </Link>
            {/* <Link to="/returnbooks" className=' cursor-pointer'>Return Book</Link> */}
            {/* <Link to="/fines" className=' cursor-pointer'>Fines</Link> */}
            {/* <h1 className=' cursor-pointer hover:scale-95 p-3 bg-red-500 rounded-md shadow-lg '>SignUp/Login</h1> */}
        </div>
      </div>
  )
}

export default Navbar
