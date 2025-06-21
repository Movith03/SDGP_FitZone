import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from './UserUpdateModel' // Import the Modal component

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null) // Track the user to update
  const [showModal, setShowModal] = useState(false) // Modal visibility
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUsers(response.data.data.users)
      } catch (err) {
        setError('Error fetching users')
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [token])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/v1/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsers(users.filter((user) => user._id !== id))
    } catch (err) {
      setError('Error deleting user')
    }
  }

  const handleUpdateClick = (user) => {
    setSelectedUser(user) // Set the selected user for updating
    setShowModal(true) // Show the modal
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission
    try {
      await axios.patch(
        `http://127.0.0.1:3000/api/v1/user/${selectedUser._id}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? selectedUser : user
        )
      ) // Update the local user list
      setShowModal(false) // Close the modal
    } catch (err) {
      setError('Error updating user')
      console.log(err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">First Name</th>
              <th className="border-b px-4 py-2">Last Name</th>
              <th className="border-b px-4 py-2">Username</th>
              <th className="border-b px-4 py-2">Email</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border-b px-4 py-2">{user.firstname}</td>
                <td className="border-b px-4 py-2">{user.lastname}</td>
                <td className="border-b px-4 py-2">{user.username}</td>
                <td className="border-b px-4 py-2">{user.email}</td>
                <td className="border-b px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdateClick(user)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Modal for updating user */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleUpdateSubmit}
          user={selectedUser}
          setUser={setSelectedUser}
        />
      )}
    </div>
  )
}

export default UserManagement
