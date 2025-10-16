import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FormPage() {
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    date: '',
    description: '',
    attachment: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Report submitted:', formData);
    setSubmitted(true);
    setFormData({ category: '', location: '', date: '', description: '', attachment: null });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Anonymous Ragging Report</h1>
              
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="font-semibold">Report submitted successfully! Thank you for taking a stand.</p>
              </div>
            ) : (
              <>
        
                <div className="mb-6">
                  <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-xl">
                    <div className="text-blue-700 text-xl">ℹ️</div>
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

                <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                    Type of Incident
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm px-4 py-2.5"
                  >
                    <option value="">Select Type</option>
                    <option value="verbal">Verbal Abuse</option>
                    <option value="physical">Physical Abuse</option>
                    <option value="cyber">Cyber Bullying</option>
                    <option value="sexual">Sexual Harassment</option>
                    <option value="other">Other</option>
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
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Hostel Block A, Classroom 203"
                    required
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm px-4 py-2.5"
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
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm px-4 py-2.5"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe what happened..."
                    required
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm px-4 py-2.5"
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
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600 shadow-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.01] transition"
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
