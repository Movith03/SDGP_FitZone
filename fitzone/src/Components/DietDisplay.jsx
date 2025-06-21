import React, { useEffect, useState } from 'react'
import axios from 'axios' // Import Axios

const DietDisplay = () => {
  const [dietPlan, setDietPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

    const fetchUserDiet = async () => {
      try {
        // Fetch user's diet plan based on user ID
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/dietplan/userdiet/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT in headers
            },
          }
        )

        if (response.data.status === 'success') {
          const dietId = response.data.data.dietPlan[0]?.dietid // Extract diet ID

          if (dietId) {
            // Fetch diet details using the diet ID
            const dietResponse = await axios.get(
              `http://127.0.0.1:3000/api/v1/dietplan/${dietId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Include JWT in headers
                },
              }
            )

            setDietPlan(dietResponse.data.data.dietPlan) // Set the fetched diet plan data
          } else {
            setError('No diet plan found for this user.')
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message) // Set error message if the fetch fails
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchUserDiet()
  }, [token]) // Dependency array to fetch diet details when token changes

  if (loading) return <p className="text-center text-lg">Loading...</p> // Show loading state
  if (error) return <p className="text-red-500 text-center">Error: {error}</p> // Show error message

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Diet Plan
        </h1>
        {dietPlan ? (
          <div>
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              Plan Name: {dietPlan.planName}
            </h2>
            <h3 className="text-lg font-semibold mt-4 text-gray-700">Foods:</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              {dietPlan.foods.map((food) => (
                <li
                  key={food._id}
                  className="p-4 border rounded-md bg-gray-50 shadow-sm"
                >
                  <span className="font-bold text-gray-900">
                    {food.foodName}
                  </span>
                  : <span className="text-gray-600">{food.instructions}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-500 text-sm">
              Created At: {new Date(dietPlan.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">No diet plan available.</p>
        )}
      </div>
    </div>
  )
}

export default DietDisplay
