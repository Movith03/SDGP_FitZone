import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image from '../assets/close.png' // Ensure this path is correct

const YourExperience = ({ saveData }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  const navigate = useNavigate()
  const options = ['Beginner', 'Intermediate', 'Advanced']

  const handleOptionChange = (option) => {
    setSelectedOption(option)
  }

  const ErrorMessageModal = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-96 text-center shadow-lg">
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
    saveData({ experiencelevel: selectedOption })
  }, [selectedOption])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedOption === '') {
      setErrorMessage(true)
    } else {
      console.log('Selected option:', selectedOption)
      navigate('/sm') // Adjust the navigation path as needed
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        What is your experience level?
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
                ? 'border-green-500 bg-green-100'
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
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
      {errorMessage && (
        <ErrorMessageModal
          message={'Please select your experience level'}
          onClose={() => setErrorMessage(false)}
        />
      )}
    </div>
  )
}

export default YourExperience
