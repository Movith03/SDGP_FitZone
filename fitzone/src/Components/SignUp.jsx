import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Dialog Component for displaying messages
const Dialog = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <p className="text-lg text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  )
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (formData.firstname === '') {
      setDialogMessage('First name is required.')
      setShowDialog(true)
      setLoading(false)
      return
    } else if (formData.lastname === '') {
      setDialogMessage('Last name is required.')
      setShowDialog(true)
      setLoading(false)
      return
    } else if (formData.username === '') {
      setDialogMessage('Username is required.')
      setShowDialog(true)
      setLoading(false)
      return
    } else if (!isValidEmail(formData.email)) {
      setDialogMessage('Please provide a valid email address.')
      setShowDialog(true)
      setLoading(false)
      return
    } else if (formData.password !== formData.passwordConfirm) {
      setDialogMessage('Passwords do not match.')
      setShowDialog(true)
      setLoading(false)
      return
    } else if (formData.password.length < 8) {
      setDialogMessage('Password must be at least 8 characters long.')
      setShowDialog(true)
      setLoading(false)
      return
    } else {
      try {
        const response = await axios.post(
          'http://127.0.0.1:3000/api/v1/user/signup',
          formData
        )

        setSuccess('Sign Up Successful! Redirecting...')
        setTimeout(() => {
          navigate('/signin')
        }, 2000)
      } catch (err) {
        setError(err.response?.data?.message || 'Error creating user')
        setDialogMessage(error)
        setShowDialog(true)
      } finally {
        setLoading(false)
      }
    }
  }

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Sign Up Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Create Your Account
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Already have an account? Sign In
          </button>
        </form>
        {showDialog && (
          <Dialog
            message={dialogMessage}
            onClose={() => setShowDialog(false)}
          />
        )}
      </div>
    </div>
  )
}

export default SignUp
