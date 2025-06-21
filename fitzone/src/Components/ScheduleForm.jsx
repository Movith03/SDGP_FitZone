import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'

const ScheduleForm = () => {
  // States for form fields
  const [scheduleName, setScheduleName] = useState('')
  const [description, setDescription] = useState('')
  const [howToDo, setHowToDo] = useState('')
  const [selectedExercises, setSelectedExercises] = useState([]) // For selected exercises
  const [exercises, setExercises] = useState([]) // For fetched exercises
  const [exerciseDetails, setExerciseDetails] = useState([]) // For storing sets/reps
  const [message, setMessage] = useState('')

  // Fetch exercises from the API when the component loads
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/exerc')
        const exerciseOptions = response.data.data.exercises.map(
          (exercise) => ({
            value: exercise._id,
            label: exercise.exseciseName,
          })
        )
        setExercises(exerciseOptions)
      } catch (error) {
        console.error('Error fetching exercises:', error)
      }
    }
    fetchExercises()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const scheduleData = {
      ScheduleName: scheduleName,
      description: description,
      exercises: exerciseDetails.map((exercise) => ({
        exerciseid: exercise.exerciseid,
        sets: exercise.sets,
        reps: exercise.reps,
      })),
      howtodo: howToDo,
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/schedule',
        scheduleData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 201) {
        setMessage('Schedule created successfully!')
        // Clear form fields after success
        setScheduleName('')
        setDescription('')
        setHowToDo('')
        setSelectedExercises([])
        setExerciseDetails([])
      }
    } catch (error) {
      console.error('Error adding schedule:', error)
      setMessage('Error adding schedule. Please try again.')
    }
  }

  const handleExerciseChange = (selectedOptions) => {
    setSelectedExercises(selectedOptions)
    const newExerciseDetails = selectedOptions.map((option) => ({
      exerciseid: option.value,
      sets: 3, // Default value for sets
      reps: 10, // Default value for reps
    }))
    setExerciseDetails(newExerciseDetails)
  }

  const handleSetsRepsChange = (index, field, value) => {
    const updatedExerciseDetails = [...exerciseDetails]
    updatedExerciseDetails[index][field] = value
    setExerciseDetails(updatedExerciseDetails)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Schedule</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-lg font-medium mb-2">
            Schedule Name:
          </label>
          <input
            type="text"
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
            placeholder="Enter schedule name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-lg font-medium mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-lg font-medium mb-2">
            Select Exercises:
          </label>
          <Select
            isMulti
            options={exercises}
            value={selectedExercises}
            onChange={handleExerciseChange}
            placeholder="Search and select exercises..."
            className="react-select-container"
          />
        </div>

        {selectedExercises.length > 0 && (
          <div className="exercise-details space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              Exercise Sets and Reps
            </h3>
            {selectedExercises.map((exercise, index) => (
              <div
                key={exercise.value}
                className="exercise-detail-item space-y-2"
              >
                <p className="font-semibold">{exercise.label}</p>
                <label className="block">
                  <span className="text-sm mr-2">Sets:</span>
                  <input
                    type="number"
                    value={exerciseDetails[index]?.sets}
                    onChange={(e) =>
                      handleSetsRepsChange(index, 'sets', e.target.value)
                    }
                    min="1"
                    required
                    className="mt-1 w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm mr-2">Reps:</span>
                  <input
                    type="number"
                    value={exerciseDetails[index]?.reps}
                    onChange={(e) =>
                      handleSetsRepsChange(index, 'reps', e.target.value)
                    }
                    min="1"
                    required
                    className="mt-1 w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="form-group">
          <label className="block text-lg font-medium mb-2">How to Do:</label>
          <textarea
            value={howToDo}
            onChange={(e) => setHowToDo(e.target.value)}
            placeholder="Explain how to do the exercises"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Schedule
        </button>
      </form>

      {message && (
        <div className="mt-6 text-center text-green-600 font-semibold">
          {message}
        </div>
      )}
    </div>
  )
}

export default ScheduleForm
