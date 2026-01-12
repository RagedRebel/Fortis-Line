import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios'

export default function ProtectedRoute() {
  const [status, setStatus] = useState('checking') // checking | allowed | denied

  useEffect(() => {
    let mounted = true
    axios.get(`${import.meta.env.VITE_API_URL}/admin/me`, { withCredentials: true })
      .then(() => mounted && setStatus('allowed'))
      .catch(() => mounted && setStatus('denied'))
    return () => { mounted = false }
  }, [])

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Checking admin access…</div>
      </div>
    )
  }

  if (status === 'denied') {
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}
