import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function Complaints() {
  const [complaints,setComplaints]=useState([])
  const navigate = useNavigate()


useEffect(()=>{
  axios.get("http://localhost:3000/admin/me", { withCredentials: true })
    .then(() => {
      return axios.get("http://localhost:3000/admin/complaints", { withCredentials: true })
    })
    .then(result => setComplaints(result.data))
    .catch(err => {
      if (err?.response?.status === 401) {
        navigate('/admin')
      }
    })
},[navigate])

 function displayDate(dte) {
  const date=new Date(dte);
   const formattedDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
   return formattedDate;
  
}
  return (
    <div className="min-h-screen flex flex-col text-white">

      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-8 drop-shadow-lg">
          Admin Complaints Dashboard
        </h1>

        <div className="overflow-x-auto bg-white/90 text-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-5xl backdrop-blur-sm">
          <table className="min-w-full border text-left rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4">No.</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {complaints.map((complaint,index)=>{              
                return <tr className="border-b hover:bg-blue-50 transition">
                <td className="py-3 px-4 font-medium">{index+1}</td>
                <td className="py-3 px-4">{complaint.type}</td>
                <td className="py-3 px-4">{displayDate(complaint.date)}</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">In Progress</span>
                </td>
                <td className="py-3 px-4">
                  <Link to={`/complaints/${complaint._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">View</Link>
                </td>
              </tr>
              })}
              
              
            </tbody>
          </table>
        </div>

        
      </main>

      <Footer />
    </div>
  );
}

export default Complaints;
