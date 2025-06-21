import React, { useState } from 'react'
import axios from 'axios'

const ExerciseForm = () => {
  const [exerciseName, setExerciseName] = useState('')
  const [description, setDescription] = useState('')
  const [videoLink, setVideoLink] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const exerciseData = {
      exseciseName: exerciseName,
      description: description,
      video: [videoLink], // Video links stored in an array
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/exerc',
        exerciseData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 201) {
        setSuccessMessage('Exercise created successfully!')
        setErrorMessage('')
        setExerciseName('')
        setDescription('')
        setVideoLink('')
      }
    } catch (error) {
      console.error(error)
      setSuccessMessage('')
      setErrorMessage('Failed to create exercise. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg  mt-10">
      <h2 className="text-2xl font-bold mb-6">Create a New Exercise</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="exerciseName"
            className="block text-sm font-medium text-gray-700"
          >
            Exercise Name:
          </label>
          <input
            type="text"
            id="exerciseName"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            required
            placeholder="Enter exercise name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter exercise description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="videoLink"
            className="block text-sm font-medium text-gray-700"
          >
            Video Link (YouTube or other):
          </label>
          <input
            type="text"
            id="videoLink"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            required
            placeholder="Enter video link"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Exercise
        </button>
      </form>

      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </div>
  )
}

export default ExerciseForm
