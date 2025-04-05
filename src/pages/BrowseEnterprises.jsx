import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const mockEnterprises = [
  {
    id: 1,
    name: 'TechFarm Solutions',
    description: 'Smart farming technology for small-scale farmers',
    industry: 'AgriTech',
    location: 'Kenya',
    fundingGoal: 25000,
    currentFunding: 15000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'EcoGrow',
    description: 'Sustainable agriculture practices and organic farming',
    industry: 'AgriTech',
    location: 'Rwanda',
    fundingGoal: 15000,
    currentFunding: 12000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'HealthConnect',
    description: 'Mobile healthcare solutions for rural communities',
    industry: 'HealthTech',
    location: 'Uganda',
    fundingGoal: 30000,
    currentFunding: 18000,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  },
]

const industries = ['All', 'AgriTech', 'EdTech', 'FinTech', 'HealthTech', 'Retail']
const locations = ['All', 'Kenya', 'Rwanda', 'Uganda', 'Tanzania']
const sortOptions = ['Most Recent', 'Most Funded', 'Highest Rated']

function BrowseEnterprises() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedSort, setSelectedSort] = useState('Most Recent')
  const [showFilters, setShowFilters] = useState(false)

  const filteredEnterprises = mockEnterprises.filter((enterprise) => {
    const matchesSearch = enterprise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enterprise.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === 'All' || enterprise.industry === selectedIndustry
    const matchesLocation = selectedLocation === 'All' || enterprise.location === selectedLocation
    return matchesSearch && matchesIndustry && matchesLocation
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Browse Enterprises
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and invest in promising micro-entrepreneurs
          </p>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 md:mt-0 btn-secondary flex items-center"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search enterprises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="input-field"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="input-field"
            >
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="input-field"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </motion.div>
        )}
      </div>

      {/* Enterprise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEnterprises.map((enterprise) => (
          <motion.div
            key={enterprise.id}
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={enterprise.image}
              alt={enterprise.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {enterprise.industry}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {enterprise.location}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {enterprise.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {enterprise.description}
              </p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Funding Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${enterprise.currentFunding.toLocaleString()} / ${enterprise.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(enterprise.currentFunding / enterprise.fundingGoal) * 100}%` }}
                  />
                </div>
              </div>

              <Link
                to={`/enterprise/${enterprise.id}`}
                className="btn-primary block text-center"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default BrowseEnterprises