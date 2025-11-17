import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = complaintId.trim();
    if (!trimmed) {
      setTouched(true);
      return;
    }

    const normalized = trimmed.replace(/^#/, '');
    navigate(`/complaint/${normalized}`);
  };

  const isInvalid = touched && !complaintId.trim();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-gray-800">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-2">Track Your Complaint</h1>
            <p className="text-gray-600 text-center mb-8">Enter your complaint ID to view the current status and details.</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="complaintId" className="block text-sm font-semibold text-gray-700">
                  Complaint ID
                </label>
                <input
                  id="complaintId"
                  type="text"
                  value={complaintId}
                  onChange={(e) => setComplaintId(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="e.g., 001 or #001"
                  className={`mt-2 w-full rounded-xl border ${isInvalid ? 'border-red-400' : 'border-gray-300'} focus:border-primary focus:ring-primary shadow-sm px-4 py-2.5`}
                />
                {isInvalid && (
                  <p className="text-sm text-red-600 mt-2">Please enter a valid complaint ID.</p>
                )}
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-primary text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:bg-secondary transition duration-300"
              >
                View Complaint
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TrackComplaint;
