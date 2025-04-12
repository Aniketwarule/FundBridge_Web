import { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'


function Navbar({ isDarkMode, toggleDarkMode }) {
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userId, setUserId] = useState('')
 
  // Check if user is signed in by looking at localStorage or path
  useEffect(() => {
    const user = localStorage.getItem('user')
    let userObj = null
    
    if (user) {
      try {
        userObj = JSON.parse(user)
        setUserId(userObj.id || '')
      } catch (e) {
        console.error("Error parsing user from localStorage", e)
      }
    }
    
    // Extract ID from URL if present in dashboard path
    const dashboardMatch = location.pathname.match(/\/dashboard\/([^/]+)/)
    if (dashboardMatch && dashboardMatch[1]) {
      setUserId(dashboardMatch[1])
    }
    
    const pathSignedIn = location.pathname.includes('/dashboard/')
    setIsSignedIn(!!userObj || pathSignedIn)
  }, [location.pathname])

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <motion.span
                className="text-xl font-bold text-primary-600 dark:text-primary-400"
                whileHover={{ scale: 1.05 }}
              >
                FundBridge
              </motion.span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              to={userId ? `/browse/${userId}` : "/browse"} 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Browse
            </Link>
            <Link 
              to={userId ? `/dashboard/${userId}` : "/dashboard"} 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Dashboard
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-gray-300" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            {!isSignedIn && (
              <Link
                to="/login"
                className="btn-primary"
              >
                Sign In
              </Link>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to={userId ? `/browse/${userId}` : "/browse"}
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Browse
            </Link>
            <Link
              to={userId ? `/dashboard/${userId}` : "/dashboard"}
              className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Dashboard
            </Link>
            {!isSignedIn && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-primary-600 dark:text-primary-400 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar