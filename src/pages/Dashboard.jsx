import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CurrencyDollarIcon, UserGroupIcon, ChartBarIcon, ArrowTrendingUpIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../App'
import axios from 'axios'

function InvestorDashboard() {
  const id = localStorage.getItem("id");
  const [investor, setInvestor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${baseUrl}/investors/${id}`)
        setInvestor(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching investor data:", err)
        setError("Failed to load investor data")
        setLoading(false)
      }
    }
    
    fetchInvestor()
  }, [id])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading investor data...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>
  }

  if (!investor) {
    return <div className="text-center p-4">No investor data found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Investor Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile and track your investments
        </p>
      </div>

      {/* Investor Profile */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Investor Profile
          </h2>
          <button className="flex items-center text-primary-600 hover:text-primary-700">
            <PencilIcon className="h-4 w-4 mr-1" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h3>
              <p className="mt-1 text-base text-gray-900 dark:text-white">
                {investor.firstName} {investor.lastName}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
              <p className="mt-1 text-base text-gray-900 dark:text-white">{investor.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
              <p className="mt-1 text-base text-gray-900 dark:text-white">{investor.phone}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Investment Scale</h3>
              <p className="mt-1 text-base text-gray-900 dark:text-white">{investor.investmentScale}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry Interests</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {investor.industryInterests && investor.industryInterests.map((industry, index) => (
                  <span 
                    key={index} 
                    className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {investor.stats && investor.stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                {stat.iconType === 'currency' && 
                  <CurrencyDollarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                {stat.iconType === 'chart' && 
                  <ChartBarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                {stat.iconType === 'users' && 
                  <UserGroupIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                {stat.iconType === 'trend' && 
                  <ArrowTrendingUpIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400"> vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {investor.recentActivities && investor.recentActivities.map((activity) => (
            <motion.div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {activity.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
              {activity.amount && (
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  {activity.amount}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvestorDashboard