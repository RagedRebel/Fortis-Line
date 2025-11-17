import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [type,setType]=useState()
  const [location,setLocation]=useState()
  const [date,setDate]=useState()
  const [desc,setDesc]=useState()
  const [file,setFile]=useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdId, setCreatedId] = useState('');
  const navigate=useNavigate();
  

  
  
  // function formatDate(d){
  //   if(!d) return null;
  //   const year=d.getFullYear();
  //   const month=String(d.getMonth()+1).padStart(2,'0');
  //   const dte=String(d.getDate()).padStart(2,'0');
  //   return `${year}-${month}-${dte}`;
  // }
  
  // function handleDateInput(dateString){
  //   const selectedDate=new Date(dateString);
 
  //   const formattedDate = formatDate(selectedDate);
  //   setDate(formattedDate);
  //   console.log(formattedDate); // Outputs: "2025-11-07" (example)
  // }
  // const [formData, setFormData] = useState({
  //   category: '',
  //   location: '',
  //   date: '',
  //   description: '',
  //   // attachment: null,
  // });

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: files ? files[0] : value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append('type',type);
    formData.append('location',location);
    formData.append('date',date);
    formData.append('desc',desc);
    if(file){
      formData.append('attachment',file);
    }
    try{
      const result=await axios.post("http://localhost:3000/form",formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }

      });
      const id = result?.data?._id || ''
      setCreatedId(id)
      console.log('Created complaint id:', id)
      setSubmitted(true);
    }catch(err){
      console.log(err);
      alert("Error submitting form!!");
    }
       
  };


  const handleFileChange=(e)=>{
    const selectedFile=e.target.files[0];
    setFile(selectedFile);
    }

  return (
    <div className="min-h-screen flex flex-col bg-[#E5E9C5] text-gray-800">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#016B61]">Anonymous Ragging Report</h1>
              
            </div>

            {submitted ? (
              <div className="bg-[#9ECFD4] border border-[#70B2B2] text-[#016B61] p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="font-semibold">Report submitted successfully! Thank you for taking a stand.</p>
                {createdId && (
                  <div className="mt-3 text-gray-700">
                    <div className="font-semibold">Your Complaint ID:</div>
                    <div className="mt-1 font-mono text-sm bg-white inline-block px-3 py-1 rounded border border-[#70B2B2]">{createdId}</div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(createdId)}
                        className="cursor-pointer px-3 py-1 rounded bg-[#016B61] text-white hover:bg-[#70B2B2] transition duration-300"
                      >
                        Copy ID
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/track')}
                        className="cursor-pointer ml-2 px-3 py-1 rounded bg-[#70B2B2] text-white hover:bg-[#9ECFD4] hover:text-[#016B61] transition duration-300"
                      >
                        Track Complaint
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="cursor-pointer ml-2 px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
                      >
                        Go Home
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
        
                <div className="mb-6">
                  <div className="flex items-start gap-3 bg-[#9ECFD4] border border-[#70B2B2] text-[#016B61] p-4 rounded-xl">
                    <div className="text-[#016B61] text-xl">ℹ️</div>
                    <div>
                      <h2 className="font-semibold mb-2">Guidelines to fill the form</h2>
                      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                        <li>You may choose to report anonymously; your identity will remain confidential.</li>
                        <li>Clearly describe the incident, including what happened, when, and where.</li>
                        <li>Attach any relevant evidence such as photos, audio, or documents if available.</li>
                        <li>
                          Deliberately filing a false or malicious report is a serious offense and will result in
                          strict disciplinary action (including suspension or expulsion).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" encType='multipart/form-data'>
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                    Type of Incident
                  </label>
                  <select
                    id="category"
                    name="category"
                    // value={formData.category}
                    onChange={(e)=>setType(e.target.value)}
                    required
                    className="cursor-pointer mt-2 w-full rounded-xl border-gray-300 focus:border-[#016B61] focus:ring-[#016B61] shadow-sm px-4 py-2.5"
                  >
                    <option value="">Select Type</option>
                    <option value="Verbal">Verbal Abuse</option>
                    <option value="Physical">Physical Abuse</option>
                    <option value="Cyber">Cyber Bullying</option>
                    <option value="Sexual">Sexual Harassment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                    Location of Incident
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    // value={formData.location}
                    onChange={(e)=>setLocation(e.target.value)}
                    placeholder="e.g., Hostel Block A, Classroom 203"
                    required
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-[#016B61] focus:ring-[#016B61] shadow-sm px-4 py-2.5"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700">
                    Date of Incident
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
    
                    onChange={(e)=>{setDate(e.target.value)}}
                    required
                    className="cursor-pointer mt-2 w-full rounded-xl border-gray-300 focus:border-[#016B61] focus:ring-[#016B61] shadow-sm px-4 py-2.5"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    // value={formData.description}
                    onChange={(e)=>setDesc(e.target.value)}
                    rows={5}
                    placeholder="Describe what happened..."
                    required
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-[#016B61] focus:ring-[#016B61] shadow-sm px-4 py-2.5"
                  />
                </div>

                <div>
                  <label htmlFor="attachment" className="block text-sm font-semibold text-gray-700">
                    Upload Attachment
                  </label>
                  <input
                    id="attachment"
                    type="file"
                    name="attachment"
                    onChange={handleFileChange}
                    className="cursor-pointer mt-2 w-full rounded-xl border-gray-300 focus:border-[#016B61] focus:ring-[#016B61] shadow-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#9ECFD4] file:text-[#016B61] hover:file:bg-[#70B2B2] file:cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full bg-[#016B61] text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:bg-[#70B2B2] transition duration-300"
                >
                  Submit Report
                </button>
              </form>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FormPage;
