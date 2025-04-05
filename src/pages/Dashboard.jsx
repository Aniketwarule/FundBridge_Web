import { useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CurrencyDollarIcon, UserGroupIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

const mockData = {
  stats: [
    { id: 1, name: 'Total Invested', value: '$45,000', icon: CurrencyDollarIcon, change: '+12.5%', changeType: 'increase' },
    { id: 2, name: 'Active Investments', value: '12', icon: ChartBarIcon, change: '+2', changeType: 'increase' },
    { id: 3, name: 'Enterprises Funded', value: '8', icon: UserGroupIcon, change: '+1', changeType: 'increase' },
    { id: 4, name: 'Average ROI', value: '15.2%', icon: ArrowTrendingUpIcon, change: '+2.3%', changeType: 'increase' },
  ],
  portfolioPerformance: [
    { month: 'Jan', value: 30000 },
    { month: 'Feb', value: 32000 },
    { month: 'Mar', value: 35000 },
    { month: 'Apr', value: 34000 },
    { month: 'May', value: 38000 },
    { month: 'Jun', value: 42000 },
    { month: 'Jul', value: 45000 },
  ],
  recentActivities: [
    {
      id: 1,
      type: 'investment',
      description: 'New investment in TechFarm Solutions',
      amount: '$5,000',
      date: '2024-03-15',
    },
    {
      id: 2,
      type: 'return',
      description: 'Quarterly return from EcoGrow',
      amount: '$750',
      date: '2024-03-10',
    },
    {
      id: 3,
      type: 'milestone',
      description: 'GreenHarvest reached revenue milestone',
      date: '2024-03-05',
    },
  ],
}

function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Investment Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your investment portfolio and performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockData.stats.map((stat) => (
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
                <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
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

      {/* Portfolio Performance Chart */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Portfolio Performance
          </h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            <option value="7d">Last 7 days</option>
            <option value="1m">Last month</option>
            <option value="3m">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData.portfolioPerformance}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0284c7"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {mockData.recentActivities.map((activity) => (
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

export default Dashboard