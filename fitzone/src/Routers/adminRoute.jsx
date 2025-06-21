import { Route, Routes, useLocation } from 'react-router-dom'
import AdminDashboard from '../Components/AdminDashboard' // Import your AdminDashboard
import ExerciseForm from '../Components/ExerciseForm'
import DietPlanForm from '../Components/Dietplancreate'
import UserManagement from '../Components/UserManagement'
import ScheduleForm from '../Components/ScheduleForm'
import ExerciseList from '../Components/ExerciseList'
import ScheduleManager from '../Components/ScheduleManager'

const AppRoutes = ({ saveData, alldata }) => {
  const navigate = useNavigate()
  const location = useLocation()

  // Other useEffect and code...

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/* Other user routes */}

        {/* Admin Dashboard Route */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="ex" element={<ExerciseForm />} />
          <Route path="dietplan" element={<DietPlanForm />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="xx" element={<ScheduleForm />} />
          <Route path="el" element={<ExerciseList />} />
          <Route path="sx" element={<ScheduleManager />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
