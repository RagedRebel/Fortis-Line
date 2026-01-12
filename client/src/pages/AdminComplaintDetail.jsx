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
  const [newStatus, setNewStatus] = useState('In Review');
  const [updating, setUpdating] = useState(false);
  
  function displayDate(dte) {
  const date=new Date(dte);
   const formattedDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
   return formattedDate;
  
}

  useEffect(()=>{
  axios.get(`${import.meta.env.VITE_API_URL}/admin/me`, { withCredentials: true })
    .then(() => axios.get(`${import.meta.env.VITE_API_URL}/admin/complaints/`+id, { withCredentials: true }))
    .then(result => {
      setComplaint(result.data);
      setNewStatus(result.data?.status || 'In Review')
    })
    .catch(err =>{
      setError(true)
      if (err?.response?.status === 401) {
        navigate('/admin')
      }
    })

},[id, navigate])

  const statusOptions = ['New', 'In Review', 'Resolved', 'Rejected']

  const updateStatus = async () => {
    try {
      setUpdating(true)
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/complaints/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      )
      setComplaint(res.data)
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-gray-800">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {!complaint ||  error ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Complaint Not Found</h1>
              <p className="text-gray-600 mb-6">We couldn't find a complaint with the given ID.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/track" className="cursor-pointer px-5 py-3 rounded-xl bg-primary text-white hover:bg-secondary transition duration-300">Try Another ID</Link>
                <Link to="/complaints" className="cursor-pointer px-5 py-3 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-300">Go to Dashboard</Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h1 className="text-3xl font-bold text-primary">Complaint</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Status:</label>
                    <select
                      value={newStatus}
                      onChange={(e)=>setNewStatus(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      onClick={updateStatus}
                      disabled={updating}
                      className={`cursor-pointer px-3 py-2 rounded-lg text-sm text-white ${updating? 'bg-gray-400' : 'bg-primary hover:bg-secondary'} transition-colors`}
                    >
                      {updating ? 'Saving…' : 'Save'}
                    </button>
                  </div>
                </div>
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

              {/* Additional Details for Admin */}
              <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Incident Details</h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                   {[
                    { label: 'Is Victim?', value: complaint.isVictim },
                    { label: 'First Time Incident?', value: complaint.isFirstTime },
                    { label: 'Was Threatened?', value: complaint.isThreatened },
                    { label: 'Occurred On Campus?', value: complaint.isOnCampus },
                    { label: 'Witnesses Present?', value: complaint.hasWitnesses },
                    { label: 'Physically Harmed?', value: complaint.isPhysicallyHarmed },
                    { label: 'Knows Perpetrator?', value: complaint.knowsPerpetrator },
                  ].map((item, idx) => (
                    item.value && (
                      <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0">
                        <span className="text-gray-600 text-sm">{item.label}</span>
                        <span className={`font-semibold text-sm px-2 py-0.5 rounded ${item.value === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {item.value}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700 leading-relaxed">{complaint.desc}</p>
              </div>

              {(complaint.attachments?.length > 0 || complaint.attachment) && (
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-1">Attachments:</p>
                  <div className="flex flex-col gap-2">
                    {complaint.attachment && (
                       <a 
                        href={`${import.meta.env.VITE_API_URL}/${complaint.attachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-surface text-primary rounded-lg hover:bg-accent transition duration-300 w-fit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        View Attachment (Legacy)
                      </a>
                    )}
                    {complaint.attachments?.map((path, index) => (
                      <a 
                        key={index}
                        href={`${import.meta.env.VITE_API_URL}/${path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-surface text-primary rounded-lg hover:bg-accent transition duration-300 w-fit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        View Attachment {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/complaints" className="cursor-pointer px-5 py-3 rounded-xl bg-primary text-white hover:bg-secondary transition duration-300">Back to Home</Link>
               
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
