import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-surface text-gray-800">
        <Header />

   
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold">
              Safe Campus Initiative
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Stand Against Ragging
            </h2>
            <p className="max-w-2xl mx-auto text-xl mb-8 text-white/90 leading-relaxed">
              Creating a safe and inclusive campus for every student. Report ragging anonymously and access instant help from our anti-ragging committee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/form" className="cursor-pointer bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Know Your Rights
              </Link>
              <Link to="/form" className="cursor-pointer bg-accent text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Emergency Help
              </Link>
            </div>
          </div>
        </section>


        <section className="relative py-20 px-6 bg-gradient-to-b from-surface to-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                Why Choose FortisLine?
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Your safety is our priority. We provide comprehensive support and resources to ensure a ragging-free campus.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="cursor-pointer group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-gray-800">Anonymous Reporting</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Report any ragging incident safely without revealing your identity. Your privacy is guaranteed and protected.
                  </p>
                </div>
              </div>

              <div className="cursor-pointer group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-gray-800">Instant Help</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Get connected instantly to the Anti-Ragging Cell and student welfare officers available 24/7.
                  </p>
                </div>
              </div>

              <div className="cursor-pointer group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-gray-800">Support & Guidance</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Access professional counseling and support programs to recover and rebuild your confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 px-6 bg-gradient-to-br from-white via-surface to-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-bold mb-6 text-gray-800">
                  Your Safety, Our Mission
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  We believe every student deserves a safe and respectful environment. Our comprehensive anti-ragging system ensures immediate action and long-term prevention.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Real-time Monitoring</p>
                      <p className="text-gray-600">Advanced system to detect and prevent ragging incidents</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Legal Support</p>
                      <p className="text-gray-600">Expert legal guidance for victims and their families</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Awareness Programs</p>
                      <p className="text-gray-600">Regular workshops and sessions on anti-ragging policies</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                {/* Decorative background for card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl transform rotate-3"></div>
                <div className="relative bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white shadow-xl">
                  <h4 className="text-2xl font-bold mb-6">Need Immediate Help?</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-colors">
                      <p className="text-sm text-white/80 mb-1">National Helpline</p>
                      <p className="text-2xl font-bold">1800-180-5522</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-colors">
                      <p className="text-sm text-white/80 mb-1">UGC Helpline</p>
                      <p className="text-2xl font-bold">15522</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-colors">
                      <p className="text-sm text-white/80 mb-1">Email Support</p>
                      <p className="text-lg font-semibold break-all">helpline@antiragging.net</p>
                    </div>
                  </div>
                  <Link to="/form" className="cursor-pointer block text-center w-full mt-6 bg-white text-primary font-bold py-4 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    Report Now
                  </Link>
                </div>
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