
import { Link,BrowserRouter,Routes,Route } from 'react-router-dom'
import Landing from './pages/LandingPage.jsx'
import FormPage from './pages/Form.jsx'
import Complaints from './pages/Complaints.jsx'
import TrackComplaint from './pages/TrackComplaint.jsx'
import ComplaintDetail from './pages/ComplaintDetail.jsx'

function App() {
  return (
<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/complaints/:id" element={<ComplaintDetail />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App