"use client"

import { useState, useEffect } from "react"
import { 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  Home, 
  Plus, 
  X, 
  Share, 
  BookOpen, 
  Lock
} from "lucide-react"

type BrowserTab = {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export default function SafariApp() {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: "tab1", title: "Portfolio", url: "portfolio.example.com/home" }
  ])
  const [activeTabId, setActiveTabId] = useState("tab1")
  const [currentPage, setCurrentPage] = useState("home")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<{past: string[], future: string[]}>({
    past: [],
    future: []
  })
  const [showBookmarks, setShowBookmarks] = useState(true)

  const bookmarks = [
    { title: "Home", url: "home", icon: "🏠" },
    { title: "Projects", url: "projects", icon: "💼" },
    { title: "Skills", url: "skills", icon: "🛠️" },
    { title: "Contact", url: "contact", icon: "📨" },
  ]

  // Reset loading state after navigation
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const updateHistory = (newPage: string) => {
    if (currentPage !== newPage) {
      setHistory(prev => ({
        past: [...prev.past, currentPage],
        future: []
      }))
    }
  }

  const navigateTo = (page: string) => {
    setIsLoading(true)
    updateHistory(page)
    
    // Update current page and tab info
    setCurrentPage(page)
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, title: page.charAt(0).toUpperCase() + page.slice(1), url: `portfolio.example.com/${page}` }
          : tab
      )
    )
  }

  const goBack = () => {
    if (history.past.length > 0) {
      const previousPage = history.past[history.past.length - 1]
      const newPast = history.past.slice(0, -1)
      
      setIsLoading(true)
      setCurrentPage(previousPage)
      
      setTabs(prevTabs => 
        prevTabs.map(tab => 
          tab.id === activeTabId 
            ? { ...tab, title: previousPage.charAt(0).toUpperCase() + previousPage.slice(1), url: `portfolio.example.com/${previousPage}` }
            : tab
        )
      )
      
      setHistory({
        past: newPast,
        future: [currentPage, ...history.future]
      })
    }
  }

  const goForward = () => {
    if (history.future.length > 0) {
      const nextPage = history.future[0]
      const newFuture = history.future.slice(1)
      
      setIsLoading(true)
      setCurrentPage(nextPage)
      
      setTabs(prevTabs => 
        prevTabs.map(tab => 
          tab.id === activeTabId 
            ? { ...tab, title: nextPage.charAt(0).toUpperCase() + nextPage.slice(1), url: `portfolio.example.com/${nextPage}` }
            : tab
        )
      )
      
      setHistory({
        past: [...history.past, currentPage],
        future: newFuture
      })
    }
  }

  const addNewTab = () => {
    const newTabId = `tab${Date.now()}`
    setTabs([...tabs, { 
      id: newTabId, 
      title: "New Tab", 
      url: "portfolio.example.com/home"
    }])
    setActiveTabId(newTabId)
    setCurrentPage("home")
    setHistory({ past: [], future: [] })
  }

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (tabs.length > 1) {
      const tabIndex = tabs.findIndex(tab => tab.id === tabId)
      const newTabs = tabs.filter(tab => tab.id !== tabId)
      
      setTabs(newTabs)
      
      // If closing the active tab, activate another tab
      if (tabId === activeTabId) {
        const newActiveIndex = tabIndex === 0 ? 0 : tabIndex - 1
        setActiveTabId(newTabs[newActiveIndex].id)
        setCurrentPage(newTabs[newActiveIndex].url.split('/').pop() || "home")
        setHistory({ past: [], future: [] })
      }
    }
  }

  const activateTab = (tabId: string) => {
    const tab = tabs.find(tab => tab.id === tabId)
    if (tab) {
      setActiveTabId(tabId)
      const page = tab.url.split('/').pop() || "home"
      setCurrentPage(page)
      setHistory({ past: [], future: [] })
    }
  }

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigateTo={navigateTo} />
      case "projects":
        return <ProjectsPage navigateTo={navigateTo} />
      case "skills":
        return <SkillsPage navigateTo={navigateTo} />
      case "contact":
        return <ContactPage navigateTo={navigateTo} />
      default:
        return <HomePage navigateTo={navigateTo} />
    }
  }

  const activeTab = tabs.find(tab => tab.id === activeTabId)

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center bg-gray-100 border-b px-2 py-1 space-x-1">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => activateTab(tab.id)}
            className={`flex items-center px-3 py-1 text-xs rounded-t-lg cursor-pointer max-w-[200px] ${
              tab.id === activeTabId 
                ? "bg-white text-gray-800 border-t border-l border-r border-gray-300" 
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            <div className="flex-1 truncate">{tab.title}</div>
            <button 
              onClick={(e) => closeTab(tab.id, e)} 
              className="ml-2 p-0.5 rounded-full hover:bg-gray-200"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button 
          onClick={addNewTab} 
          className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Browser toolbar */}
      <div className="flex items-center p-2 space-x-2 bg-gray-100 border-b">
        <button 
          onClick={goBack} 
          disabled={history.past.length === 0}
          className={`p-1 rounded-md ${history.past.length === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={goForward} 
          disabled={history.future.length === 0}
          className={`p-1 rounded-md ${history.future.length === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setIsLoading(true)} 
          className="p-1 rounded-md hover:bg-gray-200 text-gray-700"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <button 
          onClick={() => navigateTo("home")} 
          className="p-1 rounded-md hover:bg-gray-200 text-gray-700"
        >
          <Home className="w-4 h-4" />
        </button>

        <div className="flex items-center flex-1 px-3 py-1 bg-white border rounded-md">
          {isLoading ? (
            <div className="w-4 h-4 mr-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Lock className="w-4 h-4 mr-2 text-green-600" />
          )}
          <div className="flex items-center">
            <span className="text-xs font-medium text-green-700 mr-2">Secure</span>
            <span className="text-sm text-gray-800 truncate">{activeTab?.url}</span>
          </div>
        </div>

        <button className="p-1 rounded-md hover:bg-gray-200 text-gray-700">
          <Share className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setShowBookmarks(!showBookmarks)}
          className={`p-1 rounded-md hover:bg-gray-200 ${showBookmarks ? 'text-blue-500' : 'text-gray-700'}`}
        >
          <BookOpen className="w-4 h-4" />
        </button>
      </div>

      {/* Bookmarks bar */}
      {showBookmarks && (
        <div className="flex items-center px-4 py-1 space-x-6 bg-gray-50 border-b text-xs">
          {bookmarks.map((bookmark, index) => (
            <button 
              key={index}
              onClick={() => navigateTo(bookmark.url)}
              className={`flex items-center space-x-1 hover:text-blue-600 ${
                currentPage === bookmark.url ? 'text-blue-500 font-medium' : 'text-gray-700'
              }`}
            >
              <span>{bookmark.icon}</span>
              <span>{bookmark.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Browser content */}
      <div className="flex-1 overflow-auto relative">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-100">
            <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }}></div>
          </div>
        )}
        <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function HomePage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to My Portfolio</h1>
          <p className="text-xl text-gray-600">Full-Stack Developer & AI Enthusiast</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div
            onClick={() => navigateTo("projects")}
            className="p-6 transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:translate-y-[-2px]"
          >
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Projects</h2>
            <p className="text-gray-600">
              Explore my latest work across web development, mobile apps, and AI projects.
            </p>
          </div>

          <div
            onClick={() => navigateTo("skills")}
            className="p-6 transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:translate-y-[-2px]"
          >
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Skills</h2>
            <p className="text-gray-600">Discover my technical expertise and professional capabilities.</p>
          </div>

          <div className="p-6 transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:translate-y-[-2px]">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Experience</h2>
            <p className="text-gray-600">Learn about my professional journey and work experience.</p>
          </div>

          <div
            onClick={() => navigateTo("contact")}
            className="p-6 transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:translate-y-[-2px]"
          >
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Contact</h2>
            <p className="text-gray-600">Get in touch with me for collaborations or opportunities.</p>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500">
          <p>© 2025 Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

function ProjectsPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <button onClick={() => navigateTo("home")} className="mb-4 text-blue-500 hover:underline">
            ← Back to Home
          </button>
          <h1 className="mb-4 text-3xl font-bold text-gray-800">My Projects</h1>
          <p className="text-gray-600">Here&apos;s a selection of my recent work across different domains.</p>
        </header>

        <div className="grid gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">E-Commerce Platform</h2>
            <p className="mb-4 text-sm text-gray-500">React, Node.js, MongoDB</p>
            <p className="text-gray-600">
              A full-featured e-commerce platform with product management, cart functionality, payment processing, and
              order tracking.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">AI Content Generator</h2>
            <p className="mb-4 text-sm text-gray-500">Python, TensorFlow, FastAPI</p>
            <p className="text-gray-600">
              An AI-powered application that generates high-quality content based on user prompts, utilizing transformer
              models for natural language generation.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">Fitness Tracking App</h2>
            <p className="mb-4 text-sm text-gray-500">React Native, Firebase</p>
            <p className="text-gray-600">
              A mobile application for tracking workouts, nutrition, and progress with personalized recommendations and
              social features.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillsPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <button onClick={() => navigateTo("home")} className="mb-4 text-blue-500 hover:underline">
            ← Back to Home
          </button>
          <h1 className="mb-4 text-3xl font-bold text-gray-800">My Skills</h1>
          <p className="text-gray-600">An overview of my technical expertise and professional capabilities.</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Frontend Development</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• React.js & Next.js</li>
              <li>• Vue.js</li>
              <li>• HTML5, CSS3, JavaScript (ES6+)</li>
              <li>• Tailwind CSS, SASS</li>
              <li>• Responsive Design</li>
              <li>• Framer Motion</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Backend Development</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Node.js & Express</li>
              <li>• Python & Django/FastAPI</li>
              <li>• RESTful API Design</li>
              <li>• GraphQL</li>
              <li>• Database Design</li>
              <li>• Authentication & Authorization</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Mobile Development</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• React Native</li>
              <li>• Flutter</li>
              <li>• iOS & Android Development</li>
              <li>• Mobile UI/UX Design</li>
              <li>• Push Notifications</li>
              <li>• Offline Functionality</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">AI & Machine Learning</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• TensorFlow & PyTorch</li>
              <li>• Natural Language Processing</li>
              <li>• Computer Vision</li>
              <li>• Hugging Face Transformers</li>
              <li>• Model Deployment</li>
              <li>• Data Analysis & Visualization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <button onClick={() => navigateTo("home")} className="mb-4 text-blue-500 hover:underline">
            ← Back to Home
          </button>
          <h1 className="mb-4 text-3xl font-bold text-gray-800">Contact Me</h1>
          <p className="text-gray-600">Get in touch for collaborations, opportunities, or just to say hello!</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Contact Information</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <span>email@example.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Social Media</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">🔗</span>
                <a href="#" className="text-blue-500 hover:underline">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🐙</span>
                <a href="#" className="text-blue-500 hover:underline">
                  GitHub
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🐦</span>
                <a href="#" className="text-blue-500 hover:underline">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div className="p-6 md:col-span-2 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Send Me a Message</h2>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block mb-1 text-sm text-gray-600">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 text-sm text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
