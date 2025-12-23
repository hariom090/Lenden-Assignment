import { useEffect, useState } from 'react'
import { getProfile } from '../services/profileService'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        setUser(res.data)
      } catch (err) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    fetchProfile()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {error && <p className="error">{error}</p>}

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Aadhaar:</strong> {user.aadhaar}</p>

      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
