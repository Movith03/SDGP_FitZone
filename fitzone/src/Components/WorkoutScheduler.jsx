import React, { useState } from 'react'
import './workoutScheduler.css'
import { useNavigate } from 'react-router-dom'

const WorkoutScheduler = ({ saveData }) => {
  const [selectedDays, setSelectedDays] = useState([])
  const [workoutDuration, setWorkoutDuration] = useState('')
  const [workoutTime, setWorkoutTime] = useState('')
  const navigate = useNavigate()

  const daysOfWeek = [
    { name: 'Monday', icon: '🏋️‍♂️' },
    { name: 'Tuesday', icon: '🏃‍♂️' },
    { name: 'Wednesday', icon: '🚴‍♂️' },
    { name: 'Thursday', icon: '🧘‍♂️' },
    { name: 'Friday', icon: '🏋️‍♀️' },
    { name: 'Saturday', icon: '🏃‍♀️' },
    { name: 'Sunday', icon: '🚶‍♂️' },
  ]

  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  const submitWorkoutSchedule = (e) => {
    e.preventDefault()
    // You can handle form submission logic here

    saveData({ workouttime: workoutTime })
    saveData({ workoutdays: selectedDays })
    saveData({ workoutduration: workoutDuration })

    console.log({ workoutDuration, selectedDays, workoutTime })
    navigate('/ms')
  }

  return (
    <div className="workout-scheduler-container">
      <h2 className="workout-scheduler-title">Home Workout Scheduler</h2>

      <form className="workout-scheduler-form" onSubmit={submitWorkoutSchedule}>
        <div className="workout-input-section">
          <label htmlFor="workout-duration" className="workout-label">
            Workout Duration (minutes):
          </label>
          <input
            type="number"
            id="workout-duration"
            name="workout-duration"
            placeholder="Enter your duration"
            min="10"
            max="180"
            required
            value={workoutDuration}
            onChange={(e) => setWorkoutDuration(e.target.value)}
            className="workout-input"
          />
        </div>

        <p>Select Workout Days:</p>
        <div className="workout-checkbox-group">
          {daysOfWeek.map((day) => (
            <label key={day.name} className="workout-day-option">
              <input
                type="checkbox"
                name="days"
                value={day.name}
                checked={selectedDays.includes(day.name)}
                onChange={() => handleDayChange(day.name)}
                className="workout-checkbox"
              />
              <div className="workout-day-text">
                <span>{day.name}</span>
                <span className="workout-day-icon">
                  <i className="icon">{day.icon}</i>
                </span>
              </div>
            </label>
          ))}
        </div>

        <div className="workout-input-section">
          <label htmlFor="workout-time" className="workout-label">
            Workout Time:
          </label>
          <input
            type="time"
            id="workout-time"
            name="workout-time"
            required
            value={workoutTime}
            onChange={(e) => setWorkoutTime(e.target.value)}
            className="workout-input"
          />
        </div>

        <button type="submit" className="workout-submit-btn">
          Submit
        </button>
      </form>
    </div>
  )
}

export default WorkoutScheduler
