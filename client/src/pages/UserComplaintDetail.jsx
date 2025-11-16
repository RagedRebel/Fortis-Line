import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

function UserComplaintDetail() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  function displayDate(dte) {
    const date = new Date(dte);
    const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return formattedDate;
  }
   function handleFileView(filePath) {
    let normalized = String(filePath || '')
      .replace(/\\/g, '/')
      .replace(/^\/+/, '');
    if (!normalized) return;

    const urlPath = normalized.startsWith('uploads/')
      ? normalized
      : `uploads/${normalized}`;

    window.open(`http://localhost:3000/${encodeURI(urlPath)}`, '_blank', 'noopener');
  }


  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3000/getComplaint/" + id)
      .then(result => {
        setComplaint(result.data);
        setLoading(false);
        console.log(result);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Loading complaint details...</p>
              </div>
            </div>
          ) : !complaint || error ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3 text-gray-800">Complaint Not Found</h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                We couldn't find a complaint with ID: <span className="font-semibold text-gray-800">{id}</span>
              </p>
              <p className="text-gray-500 mb-8">Please check the ID and try again.</p>
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold">Complaint Details</h1>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-semibold">ID: {complaint._id || id}</span>
                  </div>
                </div>
                <p className="text-blue-100">Your complaint has been successfully submitted and is being reviewed.</p>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-10">
                {/* Info Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600 mb-1">Complaint Type</p>
                        <p className="text-xl font-bold text-gray-800">{complaint.type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600 mb-1">Submission Date</p>
                        <p className="text-xl font-bold text-gray-800">{displayDate(complaint.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Description</h2>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{complaint.desc}</p>
                  </div>
                </div>

                {/* Attachments Section */}
                {complaint.attachment && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">Attachments</h2>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-700">{complaint.attachment}</span>
                      <button
                        onClick={() => handleFileView(complaint.attachment)}
                        className="bg-blue-600 text-white px-4 py-2 mx-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        View
                      </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info Alert */}
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6 mb-8">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">What happens next?</p>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        Your complaint has been received and will be reviewed by our Anti-Ragging Committee. You will be contacted if any additional information is needed. All complaints are handled with strict confidentiality.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/" 
                    className="flex-1 flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                  </Link>
                </div>

                {/* Support Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-3">
                    Need immediate assistance?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                    <a href="tel:1800-180-5522" className="flex items-center text-blue-700 hover:text-blue-800 font-medium transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Helpline: 1800-180-5522
                    </a>
                    <span className="text-gray-300 hidden sm:block">|</span>
                    <a href="mailto:helpline@antiragging.net" className="flex items-center text-blue-700 hover:text-blue-800 font-medium transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      helpline@antiragging.net
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default UserComplaintDetail;
