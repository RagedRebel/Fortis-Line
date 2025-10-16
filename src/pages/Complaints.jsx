import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Complaints() {
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
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b hover:bg-blue-50 transition">
                <td className="py-3 px-4 font-medium">#001</td>
                <td className="py-3 px-4">Harassment</td>
                <td className="py-3 px-4">Oct 10, 2025</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">In Review</span>
                </td>
                <td className="py-3 px-4">
                  <Link to="/complaints/001" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">View</Link>
                </td>
              </tr>
              <tr className="border-b hover:bg-blue-50 transition">
                <td className="py-3 px-4 font-medium">#002</td>
                <td className="py-3 px-4">Bullying</td>
                <td className="py-3 px-4">Oct 8, 2025</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Closed</span>
                </td>
                <td className="py-3 px-4">
                  <Link to="/complaints/002" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">View</Link>
                </td>
              </tr>
              <tr className="hover:bg-blue-50 transition">
                <td className="py-3 px-4 font-medium">#003</td>
                <td className="py-3 px-4">Discrimination</td>
                <td className="py-3 px-4">Oct 5, 2025</td>
                <td className="py-3 px-4">
                  <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">New</span>
                </td>
                <td className="py-3 px-4">
                  <Link to="/complaints/003" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">View</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        
      </main>

      <Footer />
    </div>
  );
}

export default Complaints;
