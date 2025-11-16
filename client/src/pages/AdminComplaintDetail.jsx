import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

// Mock data for demo; replace with API call later
const MOCK = {
  '001': { id: '001', type: 'Harassment', date: 'Oct 10, 2025', status: 'In Review', description: 'Reported harassment near the library.' },
  '002': { id: '002', type: 'Bullying', date: 'Oct 8, 2025', status: 'Closed', description: 'Repeated bullying incidents in dorm hallway.' },
  '003': { id: '003', type: 'Discrimination', date: 'Oct 5, 2025', status: 'New', description: 'Discriminatory remarks in class group.' },
};

function Badge({ children }) {
  const content = String(children).toLowerCase();
  const styles =
    content.includes('review')
      ? 'bg-yellow-100 text-yellow-800'
      : content.includes('closed')
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-200 text-gray-800';
  return <span className={`inline-block text-sm px-3 py-1 rounded-full ${styles}`}>{children}</span>;
}

function ComplaintDetail() {
  const { id } = useParams();
  const [complaint,setComplaint]=useState();
  const [error,setError]=useState(false);
  const navigate=useNavigate();
  
  function displayDate(dte) {
  const date=new Date(dte);
   const formattedDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
   return formattedDate;
  
}

  useEffect(()=>{
  axios.get("http://localhost:3000/admin/me", { withCredentials: true })
    .then(() => axios.get("http://localhost:3000/admin/complaints/"+id, { withCredentials: true }))
    .then(result => {
      setComplaint(result.data);
    })
    .catch(err =>{
      setError(true)
      if (err?.response?.status === 401) {
        navigate('/admin')
      }
    })

},[id, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {!complaint ||  error ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Complaint Not Found</h1>
              <p className="text-gray-600 mb-6">We couldn't find a complaint with the given ID.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/track" className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">Try Another ID</Link>
                <Link to="/complaints" className="px-5 py-3 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition">Go to Dashboard</Link>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h1 className="text-3xl font-bold">Complaint</h1>
                {/* <Badge>{data.status}</Badge> */}
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="text-lg font-semibold">{complaint.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-lg font-semibold">{displayDate(complaint.date)}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700 leading-relaxed">{complaint.desc}</p>
              </div>

              {complaint.attachment && (
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-1">Attachments:</p>
                  <a 
                    href={`http://localhost:3000/${complaint.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    View Attachment
                  </a>
                </div>
              )}

              

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/complaints" className="px-5 py-3 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition">Back to Home</Link>
               
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ComplaintDetail;
