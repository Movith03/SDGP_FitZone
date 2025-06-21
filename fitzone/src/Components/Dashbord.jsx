import React from 'react'
import { Link } from 'react-router-dom'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  // Weight Progress Data
  const weightProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example weeks
    datasets: [
      {
        label: 'Weight (kg)',
        data: [70, 69, 68, 67], // Example data, can be dynamically fetched
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const weightOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weight Progress Over the Weeks',
      },
    },
  }

  // Workout Progress Data (Bar Chart)
  const workoutProgressData = {
    labels: ['Push-Ups', 'Squats', 'Burpees', 'Lunges'], // Example exercises
    datasets: [
      {
        label: 'Completed Reps',
        data: [50, 60, 40, 30], // Example data, can be dynamically fetched
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const workoutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Workout Reps Completed',
      },
    },
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-800 text-white">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold">Fit Zone</h2>
          <p className="mt-2">Welcome, User!</p>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link to="/profile" className="block py-2 px-4 hover:bg-gray-700">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/diet" className="block py-2 px-4 hover:bg-gray-700">
                Diet Plan
              </Link>
            </li>
            <li>
              <Link
                to="/usertracking"
                className="block py-2 px-4 hover:bg-gray-700"
              >
                User Tracking
              </Link>
            </li>
            <li>
              <Link to="/m" className="block py-2 px-4 hover:bg-gray-700">
                Motivational Content
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        {/* User Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">User Overview</h2>
            <p className="text-lg">
              Current Weight: <span className="font-normal">70 kg</span>
            </p>
            <p className="text-lg">
              Goal Weight: <span className="font-normal">65 kg</span>
            </p>
            <p className="text-lg">
              Experience Level:{' '}
              <span className="font-normal">Intermediate</span>
            </p>
          </div>

          {/* Weight Progress Chart */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Weight Progress</h2>
            <div className="h-48">
              <Line data={weightProgressData} options={weightOptions} />
            </div>
          </div>
        </div>

        {/* Workout Progress and Diet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Workout Progress Chart */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Workout Progress</h2>
            <div className="h-48">
              <Bar data={workoutProgressData} options={workoutOptions} />
            </div>
          </div>

          {/* Diet Overview Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Diet Overview</h2>
            <p className="text-lg">
              Current Diet Plan:{' '}
              <span className="font-normal">Weight Loss Plan</span>
            </p>
            <p className="text-lg">
              Next Meal:{' '}
              <span className="font-normal">Grilled Chicken with Salad</span>
            </p>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
          <ul>
            <li className="text-lg">Updated Profile on 10/01/2024</li>
            <li className="text-lg">Logged a meal on 10/02/2024</li>
            <li className="text-lg">Completed a workout on 10/03/2024</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
