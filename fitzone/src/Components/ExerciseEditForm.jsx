import React, { useState } from 'react'
import axios from 'axios'

const ExerciseEditForm = ({
  exercise,
  closeModal,
  setExercises,
  exercises,
}) => {
  const [exerciseName, setExerciseName] = useState(exercise.exseciseName)
  const [description, setDescription] = useState(exercise.description)
  const [videoLink, setVideoLink] = useState(exercise.video[0])

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedExercise = {
      exseciseName: exerciseName,
      description,
      video: [videoLink],
    }

    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/api/v1/exerc/${exercise._id}`,
        updatedExercise
      )
      const updatedExerciseData = response.data.data.exercise
      setExercises(
        exercises.map((ex) =>
          ex._id === updatedExerciseData._id ? updatedExerciseData : ex
        )
      )
      closeModal() // Close the modal after updating
    } catch (error) {
      console.error('Failed to update exercise.', error)
    }
  }

  return (
    <form onSubmit={handleUpdate} className="edit-form">
      <div className="form-group">
        <label>Exercise Name:</label>
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Video Link:</label>
        <input
          type="text"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          required
        />
      </div>

      <button type="submit">Update</button>
    </form>
  )
}

export default ExerciseEditForm
