import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image from '../assets/close.png'

const WeightPage = ({ saveData }) => {
  const [weight, setWeight] = useState('')
  const [targetWeight, setTargetWeight] = useState('')
  const [height, setHeight] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const navigate = useNavigate()

  const ErrorMessageModal = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <img src={image} alt="Error" className="mx-auto mb-4 w-12" />
          <h3 className="text-red-600 font-semibold">{message}</h3>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (weight == '') {
      setShowError(true)
      setErrorMessage('Weight is required')
    } else if (height == '') {
      setShowError(true)
      setErrorMessage('Height is required')
    } else if (targetWeight == '') {
      setShowError(true)
      setErrorMessage('Target weight is required')
    } else {
      try {
        const weight_check = parseInt(weight)
        const target_check = parseInt(targetWeight)

        if (
          target_check > 150 ||
          weight_check < 25 ||
          target_check < 30 ||
          weight_check > 150
        ) {
          setErrorMessage('Weight or target value out of range')
          setShowError(true)
        } else if (parseFloat(height) > 270 || parseFloat(height) < 30) {
          setShowError(true)
          setErrorMessage('Height or target value out of range')
        } else {
          saveData({ currentweight: parseFloat(weight) }) // Save weight data as a number
          saveData({ goalweight: parseFloat(targetWeight) }) // Save weight data as a number
          saveData({ height: parseFloat(height) })
          navigate('/bodycatagory')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Your Measurements
        </h2>

        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-gray-700 font-semibold mb-2"
          >
            Current Height (cm)
          </label>
          <input
            type="text"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="current-weight"
            className="block text-gray-700 font-semibold mb-2"
          >
            Current Weight (kg)
          </label>
          <input
            type="text"
            id="current-weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter current weight"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="target-weight"
            className="block text-gray-700 font-semibold mb-2"
          >
            Target Weight (kg)
          </label>
          <input
            type="text"
            id="target-weight"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            placeholder="Enter target weight"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              navigate('/')
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      </div>

      {showError && (
        <ErrorMessageModal
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  )
}

export default WeightPage
