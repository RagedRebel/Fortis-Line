import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
        <Header />

   
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white overflow-hidden">

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              🛡️ Safe Campus Initiative
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Stand Against Ragging
            </h2>
            <p className="max-w-2xl mx-auto text-xl mb-8 text-blue-100 leading-relaxed">
              Creating a safe and inclusive campus for every student. Report ragging anonymously and access instant help from our anti-ragging committee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/form" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition transform duration-200">
                📚 Know Your Rights
              </Link>
              <Link to="/form" className="bg-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition transform duration-200">
                🚨 Emergency Help
              </Link>
            </div>
          </div>
        </section>


        <section className="py-12 px-6 bg-white shadow-md">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">24/7</div>
              <p className="text-gray-600 font-medium">Support Available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">100%</div>
              <p className="text-gray-600 font-medium">Confidential</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">500+</div>
              <p className="text-gray-600 font-medium">Students Helped</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">15min</div>
              <p className="text-gray-600 font-medium">Avg Response Time</p>
            </div>
          </div>
        </section>


        <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Why Choose FortisLine?
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Your safety is our priority. We provide comprehensive support and resources to ensure a ragging-free campus.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📢</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-800">Anonymous Reporting</h4>
                <p className="text-gray-600 leading-relaxed">
                  Report any ragging incident safely without revealing your identity. Your privacy is guaranteed and protected.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">⚡</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-800">Instant Help</h4>
                <p className="text-gray-600 leading-relaxed">
                  Get connected instantly to the Anti-Ragging Cell and student welfare officers available 24/7.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🤝</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-800">Support & Guidance</h4>
                <p className="text-gray-600 leading-relaxed">
                  Access professional counseling and support programs to recover and rebuild your confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-6 text-gray-800">
                  Your Safety, Our Mission
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  We believe every student deserves a safe and respectful environment. Our comprehensive anti-ragging system ensures immediate action and long-term prevention.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-gray-800">Real-time Monitoring</p>
                      <p className="text-gray-600">Advanced system to detect and prevent ragging incidents</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-gray-800">Legal Support</p>
                      <p className="text-gray-600">Expert legal guidance for victims and their families</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-gray-800">Awareness Programs</p>
                      <p className="text-gray-600">Regular workshops and sessions on anti-ragging policies</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
                <h4 className="text-2xl font-bold mb-6">Need Immediate Help?</h4>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm text-blue-200 mb-1">National Helpline</p>
                    <p className="text-2xl font-bold">1800-180-5522</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm text-blue-200 mb-1">UGC Helpline</p>
                    <p className="text-2xl font-bold">15522</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm text-blue-200 mb-1">Email Support</p>
                    <p className="text-lg font-semibold break-all">helpline@antiragging.net</p>
                  </div>
                </div>
                <Link to="/form" className="block text-center w-full mt-6 bg-white text-blue-700 font-bold py-4 rounded-xl hover:shadow-xl transition transform hover:scale-105">
                  Report Now →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default LandingPage