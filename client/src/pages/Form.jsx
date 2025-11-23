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
  const [files,setFiles]=useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
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
    if(files.length > 0){
      Array.from(files).forEach(file => {
        formData.append('attachments', file);
      });
    }
    try{
      const result=await axios.post("http://localhost:3000/form",formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }

      });
      const code = result?.data?.trackingCode || ''
      setTrackingCode(code)
      console.log('Created tracking code:', code)
      setSubmitted(true);
    }catch(err){
      console.log(err);
      alert("Error submitting form!!");
    }
       
  };


  const handleFileChange=(e)=>{
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > 3) {
      alert(`You can only upload a maximum of 3 files. You have ${files.length} selected and tried to add ${selectedFiles.length}.`);
      e.target.value = null; // Reset input
      return;
    }
    
    const validFiles = selectedFiles.filter(file => file.size <= 50 * 1024 * 1024);
    
    if (validFiles.length !== selectedFiles.length) {
      alert("Some files exceed the 50MB limit and were ignored.");
    }

    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    e.target.value = null; // Reset input
  }

  const removeFile = (indexToRemove) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-gray-800">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">Anonymous Ragging Report</h1>
              
            </div>

            {submitted ? (
              <div className="bg-surface border border-accent text-primary p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="font-semibold">Report submitted successfully! Thank you for taking a stand.</p>
                {trackingCode && (
                  <div className="mt-3 text-gray-700">
                    <div className="font-semibold">Your Tracking Code (save this now):</div>
                    <div className="mt-1 font-mono text-sm bg-white inline-block px-3 py-1 rounded border border-secondary">{trackingCode}</div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(trackingCode)}
                        className="cursor-pointer px-3 py-1 rounded bg-primary text-white hover:bg-secondary transition duration-300"
                      >
                        Copy Code
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/track')}
                        className="cursor-pointer ml-2 px-3 py-1 rounded bg-primary text-white hover:bg-secondary transition duration-300"
                      >
                        Track Complaint
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="cursor-pointer ml-2 px-3 py-1 rounded bg-primary text-white hover:bg-secondary transition duration-300"
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
                  <div className="flex items-start gap-3 bg-surface border border-accent text-primary p-4 rounded-xl">
                    <div className="text-primary text-xl">ℹ️</div>
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
                    className="cursor-pointer mt-2 w-full rounded-xl border-gray-300 focus:border-primary focus:ring-primary shadow-sm px-4 py-2.5"
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
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-primary focus:ring-primary shadow-sm px-4 py-2.5"
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
                    className="cursor-pointer mt-2 w-full rounded-xl border-gray-300 focus:border-primary focus:ring-primary shadow-sm px-4 py-2.5"
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
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-primary focus:ring-primary shadow-sm px-4 py-2.5"
                  />
                </div>

                <div>
                  <label htmlFor="attachment" className="block text-sm font-semibold text-gray-700">
                    Upload Attachments (Max 3, 50MB each)
                  </label>
                  
                  {files.length < 3 && (
                    <input
                      id="attachment"
                      type="file"
                      name="attachment"
                      multiple
                      onChange={handleFileChange}
                      className="cursor-pointer mt-2 w-full rounded-xl border-gray-300 focus:border-primary focus:ring-primary shadow-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:text-secondary file:cursor-pointer"
                    />
                  )}

                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                      <ul className="space-y-2">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                            <span className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-xs" title={file.name}>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium px-2"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {files.length}/3 files selected
                  </p>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full bg-primary text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:bg-secondary transition duration-300"
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
