import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  MapPinIcon,
  UserIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockEnterprise = {
  id: 1,
  name: 'TechFarm Solutions',
  description: 'Smart farming technology for small-scale farmers, leveraging IoT sensors and data analytics to optimize crop yields and reduce resource waste.',
  industry: 'AgriTech',
  location: 'Kenya',
  fundingGoal: 25000,
  currentFunding: 15000,
  rating: 4.5,
  owner: {
    name: 'John Kamau',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    experience: '10 years in agriculture',
    verified: true,
  },
  images: [
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  ],
  financials: {
    revenue: [
      { month: 'Jan', value: 5000 },
      { month: 'Feb', value: 6200 },
      { month: 'Mar', value: 7800 },
      { month: 'Apr', value: 8500 },
      { month: 'May', value: 9200 },
      { month: 'Jun', value: 11000 },
    ],
    metrics: {
      monthlyRevenue: '$11,000',
      growthRate: '15%',
      customers: '250+',
      marketSize: '$2.5M',
    },
  },
  faqs: [
    {
      question: 'How will the funding be used?',
      answer: 'The funding will be used to expand our sensor network, develop our mobile app, and scale operations to reach more farmers in the region.',
    },
    {
      question: 'What is the expected return on investment?',
      answer: 'We project a 20-25% annual return based on our current growth rate and market expansion plans.',
    },
    {
      question: 'What is the minimum investment amount?',
      answer: 'The minimum investment amount is $1,000 USD.',
    },
  ],
}

function EnterpriseDetails() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState('')

  const handleInvestment = () => {
    if (!investmentAmount || isNaN(investmentAmount)) {
      toast.error('Please enter a valid investment amount')
      return
    }

    // TODO: Implement actual investment logic
    toast.success('Investment request submitted successfully!')
    setShowInvestModal(false)
    setInvestmentAmount('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {mockEnterprise.name}
            </h1>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                {mockEnterprise.industry}
              </span>
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPinIcon className="h-5 w-5 mr-1" />
                {mockEnterprise.location}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowInvestModal(true)}
            className="btn-primary"
          >
            Invest Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="card">
            <div className="relative h-96">
              <img
                src={mockEnterprise.images[selectedImage]}
                alt={mockEnterprise.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              {mockEnterprise.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Business Description */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Business Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {mockEnterprise.description}
            </p>
          </div>

          {/* Financial Projections */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Financial Performance
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEnterprise.financials.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0284c7"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {Object.entries(mockEnterprise.financials.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {mockEnterprise.faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Funding Progress */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Funding Progress
            </h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Raised</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${mockEnterprise.currentFunding.toLocaleString()} / ${mockEnterprise.fundingGoal.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${(mockEnterprise.currentFunding / mockEnterprise.fundingGoal) * 100}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setShowInvestModal(true)}
              className="btn-primary w-full"
            >
              Invest Now
            </button>
          </div>

          {/* Owner Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About the Owner
            </h2>
            <div className="flex items-center mb-4">
              <img
                src={mockEnterprise.owner.image}
                alt={mockEnterprise.owner.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {mockEnterprise.owner.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {mockEnterprise.owner.experience}
                </p>
              </div>
            </div>
            {mockEnterprise.owner.verified && (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Business Owner
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Invest in {mockEnterprise.name}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Investment Amount (USD)
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="input-field"
                placeholder="Enter amount"
                min="1000"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleInvestment}
                className="btn-primary flex-1"
              >
                Confirm Investment
              </button>
              <button
                onClick={() => setShowInvestModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default EnterpriseDetails