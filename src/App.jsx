import React from 'react'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IssueBook from './components/IssueBook';
import ManageBook from './components/ManageBook';
import Navbar from './components/Navbar';
import ManageStudent from './components/ManageStudent';
import ReturnBook from './components/ReturnBook';
import Fines from './components/Fines';




const router = createBrowserRouter([
  {path: "/", element: <div><Navbar/> <Home/></div>},
  {path: "/issuebooks", element: <div><Navbar/> <IssueBook/></div>},
  {path: "/managebooks", element: <div><Navbar/> <ManageBook/></div> },
  {path: "/managestudents", element: <div><Navbar/> <ManageStudent/></div> },
  // {path: "/returnbooks", element: <div><Navbar/> <ReturnBook/></div>},
  // {path: "/fines", element: <div><Navbar/> <Fines/></div> }
])


const App = () => {
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )
}

export default App
