import { useEffect, useState } from 'react'
import { getProfile } from '../services/profileService'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [showAadhaar, setShowAadhaar] = useState(false)
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

const formatAadhaar = (aadhaar) => {
  if (!aadhaar) return ''
  return aadhaar.match(/.{1,4}/g)?.join(' ') || aadhaar
}

const getMaskedAadhaar = (aadhaar) => {
  if (!aadhaar) return ''
  const last4 = aadhaar.slice(-4)
  return '**** **** ' + last4
}


  if (!user) return <p>Loading...</p>

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {error && <p className="error">{error}</p>}

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {/* Aadhaar with toggle */}
      <div className="aadhaar-wrapper">
        <p>
          <strong>Aadhaar:</strong>{' '}
          {showAadhaar
  ? formatAadhaar(user.aadhaar)
  : getMaskedAadhaar(user.aadhaar)}

        </p>

      <span
  className={`aadhaar-toggle ${showAadhaar ? 'open' : ''}`}
  onClick={() => setShowAadhaar(!showAadhaar)}
  title={showAadhaar ? 'Hide Aadhaar' : 'Show Aadhaar'}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {showAadhaar ? (
      <>
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.64-1.45 1.56-2.77 2.7-3.88" />
        <path d="M1 1l22 22" />
        <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8a11.05 11.05 0 0 1-5.17 5.94" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
</span>

      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
