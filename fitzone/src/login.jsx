import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css' // Optional: Keep custom styles for additional customization

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Clear any previous errors
    setSuccessMessage('') // Clear previous success message

    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/user/signin',
        {
          email: email.trim(),
          password: password.trim(),
        }
      )

      localStorage.setItem('token', response.data.token)
      const jwtToken = localStorage.getItem('token')

      const getUserIdFromJWT = () => {
        const payload = JSON.parse(atob(jwtToken.split('.')[1]))
        return payload.id
      }

      const uid = getUserIdFromJWT()

      const userDetailsResponse = await axios.get(
        `http://127.0.0.1:3000/api/v1/user/${uid}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      )

      const userDetails = userDetailsResponse.data.message.data

      console.log(userDetails)
      if (userDetails.firstLogin) {
        navigate('/dashboard') // Redirect to dashboard or any other page
      } else {
        navigate('/age') // Redirect to age verification page if needed
      }

      setSuccessMessage('Sign In Successful! Redirecting...')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid credentials. Please try again.'
      )
      console.error(err.response?.data?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:outline-none transition duration-300"
          >
            {successMessage ? 'Redirecting...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full mt-4 bg-white text-black py-2 px-4 rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Are you new for here? Sign Up Now
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 text-red-500 border border-red-500 bg-red-100 p-4 rounded-lg">
            <p className="text-center font-medium">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mt-6 text-green-500 border border-green-500 bg-green-100 p-4 rounded-lg">
            <p className="text-center font-medium">{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
