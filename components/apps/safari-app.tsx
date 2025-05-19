"use client"

import { useState, useEffect } from "react"
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home, 
  Plus, 
  X, 
  Share2, 
  BookOpen, 
  ShieldCheck,
  Search
} from "lucide-react"
import { motion } from "framer-motion"
import { FlipWords } from "@/components/ui/flip-words"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useDarkMode } from "@/components/dark-mode-context"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

type BrowserTab = {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export default function SafariApp() {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: "tab1", title: "Portfolio", url: "localhost:3000/home" }
  ])
  const [activeTabId, setActiveTabId] = useState("tab1")
  const [currentPage, setCurrentPage] = useState("home")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<{past: string[], future: string[]}>({
    past: [],
    future: []
  })
  const [showBookmarks, setShowBookmarks] = useState(true)
  const { isDarkMode } = useDarkMode()

  const bookmarks = [
    { title: "Experience", url: "experience", icon: "🏢" },
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
          ? { ...tab, title: page.charAt(0).toUpperCase() + page.slice(1), url: `localhost:3000/${page}` }
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
            ? { ...tab, title: previousPage.charAt(0).toUpperCase() + previousPage.slice(1), url: `localhost:3000/${previousPage}` }
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
            ? { ...tab, title: nextPage.charAt(0).toUpperCase() + nextPage.slice(1), url: `localhost:3000/${nextPage}` }
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
      url: "localhost:3000/home"
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
      case "experience":
        return <ExperiencePage navigateTo={navigateTo} />
      default:
        return <HomePage navigateTo={navigateTo} />
    }
  }

  const activeTab = tabs.find(tab => tab.id === activeTabId)

  return (
    <div className={`flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Tab bar */}
      <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/90 border-b border-zinc-200 dark:border-zinc-700/80 px-2 py-1 space-x-1">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => activateTab(tab.id)}
            className={`flex items-center px-3 py-1.5 text-xs rounded-t-lg cursor-pointer max-w-[200px] transition-colors ${
              tab.id === activeTabId 
                ? "bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-t border-l border-r border-zinc-200 dark:border-zinc-700" 
                : "bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            <div className="flex-1 truncate">{tab.title}</div>
            <Button 
              onClick={(e) => closeTab(tab.id, e)} 
              variant="ghost" 
              size="icon" 
              className="ml-1 h-4 w-4 p-0 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
        <Button 
          onClick={addNewTab} 
          variant="ghost" 
          size="icon"
          className="p-1 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Browser toolbar */}
      <div className="flex items-center p-2 space-x-2 bg-zinc-100 dark:bg-zinc-700/80 border-b border-zinc-200 dark:border-zinc-700/80">
        <Button 
          onClick={goBack} 
          disabled={history.past.length === 0}
          variant="ghost"
          size="icon"
          className={`p-1 rounded-full ${history.past.length === 0 ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button 
          onClick={goForward} 
          disabled={history.future.length === 0}
          variant="ghost"
          size="icon"
          className={`p-1 rounded-full ${history.future.length === 0 ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button 
          onClick={() => setIsLoading(true)} 
          variant="ghost"
          size="icon"
          className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
        >
          <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
        <Button 
          onClick={() => navigateTo("home")} 
          variant="ghost"
          size="icon"
          className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
        >
          <Home className="w-4 h-4" />
        </Button>

        <div className="flex items-center flex-1 px-3 py-1 bg-zinc-200/50 dark:bg-zinc-600/50 border border-zinc-300/20 dark:border-zinc-700/50 rounded-full">
          {isLoading ? (
            <div className="w-4 h-4 mr-2 border-2 border-zinc-400 dark:border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <ShieldCheck className="w-4 h-4 mr-2 text-zinc-500 dark:text-zinc-400" />
          )}
          <div className="flex items-center">
            <Search className="w-3 h-3 mr-2 text-zinc-500 dark:text-zinc-400" />
            <span className="text-sm text-zinc-800 dark:text-zinc-200 truncate font-mono">{activeTab?.url}</span>
          </div>
        </div>

        <Button 
          variant="ghost"
          size="icon" 
          className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setShowBookmarks(!showBookmarks)}
          variant="ghost"
          size="icon"
          className={`p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 ${showBookmarks ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-500 dark:text-zinc-400'}`}
        >
          <BookOpen className="w-4 h-4" />
        </Button>
      </div>

      {/* Bookmarks bar */}
      {showBookmarks && (
        <div className="flex items-center px-4 py-1.5 space-x-6 bg-zinc-50 dark:bg-zinc-800/70 border-b border-zinc-200 dark:border-zinc-700/80 text-xs">
          {bookmarks.map((bookmark, index) => (
            <button 
              key={index}
              onClick={() => navigateTo(bookmark.url)}
              className={`flex items-center space-x-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors ${
                currentPage === bookmark.url ? 'text-zinc-800 dark:text-zinc-200 font-medium' : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <span>{bookmark.icon}</span>
              <span className="font-medium">{bookmark.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Browser content */}
      <div className="flex-1 overflow-auto relative">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-700">
            <div className="h-full bg-zinc-400 dark:bg-zinc-500 animate-pulse" style={{ width: '60%' }}></div>
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
    <div className="min-h-full p-8 bg-zinc-50 dark:bg-zinc-900">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header 
          className="mb-16 text-center"
          variants={itemVariants}
        >
          <h1 className="mb-4 text-4xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">Evan Sinclair Smith</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            <style jsx global>{`
              .rainbow-text {
                background: linear-gradient(
                  to right, 
                  #ff5e62, #ff9966, #fffc00, #00b712, #0082c8, #6a11cb, #fc00ff
                );
                background-size: 200% auto;
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                animation: rainbow-flow 4s linear infinite;
                text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
                font-weight: 700;
              }
              
              @keyframes rainbow-flow {
                0% { background-position: 0% center; }
                100% { background-position: 200% center; }
              }
            `}</style>
            <FlipWords 
              words={[
                "Software Engineer", 
                "ML Engineer", 
                "Researcher", 
                <span key="vibe-coder" className="rainbow-text">Viiiiiibe coder</span>
              ]} 
              className="text-zinc-800 dark:text-zinc-200 font-medium"
            />
          </p>
        </motion.header>

        <div className="space-y-12">
          <motion.section variants={itemVariants}>
            <div className="group relative">
              <div className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 top-2"></div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">Experience</h2>
                  <Badge variant="outline" className="font-mono text-xs font-normal py-0.5">2022—Present</Badge>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Learn about my professional journey, past roles, and career achievements at Emory University, 
                  The Task Force for Global Health, and various research projects.
                </p>
                
                <div className="mt-3 flex items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto flex items-center hover:text-zinc-900 dark:hover:text-zinc-100"
                      onClick={() => navigateTo("experience")}
                    >
                      View Experience
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.section variants={itemVariants}>
            <div className="group relative">
              <div className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 top-2"></div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">Projects</h2>
                  <Badge variant="outline" className="font-mono text-xs font-normal py-0.5">2022—2023</Badge>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Explore my portfolio of work across web development, AI applications, and 
                  data science projects. From e-commerce platforms to machine learning solutions.
                </p>
                
                <div className="mt-3 flex items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto flex items-center hover:text-zinc-900 dark:hover:text-zinc-100"
                      onClick={() => navigateTo("projects")}
                    >
                      View Projects
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.section variants={itemVariants}>
            <div className="group relative">
              <div className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 top-2"></div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">Skills</h2>
                  <Badge variant="outline" className="font-mono text-xs font-normal py-0.5">Technical</Badge>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Discover my technical expertise and professional capabilities across AI & Machine Learning, 
                  programming languages, frontend and backend technologies.
                </p>
                
                <div className="mt-3 flex items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto flex items-center hover:text-zinc-900 dark:hover:text-zinc-100"
                      onClick={() => navigateTo("skills")}
                    >
                      View Skills
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.section variants={itemVariants}>
            <div className="group relative">
              <div className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 top-2"></div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">Contact</h2>
                  <Badge variant="outline" className="font-mono text-xs font-normal py-0.5">Get in touch</Badge>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Reach out for collaborations, project inquiries, or just to say hello. 
                  Find my contact information and send a message directly.
                </p>
                
                <div className="mt-3 flex items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto flex items-center hover:text-zinc-900 dark:hover:text-zinc-100"
                      onClick={() => navigateTo("contact")}
                    >
                      Contact Me
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.footer 
          className="mt-16 pt-8 text-center text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800"
          variants={itemVariants}
        >
          <p>© 2025 Evan Smith. All rights reserved.</p>
        </motion.footer>
      </motion.div>
    </div>
  )
}

function ProjectsPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-zinc-50 dark:bg-zinc-900">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header className="mb-16" variants={itemVariants}>
          <motion.div 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => navigateTo("home")} 
              variant="ghost" 
              size="sm" 
              className="mb-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </Button>
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">Projects</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm">A selection of my recent work across different domains</p>
        </motion.header>

        <motion.div className="space-y-14" variants={containerVariants}>
          <motion.div className="group relative" variants={itemVariants}>
            <div className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 top-2"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">E-Commerce Platform</h2>
                <Badge variant="outline" className="font-mono text-xs font-normal py-0.5">2023</Badge>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                <Badge variant="outline" className="text-xs font-normal">React</Badge>
                <Badge variant="outline" className="text-xs font-normal">Node.js</Badge>
                <Badge variant="outline" className="text-xs font-normal">MongoDB</Badge>
              </div>
              
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A full-featured e-commerce platform with product management, cart functionality, payment processing, and
                order tracking. Designed with a focus on user experience and performance optimization.
              </p>
              
              <div className="mt-5 flex items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="ghost" size="sm" className="p-0 h-auto flex items-center hover:text-zinc-900 dark:hover:text-zinc-100">
                    View Project
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.div className="group relative" variants={itemVariants}>
            <div className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 top-2"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">AI Content Generator</h2>
                <Badge variant="outline" className="font-mono text-xs font-normal py-0.5">2023</Badge>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                <Badge variant="outline" className="text-xs font-normal">Python</Badge>
                <Badge variant="outline" className="text-xs font-normal">TensorFlow</Badge>
                <Badge variant="outline" className="text-xs font-normal">FastAPI</Badge>
              </div>
              
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                An AI-powered application that generates high-quality content based on user prompts, utilizing transformer
                models for natural language generation. Features include customization options, tone adjustment, and export 
                functionality.
              </p>
              
              <div className="mt-5 flex items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="ghost" size="sm" className="p-0 h-auto flex items-center hover:text-zinc-900 dark:hover:text-zinc-100">
                    View Project
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.div className="group relative" variants={itemVariants}>
            <div className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 top-2"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">Fitness Tracking App</h2>
                <Badge variant="outline" className="font-mono text-xs font-normal py-0.5">2022</Badge>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                <Badge variant="outline" className="text-xs font-normal">React Native</Badge>
                <Badge variant="outline" className="text-xs font-normal">Firebase</Badge>
                <Badge variant="outline" className="text-xs font-normal">GraphQL</Badge>
              </div>
              
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A mobile application for tracking workouts, nutrition, and progress with personalized recommendations and
                social features. Includes real-time synchronization, offline functionality, and integration with health devices.
              </p>
              
              <div className="mt-5 flex items-center text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="ghost" size="sm" className="p-0 h-auto flex items-center hover:text-zinc-900 dark:hover:text-zinc-100">
                    View Project
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function SkillsPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-zinc-50 dark:bg-zinc-900">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header className="mb-16" variants={itemVariants}>
          <motion.div 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => navigateTo("home")} 
              variant="ghost" 
              size="sm" 
              className="mb-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </Button>
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">Skills</h1>
        </motion.header>

        <motion.div className="space-y-12" variants={containerVariants}>
          <motion.section variants={itemVariants}>
            <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-100 mb-6 flex items-center">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mr-2 text-sm">🧠</span>
              AI & Machine Learning
            </h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                "NumPy", 
                "Pandas", 
                "Scikit-learn", 
                "PyTorch", 
                "Hugging Face Transformers", 
                "LangChain", 
                "Unsloth", 
                "AWS SageMaker", 
                "Deep Learning", 
                "Machine Learning", 
                "Reinforcement Learning", 
                "Natural Language Processing"
              ].map((skill, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2.5 flex-shrink-0"></div>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.section variants={itemVariants}>
            <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-100 mb-6 flex items-center">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mr-2 text-sm">📝</span>
              Programming Languages
            </h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {["JavaScript", "TypeScript", "Python", "SQL"].map((skill, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2.5 flex-shrink-0"></div>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.section>
            <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-100 mb-6 flex items-center">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mr-2 text-sm">🖥️</span>
              Frontend & Backend
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wider">Frontend</h3>
                <div className="space-y-3">
                  {["React", "Vue", "HTML/CSS"].map((skill, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2.5 flex-shrink-0"></div>
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wider">Backend</h3>
                <div className="space-y-3">
                  {["Node.js", "Django", "Flask", "FastAPI"].map((skill, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2.5 flex-shrink-0"></div>
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-100 mb-6 flex items-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mr-2 text-sm">🗄️</span>
                Databases
              </h2>
              <div className="space-y-3">
                {["PostgreSQL", "MySQL", "MongoDB"].map((skill, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2.5 flex-shrink-0"></div>
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-100 mb-6 flex items-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mr-2 text-sm">🚀</span>
                DevOps & Tools
              </h2>
              <div className="space-y-3">
                {[
                  "AWS", 
                  "Vercel", 
                  "Docker", 
                  "npm/pnpm/yarn", 
                  "Pip", 
                  "Git", 
                  "GitHub Actions"
                ].map((skill, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mr-2.5 flex-shrink-0"></div>
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <motion.section>
            <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-100 mb-6 flex items-center">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mr-2 text-sm">📚</span>
              Currently Exploring
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Robotics", "AR/VR Development", "Leaving the house"].map((item, i) => (
                <Badge key={i} variant="outline" className="text-sm font-normal py-1 px-3 border-zinc-200 dark:border-zinc-700">
                  {item}
                </Badge>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  )
}

function ContactPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-zinc-50 dark:bg-zinc-900">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header className="mb-16" variants={itemVariants}>
          <motion.div 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => navigateTo("home")} 
              variant="ghost" 
              size="sm" 
              className="mb-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </Button>
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">Contact</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm">Get in touch for collaborations, opportunities, or just to say hello</p>
        </motion.header>

        <motion.div className="space-y-12" variants={containerVariants}>
          <motion.div 
            className="grid gap-8 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-all"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-6">Contact Information</h2>
              <motion.ul 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 mr-3 text-zinc-800 dark:text-zinc-200">📧</div>
                  <span>evan@example.com</span>
                </motion.li>
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 mr-3 text-zinc-800 dark:text-zinc-200">📱</div>
                  <span>+1 (404) 555-0123</span>
                </motion.li>
                <motion.li 
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 mr-3 text-zinc-800 dark:text-zinc-200">📍</div>
                  <span>Atlanta, GA</span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div 
              className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-all"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-6">Social Media</h2>
              <motion.ul 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 mr-3 text-zinc-800 dark:text-zinc-200">🔗</div>
                  <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                    LinkedIn
                  </a>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 mr-3 text-zinc-800 dark:text-zinc-200">🐙</div>
                  <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                    GitHub
                  </a>
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 mr-3 text-zinc-800 dark:text-zinc-200">🐦</div>
                  <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                    Twitter
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>

          <Separator className="bg-zinc-200 dark:bg-zinc-800" />

          <div>
            <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mb-6">Send Me a Message</h2>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                ></textarea>
              </div>
              <Button
                type="submit"
                className="px-4 py-2"
              >
                Send Message
              </Button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function ExperiencePage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-zinc-50 dark:bg-zinc-900">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header className="mb-16" variants={itemVariants}>
          <motion.div 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={() => navigateTo("home")} 
              variant="ghost" 
              size="sm" 
              className="mb-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 p-0 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </Button>
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">Experience</h1>
        </motion.header>

        <motion.div 
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Research Data Analyst */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="flex items-center mb-4">
              <motion.div 
                className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
                whileHover={{ scale: 1.5 }}
              ></motion.div>
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">Research Data Analyst</h2>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">2023—Present</div>
              </div>
            </div>
            
            <motion.div 
              className="ml-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-3">Nell Hodgson Woodruff School of Nursing at Emory University</h3>
              <motion.ul 
                className="space-y-3 text-zinc-600 dark:text-zinc-400 text-sm list-none ml-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Implemented AI algorithms to de-identify patient records, enhancing data privacy and usability.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Created and maintained a data dictionary and metadata to ensure data accuracy and standards.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Contributed to a repository of over 1 billion patient records, accelerating nursing education and research.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Developed fullstack solutions for 3 website projects, improving research data access and visualization.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Collaborated with over 40 DnP students and researchers on various research projects.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Finetuned LLM models for specialized medical text analysis and research applications.</span>
                </motion.li>
              </motion.ul>
              <motion.div 
                className="mt-4 flex flex-wrap gap-1.5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">Deep Learning</Badge>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">Data Science</Badge>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">LLM Finetuning</Badge>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">Fullstack</Badge>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Research Internship - Task Force */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="flex items-center mb-4">
              <motion.div 
                className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
                whileHover={{ scale: 1.5 }}
              ></motion.div>
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">Research Internship</h2>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">2022—2023</div>
              </div>
            </div>
            
            <motion.div 
              className="ml-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-3">The Task Force for Global Health, Inc.</h3>
              <motion.ul 
                className="space-y-3 text-zinc-600 dark:text-zinc-400 text-sm list-none ml-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Developed an R Training Manual for international partners transitioning from Excel to R/RStudio, focusing on data wrangling, statistical analysis, and visualization.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Conducted a multi-day R workshop, enhancing analytics capabilities across partner organizations.</span>
                </motion.li>
              </motion.ul>
              <motion.div 
                className="mt-4 flex flex-wrap gap-1.5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">Data Science</Badge>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">Python</Badge>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">R</Badge>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Research Internship - Emory */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="flex items-center mb-4">
              <motion.div 
                className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
                whileHover={{ scale: 1.5 }}
              ></motion.div>
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-200">Research Internship</h2>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">2022—2023</div>
              </div>
            </div>
            
            <motion.div 
              className="ml-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-3">Emory University</h3>
              <motion.ul 
                className="space-y-3 text-zinc-600 dark:text-zinc-400 text-sm list-none ml-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Managed REDCap databases and built surveys/consent forms for Down syndrome research at Emory University.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Cleaned multiple large-scale family survey datasets to enable deeper analysis of comorbidities like celiac disease and sleep apnea.</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 mr-2 flex-shrink-0"></span>
                  <span>Generated robust visualizations to enhance data interpretation and presentation.</span>
                </motion.li>
              </motion.ul>
              <motion.div 
                className="mt-4 flex flex-wrap gap-1.5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">REDCap</Badge>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">Data Cleaning</Badge>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                  <Badge variant="outline" className="text-xs font-normal">Visualization</Badge>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <Separator className="my-14 bg-zinc-200 dark:bg-zinc-800" />

        <div className="mb-16">
          <h2 className="text-xl font-medium text-zinc-800 dark:text-zinc-100 mb-8">Education</h2>
          
          <div className="space-y-10">
            <motion.div className="relative" variants={itemVariants}>
              <div className="flex items-center mb-4">
                <motion.div 
                  className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
                  whileHover={{ scale: 1.5 }}
                ></motion.div>
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                  <div>
                    <h3 className="text-base font-medium text-zinc-800 dark:text-zinc-200">Georgia Institute of Technology</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Master&apos;s degree, Computer Science</p>
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">2024—Present</div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Specialization in Machine Learning</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                    <Badge variant="outline" className="text-xs font-normal">Algorithms</Badge>
                  </motion.div>
                  <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                    <Badge variant="outline" className="text-xs font-normal">Data Science</Badge>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="relative" variants={itemVariants}>
              <div className="flex items-center mb-4">
                <motion.div 
                  className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
                  whileHover={{ scale: 1.5 }}
                ></motion.div>
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                  <div>
                    <h3 className="text-base font-medium text-zinc-800 dark:text-zinc-200">Georgia State University</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">J. Mack Robinson College of Business</p>
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">2019—2023</div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Computer Information Systems, Management Information Systems</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
