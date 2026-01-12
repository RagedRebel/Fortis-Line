import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function TrackComplaint() {
  const [code, setCode] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    const trimmed = code.trim();
    if (!trimmed) {
      setTouched(true);
      return;
    }
    setSubmitting(true);
    axios.post(`${import.meta.env.VITE_API_URL}/track`, { code: trimmed.toLowerCase() })
      .then((res) => {
        const id = res?.data?._id;
        if (id) {
          navigate(`/complaint/${id}`, { state: { trackingCode: trimmed } });
        } else {
          setError('Complaint not found. Please check the code.');
        }
      })
      .catch(() => setError('Complaint not found. Please check the code.'))
      .finally(() => setSubmitting(false));
  };

  const isInvalid = touched && !code.trim();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-gray-800">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-primary text-center mb-2">Track Your Complaint</h1>
            <p className="text-gray-600 text-center mb-8">Enter your tracking code (shown after submit) to view status.</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="trackingCode" className="block text-sm font-semibold text-gray-700">
                  Tracking Code
                </label>
                <input
                  id="trackingCode"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="e.g., leaf-sky-river-song-4821"
                  className={`mt-2 w-full rounded-xl border ${isInvalid ? 'border-red-400' : 'border-gray-300'} focus:border-primary focus:ring-primary shadow-sm px-4 py-2.5`}
                />
                {isInvalid && (
                  <p className="text-sm text-red-600 mt-2">Please enter a valid complaint ID.</p>
                )}
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`cursor-pointer w-full bg-primary text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:bg-secondary transition duration-300 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Checking…' : 'View Complaint'}
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
