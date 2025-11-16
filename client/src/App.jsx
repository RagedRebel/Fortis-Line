
import { Link,BrowserRouter,Routes,Route } from 'react-router-dom'
import Landing from './pages/LandingPage.jsx'
import FormPage from './pages/Form.jsx'
import Complaints from './pages/Complaints.jsx'
import TrackComplaint from './pages/TrackComplaint.jsx'
import ComplaintDetail from './pages/AdminComplaintDetail.jsx'
import UserComplaintDetail from './pages/UserComplaintDetail.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/complaint/:id" element={<UserComplaintDetail />} />

        <Route element={<ProtectedRoute />}> 
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/complaints/:id" element={<ComplaintDetail />} />
        </Route>

        <Route path="/admin" element={<AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App