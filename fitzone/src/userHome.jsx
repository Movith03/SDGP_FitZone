import { useState } from 'react'
import AppRoutes from './Routers/appRouters'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './NavBar'

const UserHome = () => {
  const [userData, setUserData] = useState({})

  const saveData = (data) => {
    setUserData((prevData) => ({
      ...prevData,
      ...data,
    }))
  }

  return (
    <div>
      <Router>
        <AppRoutes saveData={saveData} alldata={userData} />
        {console.log(userData)}
        {/* Display Collected Data
      <div>
        <h3>Collected Data:</h3>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div> */}
      </Router>
    </div>
  )
}

export default UserHome
