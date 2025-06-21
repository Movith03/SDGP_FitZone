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
    <div className="exercise-form-container">
      <h2>Create a New Exercise</h2>
      <form onSubmit={handleSubmit} className="exercise-form">
        <div className="form-group">
          <label htmlFor="exerciseName">Exercise Name:</label>
          <input
            type="text"
            id="exerciseName"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            required
            placeholder="Enter exercise name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter exercise description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoLink">Video Link (YouTube or other):</label>
          <input
            type="text"
            id="videoLink"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            required
            placeholder="Enter video link"
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Exercise
        </button>
      </form>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}

export default ExerciseForm
