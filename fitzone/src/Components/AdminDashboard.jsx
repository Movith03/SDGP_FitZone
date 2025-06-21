import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="flex">
      <aside className="w-1/4 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="usermanagement"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                User Management
              </Link>
            </li>
            <li>
              <Link to="ex" className="block p-2 hover:bg-gray-700 rounded">
                Add Exercises
              </Link>
            </li>
            <li>
              <Link to="el" className="block p-2 hover:bg-gray-700 rounded">
                Manage Exersice
              </Link>
            </li>
            <li>
              <Link
                to="dietplan"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Add Diet Plans
              </Link>
            </li>
            <li>
              <Link to="xx" className="block p-2 hover:bg-gray-700 rounded">
                Add Schedule
              </Link>
            </li>
            <li>
              <Link to="sx" className="block p-2 hover:bg-gray-700 rounded">
                Schedule Manager
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <Outlet /> {/* This is where the routed components will render */}
      </main>
    </div>
  )
}

export default AdminDashboard
