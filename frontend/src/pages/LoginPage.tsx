import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(formData.email, formData.password)
      navigate('/admin')
    } catch (error) {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <main className="center">
      <h1 className="h-size-2">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          onChange={handleInputChange} 
          value={formData.email}
          required 
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          onChange={handleInputChange}
          value={formData.password}
          required 
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </main>
  )
}
