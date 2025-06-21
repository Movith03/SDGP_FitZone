import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserTracking = () => {
  const [trackingData, setTrackingData] = useState([])
  const [exercises, setExercises] = useState({}) // Store fetched exercises with their IDs as keys
  const [message, setMessage] = useState('')

  const jwtToken = localStorage.getItem('token')

  const getUserIdFromJWT = () => {
    const payload = JSON.parse(atob(jwtToken.split('.')[1]))
    return payload.id
  }

  const fetchUserTracking = async () => {
    const userId = getUserIdFromJWT()
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/tracking/${userId}`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      )
      setTrackingData(response.data.data.tracking)
    } catch (error) {
      setMessage('Error fetching tracking data.')
      console.error(error)
    }
  }

  const fetchExercises = async (exerciseIds) => {
    try {
      const exercisePromises = exerciseIds.map((id) =>
        axios.get(`http://127.0.0.1:3000/api/v1/exerc/${id}`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
      )

      const exerciseResponses = await Promise.all(exercisePromises)
      const exercisesData = exerciseResponses.reduce((acc, response) => {
        const exercise = response.data.data.exercise
        acc[exercise._id] = exercise // Use exercise ID as the key
        return acc
      }, {})

      setExercises(exercisesData)
    } catch (error) {
      console.error('Error fetching exercises:', error)
    }
  }

  useEffect(() => {
    fetchUserTracking()
  }, [])

  useEffect(() => {
    // Fetch exercises when tracking data changes
    if (trackingData.length > 0) {
      const exerciseIds = [
        ...new Set(trackingData.map((item) => item.exerciseid)),
      ] // Unique exercise IDs
      fetchExercises(exerciseIds)
    }
  }, [trackingData])

  // Function to calculate tracking data for the last 7 days
  const getLast7DaysData = () => {
    const today = new Date()
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      return date.toLocaleDateString()
    })

    const completedCounts = {}
    last7Days.forEach((day) => {
      completedCounts[day] = {}
      Object.keys(exercises).forEach((exerciseId) => {
        completedCounts[day][exerciseId] = 0 // Initialize count for each exercise
      })
    })

    trackingData.forEach((item) => {
      const completedDate = new Date(item.completedAt).toLocaleDateString()
      if (completedCounts.hasOwnProperty(completedDate)) {
        completedCounts[completedDate][item.exerciseid] += 1 // Increment count
      }
    })

    return {
      labels: last7Days,
      data: Object.keys(exercises).map((exerciseId) => ({
        exerciseId: exerciseId,
        counts: last7Days.map((day) => completedCounts[day][exerciseId]),
      })),
    }
  }

  const { labels, data } = getLast7DaysData()

  const chartData = {
    labels: labels,
    datasets: data.map((exerciseData) => ({
      label:
        exercises[exerciseData.exerciseId]?.exseciseName || 'Unknown Exercise',
      data: exerciseData.counts,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    })),
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">User Tracking</h2>

      {message && (
        <div className="mb-4 text-red-600 font-semibold text-center">
          {message}
        </div>
      )}

      {trackingData.length > 0 ? (
        <>
          <div className="mb-10">
            <Bar data={chartData} />
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Exercise Completion Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((exerciseData) => (
              <div
                key={exerciseData.exerciseId}
                className="bg-white shadow-lg rounded-lg p-4"
              >
                <h4 className="font-bold text-lg text-indigo-600 mb-3">
                  {exercises[exerciseData.exerciseId]?.exseciseName ||
                    'Unknown Exercise'}
                </h4>

                <div className="space-y-2">
                  {exerciseData.counts.map((count, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        {labels[index]}
                      </span>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-lg ${
                          count > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {count > 0 ? 'Completed' : 'Not Completed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">No tracking data available.</p>
      )}
    </div>
  )
}

export default UserTracking
