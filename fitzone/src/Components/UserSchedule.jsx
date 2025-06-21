import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'

const UserSchedule = () => {
  const [schedule, setSchedule] = useState(null)
  const [exercises, setExercises] = useState([])
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [message, setMessage] = useState('')
  const [trackingStatus, setTrackingStatus] = useState(false)

  const jwtToken = localStorage.getItem('token')

  const getUserIdFromJWT = () => {
    const payload = JSON.parse(atob(jwtToken.split('.')[1]))
    return payload.id
  }

  const fetchUserSchedule = async () => {
    const userId = getUserIdFromJWT()

    try {
      const userScheduleResponse = await axios.get(
        `http://127.0.0.1:3000/api/v1/workout/${userId}`,
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      )

      const userSchedule = userScheduleResponse.data.data.userSchedule[0]
      if (!userSchedule) {
        setMessage('No schedule found for this user.')
        return
      }

      const { scheduleid } = userSchedule
      const scheduleResponse = await axios.get(
        `http://127.0.0.1:3000/api/v1/schedule/${scheduleid}`,
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      )
      setSchedule(scheduleResponse.data.data.schedule)

      const exercisesData = await Promise.all(
        scheduleResponse.data.data.schedule.exercises.map(async (exercise) => {
          const exerciseResponse = await axios.get(
            `http://127.0.0.1:3000/api/v1/exerc/${exercise.exerciseid}`,
            { headers: { Authorization: `Bearer ${jwtToken}` } }
          )
          return {
            ...exerciseResponse.data.data.exercise,
            sets: exercise.sets,
            reps: exercise.reps,
          }
        })
      )
      setExercises(exercisesData)
    } catch (error) {
      setMessage('Error fetching user schedule. Please try again.')
      console.error(error)
    }
  }

  const markExerciseComplete = async (exerciseid) => {
    try {
      const userId = getUserIdFromJWT()
      await axios.post(
        'http://127.0.0.1:3000/api/v1/tracking',
        { userid: userId, exerciseid: exerciseid },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      )
      setTrackingStatus(true)
      setMessage('Exercise marked as completed.')
    } catch (error) {
      setMessage('Error tracking exercise completion.')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUserSchedule()
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        Your Workout Plan
      </h2>

      {message && (
        <div className="mb-4 text-red-600 font-semibold text-center">
          {message}
        </div>
      )}

      {schedule && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
            {schedule.ScheduleName}
          </h3>
          <p className="mb-4 text-gray-700">{schedule.description}</p>

          <div className="exercise-dropdown mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select an Exercise:
            </label>
            <Select
              options={exercises.map((exercise, index) => ({
                value: index,
                label: `${exercise.exseciseName} - ${exercise.sets} sets of ${exercise.reps} reps`,
              }))}
              onChange={(option) => {
                setSelectedExercise(option)
                setTrackingStatus(false) // Reset status when exercise changes
              }}
            />
          </div>

          {selectedExercise && exercises[selectedExercise.value] && (
            <div className="exercise-details mt-6">
              <div className="p-4 bg-indigo-50 rounded-md shadow-inner">
                <h3 className="text-xl font-bold text-indigo-700">
                  {exercises[selectedExercise.value].exseciseName}
                </h3>
                <p className="text-gray-700 mt-2">
                  {exercises[selectedExercise.value].description}
                </p>
              </div>

              <div className="video-section mt-6">
                <h4 className="text-lg font-semibold text-indigo-600">
                  How to Do:
                </h4>
                {exercises[selectedExercise.value].video.map(
                  (videoUrl, idx) => (
                    <div key={idx} className="video-wrapper my-4">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoUrl}`}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg shadow-lg"
                      ></iframe>
                    </div>
                  )
                )}
              </div>

              <div className="tracking-section mt-8 text-center">
                <button
                  className={`mt-4 px-6 py-2 rounded-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    trackingStatus
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  onClick={() =>
                    markExerciseComplete(exercises[selectedExercise.value]._id)
                  }
                  disabled={trackingStatus} // Disable button if already completed
                >
                  {trackingStatus ? 'Exercise Completed!' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserSchedule
