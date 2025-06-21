import React, { useEffect, useState } from 'react'
import './UserDetailsSummary.css' // Link to your CSS file
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bar } from 'react-chartjs-2' // Importing the Bar chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js' // Import necessary components from Chart.js

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDetailsSummary = ({ alldata }) => {
  console.log('Your Summary is: ', alldata)
  const navigate = useNavigate()

  const [showMessage, setShowMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('') // State to hold the success message

  useEffect(() => {
    if (Object.keys(alldata).length < 1) {
      navigate('/')
    }
  }, [alldata, navigate])

  const handleClick = () => {
    setShowMessage(true)
  }

  const jwtToken = localStorage.getItem('token')

  const SubmitUserData = () => {
    const data = JSON.stringify(alldata)

    axios
      .post('http://127.0.0.1:3000/api/v1/userdata/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response)

        if (response.status === 201) {
          setSuccessMessage('Data submitted successfully!')
          setShowMessage(false)

          try {
            const userid = {
              userid: alldata.userid,
              currentweight: alldata.currentweight,
              currentbodytype: alldata.currentbodytype,
              goalbodytype: alldata.goalbodytype,
              muscleGoal: alldata.muscleGoal,
              age: alldata.age,
            }
            const usersch = JSON.stringify(userid)
            axios
              .post('http://127.0.0.1:3000/api/v1/workout', usersch, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${jwtToken}`,
                },
              })
              .then((response) => {
                console.log('success')
                axios
                  .patch(
                    `http://127.0.0.1:3000/api/v1/user/${alldata.userid}`,
                    usersch,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                      },
                    }
                  )
                  .then((response) => {
                    console.log('first login is modified!', response)
                  })
                  .catch((err) => {
                    console.log('first login modified error: ', err)
                  })
              })
              .catch((err) => {
                setSuccessMessage(
                  `Data not added!: Status: ${err.response.data.status}`
                )
              })

            const userdietdata = {
              userid: alldata.userid,
              currentweight: alldata.currentweight,
              goalweight: alldata.goalweight,
              diet: alldata.diet,
              allergicfoods: alldata.allergicfoods,
              age: alldata.age,
            }

            axios
              .post(
                'http://127.0.0.1:3000/api/v1/dietplan/userdiet',
                userdietdata,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                  },
                }
              )
              .then((response) => {
                console.log('Diet plan assign done')
              })
              .catch((err) => {
                console.log('diet plan assign not success')
                console.log(err.message)
              })
          } catch (error) {
            console.log(error)
          }

          // setTimeout(() => {
          //   navigate('/home')
          // }, 3000)
        }
      })
      .catch((error) => {
        console.error(error)
        setSuccessMessage(
          `Data not added!: Status: ${error.response.data.status}`
        ) // Set error message
      })
  }

  const ConfirmationModal = ({ message, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>{message}</h3>
          <button onClick={onClose} className="modal-close-btn">
            Close
          </button>
          <button className="modal-submit-btn" onClick={SubmitUserData}>
            Submit
          </button>
        </div>
      </div>
    )
  }

  const SuccessMessageModal = ({ message, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>{message}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  }

  const data = {
    labels: ['Current Weight', 'Target Weight'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [alldata.currentweight, alldata.goalweight],
        backgroundColor: ['#007bff', '#00c853'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  }

  if (Object.keys(alldata).length < 1) {
    return <></>
  } else {
    return (
      <div className="summary-container">
        <h2 className="summary-title">Your Summary</h2>
        <div className="summary-details">
          <div className="summary-section">
            <p>
              <strong>User ID:</strong> {alldata.userid}
            </p>
            <p>
              <strong>Age:</strong> {alldata.age}
            </p>
            <p>
              <strong>Current Weight:</strong> {alldata.currentweight} kg
            </p>
            <p>
              <strong>Target Weight:</strong> {alldata.goalweight} kg
            </p>
            <p>
              <strong>Current Height:</strong> {alldata.height} kg
            </p>
          </div>
          <div className="summary-section">
            <p>
              <strong>Current Body Type:</strong> {alldata.currentbodytype}
            </p>
            <p>
              <strong>Goal Body Type:</strong> {alldata.goalbodytype}
            </p>
            <p>
              <strong>Muscle Goal:</strong> {alldata.muscleGoal}
            </p>
            <p>
              <strong>Diet:</strong> {alldata.diet}
            </p>
          </div>
          <div className="summary-section">
            <p>
              <strong>Workout Time:</strong> {alldata.workouttime}
            </p>
            <p>
              <strong>Workout Days:</strong> {alldata.workoutdays.join(', ')}
            </p>
            <p>
              <strong>Workout Duration:</strong> {alldata.workoutduration}{' '}
              minutes
            </p>
          </div>
        </div>
        <div className="chart-section">
          <h3>Weight Progress</h3>
          <Bar data={data} options={options} />
        </div>
        <button className="summary-s-btn" onClick={handleClick}>
          Submit
        </button>
        {showMessage && (
          <ConfirmationModal
            message={'Are your details correct?'}
            onClose={() => setShowMessage(false)}
          />
        )}
        {successMessage && (
          <SuccessMessageModal
            message={successMessage}
            onClose={() => setSuccessMessage('')} // Clear success message
          />
        )}
      </div>
    )

    // try{

    // }catch(){
    //   return <h2>Error While Fetci</h2>
    // }
  }
}

export default UserDetailsSummary
