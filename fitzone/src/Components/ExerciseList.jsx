import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ExerciseList.css'
import ExerciseEditForm from './ExerciseEditForm' // Ensure this component is styled with Tailwind as well

const ExerciseList = () => {
  const [exercises, setExercises] = useState([])
  const [editExercise, setEditExercise] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Fetch all exercises
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/exerc')
        setExercises(response.data.data.exercises)
      } catch (error) {
        console.error('Failed to fetch exercises.', error)
      }
    }
    fetchExercises()
  }, [])

  const handleEditClick = (exercise) => {
    setEditExercise(exercise)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditExercise(null)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/v1/exerc/${id}`)
      setExercises(exercises.filter((exercise) => exercise._id !== id))
    } catch (error) {
      console.error('Failed to delete exercise.', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">All Exercises</h2>
      <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border border-gray-300">Exercise Name</th>
            <th className="py-2 px-4 border border-gray-300">Description</th>
            <th className="py-2 px-4 border border-gray-300">Video Link</th>
            <th className="py-2 px-4 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border border-gray-300">
                {exercise.exseciseName}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {exercise.description}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <a
                  href={exercise.video[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Watch Video
                </a>
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <button
                  onClick={() => handleEditClick(exercise)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exercise._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && editExercise && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Exercise</h3>
            <ExerciseEditForm
              exercise={editExercise}
              closeModal={closeModal}
              setExercises={setExercises}
              exercises={exercises}
            />
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExerciseList
