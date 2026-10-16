import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import styles from './LoginPage.module.css'

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
      setError('Inloggningen misslyckades.')
    }
  }

  return (
    <main className={styles.center}>
      <h1 className="h-size-2">Logga in</h1>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="email">Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            required
          />
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="password">Lösenord</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            required
          />
        </div>

        <button type="submit" className={styles['submit-button']}>Logga in</button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  )
}
