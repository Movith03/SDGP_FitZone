import React, { useEffect, useState } from 'react'
import './allegicfood.css'
import { useNavigate } from 'react-router-dom'

const AllergicFoods = ({ saveData }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFoods, setSelectedFoods] = useState([])
  const navigate = useNavigate()

  const foods = [
    { name: 'Peanuts', emoji: '🥜' },
    { name: 'Dairy', emoji: '🥛' },
    { name: 'Gluten', emoji: '🍞' },
    { name: 'Seafood', emoji: '🦐' },
    { name: 'Soy', emoji: '🌱' },
    { name: 'Eggs', emoji: '🍳' },
    { name: 'Tree Nuts', emoji: '🌰' },
    { name: 'Wheat', emoji: '🌾' },
    { name: 'Shellfish', emoji: '🦀' },
  ]

  const handleCheckboxChange = (food) => {
    if (selectedFoods.includes(food)) {
      setSelectedFoods(selectedFoods.filter((f) => f !== food))
    } else {
      setSelectedFoods([...selectedFoods, food])
    }
  }

  useEffect(() => {
    saveData({ allergicfoods: selectedFoods })
  }, [selectedFoods])

  const submitAllergicFoods = (e) => {
    navigate('/workout')
  }

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="allergic-foods-container">
      <h2 className="allergic-foods-title">Select Allergic Foods</h2>

      <form className="allergic-foods-form" onSubmit={submitAllergicFoods}>
        <div className="allergic-search-section">
          <input
            type="text"
            id="allergic-search-bar"
            placeholder="Search foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="allergic-search-input"
          />
        </div>

        <div className="allergic-checkbox-group" id="allergic-foods-list">
          {filteredFoods.map((food) => (
            <label className="allergic-food-option" key={food.name}>
              <input
                type="checkbox"
                name="allergic-foods"
                value={food.name}
                checked={selectedFoods.includes(food.name)}
                onChange={() => handleCheckboxChange(food.name)}
                className="allergic-checkbox"
              />
              <div className="allergic-food-text">
                <span>{food.name}</span>
                <span className="allergic-food-icon">
                  <i className="icon">{food.emoji}</i>
                </span>
              </div>
            </label>
          ))}
        </div>

        <button type="submit" className="allergic-submit-btn">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AllergicFoods
