import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image from '../assets/close.png' // Ensure this path is correct

const MuscleGoal = ({ saveData }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const options = ['Muscle Gain', 'Muscle Loss']

  const handleOptionChange = (option) => {
    setSelectedOption(option)
    setShowError(false) // Reset error when a valid option is selected
  }

  const ErrorMessageModal = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-96 text-center">
          <img src={image} alt="Error" className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg text-gray-700 mb-4">{message}</h3>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    saveData({ muscleGoal: selectedOption })
  }, [selectedOption])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedOption === '') {
      setShowError(true) // Show error message if no option is selected
    } else {
      navigate('/yd') // Adjust the navigation path as needed
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        What is your muscle goal?
      </h2>
      <form
        className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        {options.map((option) => (
          <label
            key={option}
            className={`block mb-4 p-4 text-lg font-semibold cursor-pointer border rounded-lg hover:bg-gray-100 transition ${
              selectedOption === option
                ? 'border-indigo-500 bg-indigo-100'
                : 'border-gray-300'
            }`}
          >
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
              className="mr-3"
            />
            {option}
          </label>
        ))}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Next
        </button>
      </form>

      {showError && (
        <ErrorMessageModal
          message={'Please select your muscle goal'}
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  )
}

export default MuscleGoal
