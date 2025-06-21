import React, { useState } from 'react'
import axios from 'axios'
import Select from 'react-select'

const DietPlanForm = () => {
  const [planName, setPlanName] = useState('')
  const [selectedFoods, setSelectedFoods] = useState([])
  const [instructions, setInstructions] = useState('')
  const [message, setMessage] = useState('')

  // Common food options
  const foodOptions = [
    { value: 'Chicken', label: 'Chicken' },
    { value: 'Beef', label: 'Beef' },
    { value: 'Fish', label: 'Fish' },
    { value: 'Rice', label: 'Rice' },
    { value: 'Pasta', label: 'Pasta' },
    { value: 'Salad', label: 'Salad' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Nuts', label: 'Nuts' },
    { value: 'Yogurt', label: 'Yogurt' },
    { value: 'Eggs', label: 'Eggs' },
    { value: 'Bread', label: 'Bread' },
    { value: 'Cheese', label: 'Cheese' },
    { value: 'Oatmeal', label: 'Oatmeal' },
    { value: 'Beans', label: 'Beans' },
  ]

  const handleFoodChange = (selectedOptions) => {
    setSelectedFoods(selectedOptions)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dietPlanData = {
      planName,
      foods: selectedFoods.map((food) => food.value), // Get only the values of selected foods
      instructions,
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/dietplan',
        dietPlanData
      )
      if (response.status === 201) {
        setMessage('Diet plan created successfully!')
        // Clear form fields after success
        setPlanName('')
        setSelectedFoods([])
        setInstructions('')
      }
    } catch (error) {
      console.error('Error adding diet plan:', error)
      setMessage('Error adding diet plan. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6  rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Diet Plan</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Plan Name:</label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Enter diet plan name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Select Foods:
          </label>
          <Select
            isMulti
            options={foodOptions}
            value={selectedFoods}
            onChange={handleFoodChange}
            placeholder="Select foods..."
            className="react-select-container"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Instructions:
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instructions for the diet plan"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Diet Plan
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

export default DietPlanForm
