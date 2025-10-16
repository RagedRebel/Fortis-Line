import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import FormPage from './pages/Form.jsx'
import Complaints from './pages/Complaints.jsx'
import TrackComplaint from './pages/TrackComplaint.jsx'
import ComplaintDetail from './pages/ComplaintDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/complaints/:id" element={<ComplaintDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
