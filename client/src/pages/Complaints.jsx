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

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/admin/logout', {}, { withCredentials: true })
      navigate('/admin')
    } catch (err) {
      // No-op: even if logout fails, send user to login
      navigate('/admin')
    }
  }

  const stats = (() => {
    const total = complaints.length
    let inReview = 0
    let solved = 0
    complaints.forEach(c => {
      const status = String(c.status || 'New').toLowerCase()
      if (status.includes('resolve')) solved += 1
      else if (status.includes('review') || status === 'new') inReview += 1
    })
    return { total, inReview, solved }
  })()

 function displayDate(dte) {
  const date=new Date(dte);
   const formattedDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
   return formattedDate;
  
}
  return (
    <div className="min-h-screen flex flex-col text-gray-800 bg-[#E5E9C5]">

      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#016B61]">
              Admin Complaints Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="cursor-pointer inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <p className="text-sm text-gray-500">Total Complaints</p>
              <p className="text-3xl font-bold text-[#016B61]">{stats.total}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <p className="text-sm text-gray-500">In Review</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.inReview}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <p className="text-sm text-gray-500">Solved</p>
              <p className="text-3xl font-bold text-green-600">{stats.solved}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto bg-white text-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-5xl">
          <table className="min-w-full border text-left rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#016B61] text-white">
                <th className="py-3 px-4">No.</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {complaints.map((complaint,index)=>{              
                const status = (complaint.status || 'New')
                const statusLower = status.toLowerCase()
                const badgeClass = statusLower.includes('resolve')
                  ? 'bg-green-100 text-green-700'
                  : statusLower.includes('reject')
                  ? 'bg-red-100 text-red-700'
                  : statusLower.includes('review') || statusLower === 'new'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
                return <tr key={complaint._id} className="border-b hover:bg-[#E5E9C5] transition duration-300">
                <td className="py-3 px-4 font-medium">{index+1}</td>
                <td className="py-3 px-4">{complaint.type}</td>
                <td className="py-3 px-4">{displayDate(complaint.date)}</td>
                <td className="py-3 px-4">
                  <span className={`${badgeClass} text-sm px-3 py-1 rounded-full`}>{status}</span>
                </td>
                <td className="py-3 px-4">
                  <Link to={`/complaints/${complaint._id}`} className="cursor-pointer bg-[#016B61] text-white px-3 py-1 rounded hover:bg-[#70B2B2] transition duration-300">View</Link>
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
