import { useEffect, useState } from 'react'
import './yourplan.css' // Updated CSS file
import { useNavigate } from 'react-router-dom'
import image from '../assets/close.png'

const YourPlan = ({ saveData, alldata }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const navigate = useNavigate()
  const options = [
    { plan: 'One months traing', value: 1 },
    { plan: '1 - 3 months traing', value: 3 },
    { plan: '1 - 6 months traing', value: 6 },
    { plan: '6 +   months traing', value: 9 },
  ]

  useEffect(() => {
    saveData({ planduration: selectedOption })
  }, [selectedOption])

  const ErrorMessageModal = ({ message, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <img src={image} alt="Error" className="error-logo" />{' '}
          {/* Add your error logo */}
          <h3 className="error-message">{message}</h3>
          <button onClick={onClose} className="modal-close-btn">
            Close
          </button>
        </div>
      </div>
    )
  }

  const handleOptionChange = (option) => {
    setSelectedOption(option)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedOption == '') {
      setErrorMessage(true)
    } else {
      console.log('Selected option:', selectedOption)
      navigate('/yx')
    }
  }

  return (
    <div className="your-plan-container">
      <h2 className="your-plan-title">What is your plan?</h2>
      <form className="your-plan-form" onSubmit={handleSubmit}>
        {options.map((option) => (
          <label
            key={option.plan}
            className={`your-plan-option ${
              selectedOption === option.value ? 'selected' : ''
            }`}
          >
            <input
              type="radio"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleOptionChange(option.value)}
              className="your-plan-radio"
            />
            {option.plan}
          </label>
        ))}
        <button type="submit" className="your-plan-submit-btn">
          Submit
        </button>
      </form>
      {/* {
        <ErrorMessageModal
          message={'Please select traning period'}
          onClose={() => {
            setErrorMessage(false)
          }}
        />
      } */}
    </div>
  )
}

export default YourPlan
