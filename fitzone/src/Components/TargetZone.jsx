import React, { useEffect, useState } from 'react'
import './targetZone.css' // Link to your CSS file
import body from '../assets/body.webp'
import { useNavigate } from 'react-router-dom'
import image from '../assets/close.png'

const TargetZones = ({ saveData }) => {
  const [tragetZone, setTragetZone] = useState([])
  const [errorMessage, setErrorMessage] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    saveData({ targetzones: tragetZone })
  }, [tragetZone])

  const handleCheckboxChange = (traget) => {
    if (tragetZone.includes(traget)) {
      setTragetZone(tragetZone.filter((f) => f !== traget))
    } else {
      setTragetZone([...tragetZone, traget])
    }
  }

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

  const handleclick = (e) => {
    if (tragetZone <= 1) {
      setErrorMessage(true)
      console.log('Pls Select')
    } else {
      saveData({ tragetzone: tragetZone })
      navigate('/yp')
    }
  }
  return (
    <div className="target-zones-container">
      <h2 className="target-zones-title">Choose Your Target Zones</h2>
      <div className="image-container">
        <img
          src={body} // Replace with your image path
          alt="Target Zones"
          className="target-image"
        />
        <div
          className={`zone ${tragetZone.includes('arms') ? 'selected' : ''}`}
          style={{ top: '30%', left: '20%' }}
          onClick={() => {
            handleCheckboxChange('arms')
          }}
        >
          <span className="zone-label">ARMS</span>
        </div>
        <div
          className={`zone ${tragetZone.includes('belly') ? 'selected' : ''}`}
          style={{ top: '27%', left: '43%' }}
          onClick={() => {
            handleCheckboxChange('belly')
          }}
        >
          <span className="zone-label">BELLY</span>
        </div>
        <div
          className={`zone ${tragetZone.includes('pecs') ? 'selected' : ''}`}
          style={{ top: '17%', left: '60%' }}
          onClick={() => {
            handleCheckboxChange('pecs')
          }}
        >
          <span className="zone-label">PECS</span>
        </div>
        <div
          className={`zone ${tragetZone.includes('legs') ? 'selected' : ''}`}
          style={{ top: '70%', left: '30%' }}
          onClick={() => {
            handleCheckboxChange('legs')
          }}
        >
          <span className="zone-label">LEGS</span>
        </div>
      </div>
      <div>
        <button className="targetWeiget-btn" onClick={handleclick}>
          Next
        </button>
      </div>
      {errorMessage && (
        <ErrorMessageModal
          message={'Please select your traget zone'}
          onClose={() => {
            setErrorMessage(false)
          }}
        />
      )}
    </div>
  )
}

export default TargetZones
