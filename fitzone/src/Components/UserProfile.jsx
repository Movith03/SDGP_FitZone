import React, { useEffect, useState } from 'react'
import axios from 'axios' // Import Axios
import userprifile from '../assets/user.png'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false) // Track if in edit mode
  const [formData, setFormData] = useState({
    // Form data state
    firstname: '',
    lastname: '',
    username: '',
    email: '',
  })

  const token = localStorage.getItem('token') // Retrieve JWT from local storage

  const getUserIdFromJWT = () => {
    if (!token) return null // Return null if token doesn't exist
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.id // Assuming 'id' is the key in your JWT payload
    } catch (e) {
      console.error('Error decoding JWT:', e)
      return null // Return null if there's an error in decoding
    }
  }

  useEffect(() => {
    const userId = getUserIdFromJWT() // Get user ID from JWT
    if (!userId) {
      setError('Invalid token or user ID not found')
      setLoading(false)
      return // Exit if userId is not valid
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT in headers
            },
          }
        )

        setUser(response.data.message.data) // Set the fetched user data
        setFormData({
          // Set form data with fetched user details
          firstname: response.data.message.data.firstname,
          lastname: response.data.message.data.lastname,
          username: response.data.message.data.username,
          email: response.data.message.data.email,
        })
      } catch (err) {
        setError(err.response?.data?.message || err) // Set error message if the fetch fails
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchUserDetails()
  }, [token]) // Dependency array to fetch user details when token changes

  const handleInputChange = (e) => {
    const { name, value } = e.target // Destructure name and value
    setFormData({ ...formData, [name]: value }) // Update form data
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission

    const userId = getUserIdFromJWT() // Get user ID again
    if (!userId) return // Exit if userId is not valid

    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/api/v1/user/${userId}`, // Use PATCH to update user
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT in headers
          },
        }
      )

      setUser(response.data.message.data) // Update user state with response data
      setIsEditing(false) // Exit editing mode
    } catch (err) {
      setError(err.response?.data?.message || err.message) // Set error message if the update fails
    }
  }

  if (loading) return <p className="text-center text-lg">Loading...</p> // Show loading state
  if (error) return <p className="text-red-500 text-center">Error: {error}</p> // Show error message

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <img
              src={userprifile} // Placeholder for user image
              alt="User"
              className="w-24 h-24 rounded-full border-2 border-gray-300 mb-2"
            />
          </div>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-2"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-2"
                placeholder="Last Name"
                required
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-2"
                placeholder="Username"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 w-full rounded mb-4"
                placeholder="Email"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Update Profile
              </button>
            </form>
          ) : (
            <div>
              <h2 className="text-xl font-semibold">
                Name: {user.firstname} {user.lastname}
              </h2>
              <p className="text-lg">
                Username: <span className="font-normal">{user.username}</span>
              </p>
              <p className="text-lg">
                Email: <span className="font-normal">{user.email}</span>
              </p>
              {/* Add more fields as necessary */}
              <button
                onClick={() => setIsEditing(true)} // Enable editing mode
                className="mt-4 bg-yellow-500 text-white p-2 rounded"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
