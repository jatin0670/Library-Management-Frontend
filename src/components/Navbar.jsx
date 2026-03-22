import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className=' z-20 fixed top-0 left-0 w-full h-16 bg-[#294666] flex justify-between items-center px-10'>
        <div className=' text-white text-2xl font-bold'>LibraryManagement</div>
        <div className=' text-white font-medium text-[15px] flex gap-10 items-center'>
            <Link to="/" className=' cursor-pointer'>Dashboard</Link>
            <Link to="/managebooks" className=' cursor-pointer'>Manage Books</Link>
            <Link to="/managestudents" className=' cursor-pointer'>Manage Students</Link>
            <Link to="/issuebooks" className=' cursor-pointer'>Issue Book</Link>
            {/* <Link to="/returnbooks" className=' cursor-pointer'>Return Book</Link> */}
            {/* <Link to="/fines" className=' cursor-pointer'>Fines</Link> */}
            {/* <h1 className=' cursor-pointer hover:scale-95 p-3 bg-red-500 rounded-md shadow-lg '>SignUp/Login</h1> */}
        </div>
      </div>
  )
}

export default Navbar
