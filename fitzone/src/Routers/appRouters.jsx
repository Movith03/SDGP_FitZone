import { Route, Routes, useLocation } from 'react-router-dom'
import Login from '../login'
import WeightPage from '../Components/WeightPage'
import BodyCatagory from '../Components/BodyCatagory'
import AgePage from '../Components/AgePage'
import { isTokenValid } from '../util/util'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AllergicFoods from '../Components/AllergicFoods '
import WorkoutScheduler from '../Components/WorkoutScheduler'
import TargetZones from '../Components/targetZone'
import YourPlan from '../Components/YourPlan'
import YourExperience from '../Components/YourExperience'
import UserDetailsSummary from '../Components/UserDetailsSummary'
import Home from '../Components/Home'
import YourDiet from '../Components/YourDiet'
import MuscleGoal from '../Components/MuscleGoal '
import ExerciseForm from '../Components/ExerciseForm'
import ExerciseList from '../Components/ExerciseList'
import ScheduleForm from '../Components/ScheduleForm'
import ScheduleManager from '../Components/ScheduleManager'
import UserSchedule from '../Components/UserSchedule'
import UserTracking from '../Components/UserTracking '
import DietPlanForm from '../Components/Dietplancreate'
import UserProfile from '../Components/userprofile'
import DietDisplay from '../Components/DietDisplay'
import Dashboard from '../Components/Dashbord'
import SignUp from '../Components/SignUp'
import Navbar from '../NavBar'
import MotivationPage from '../Components/MotivationPage'
import UserManagement from '../Components/UserManagement'
import AdminDashboard from '../Components/AdminDashboard'

const AppRoutes = ({ saveData, alldata }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const token = localStorage.getItem('token')

  const getUserTypeFromJWT = () => {
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.userType
    } catch (e) {
      console.error('Error decoding JWT:', e)
      return null
    }
  }

  useEffect(() => {
    const publicPaths = ['/signin', '/signup']
    const user = isTokenValid()
    const userType = getUserTypeFromJWT()
    console.log('Log is: ', user.userType)

    if (!user && !publicPaths.includes(location.pathname)) {
      navigate('/signin')
    } else if (
      user &&
      userType !== 'Admin' &&
      [
        '/ex',
        '/dietplan',
        '/usermanagement',
        '/xx',
        '/el',
        '/sx',
        'admin',
      ].includes(location.pathname)
    ) {
      navigate('/dashboard')
    }
  }, [navigate, location])

  const shouldShowNavbar = !['/signup', '/signin'].includes(location.pathname)

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/age" element={<AgePage saveData={saveData} />} />
        <Route path="/weight" element={<WeightPage saveData={saveData} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/usertracking" element={<UserTracking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="ex" element={<ExerciseForm />} />
          <Route path="dietplan" element={<DietPlanForm />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="xx" element={<ScheduleForm />} />
          <Route path="el" element={<ExerciseList />} />
          <Route path="sx" element={<ScheduleManager />} />
        </Route>

        <Route path="/tr" element={<TargetZones saveData={saveData} />} />
        <Route
          path="/yp"
          element={<YourPlan saveData={saveData} alldata={alldata} />}
        />
        <Route
          path="/sm"
          element={<UserDetailsSummary saveData={saveData} alldata={alldata} />}
        />
        <Route path="/yx" element={<YourExperience saveData={saveData} />} />
        <Route path="/yd" element={<YourDiet saveData={saveData} />} />
        <Route path="/ms" element={<MuscleGoal saveData={saveData} />} />
        <Route path="/al" element={<AllergicFoods saveData={saveData} />} />
        <Route
          path="/workout"
          element={<WorkoutScheduler saveData={saveData} />}
        />
        <Route path="/diet" element={<DietDisplay />} />
        <Route path="/home" element={<Home />} />
        <Route path="/m" element={<MotivationPage />} />
        <Route path="/us" element={<UserSchedule />} />
        <Route
          path="/bodycatagory"
          element={<BodyCatagory saveData={saveData} />}
        />
      </Routes>
    </>
  )
}

export default AppRoutes
