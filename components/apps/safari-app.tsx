"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Search } from "lucide-react"

export default function SafariApp() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />
      case "projects":
        return <ProjectsPage setCurrentPage={setCurrentPage} />
      case "skills":
        return <SkillsPage setCurrentPage={setCurrentPage} />
      case "contact":
        return <ContactPage setCurrentPage={setCurrentPage} />
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Browser toolbar */}
      <div className="flex items-center p-2 space-x-2 bg-gray-100 border-b">
        <button className="p-1 rounded hover:bg-gray-200">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button onClick={() => setCurrentPage("home")} className="p-1 rounded hover:bg-gray-200">
          <Home className="w-4 h-4" />
        </button>

        <div className="flex items-center flex-1 px-3 py-1 bg-white border rounded-md">
          <Search className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm text-gray-500 truncate">portfolio.example.com/{currentPage}</span>
        </div>
      </div>

      {/* Browser content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  )
}

function HomePage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to My Portfolio</h1>
          <p className="text-xl text-gray-600">Full-Stack Developer & AI Enthusiast</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div
            onClick={() => setCurrentPage("projects")}
            className="p-6 transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
          >
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Projects</h2>
            <p className="text-gray-600">
              Explore my latest work across web development, mobile apps, and AI projects.
            </p>
          </div>

          <div
            onClick={() => setCurrentPage("skills")}
            className="p-6 transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
          >
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Skills</h2>
            <p className="text-gray-600">Discover my technical expertise and professional capabilities.</p>
          </div>

          <div className="p-6 transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Experience</h2>
            <p className="text-gray-600">Learn about my professional journey and work experience.</p>
          </div>

          <div
            onClick={() => setCurrentPage("contact")}
            className="p-6 transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
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

function ProjectsPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <button onClick={() => setCurrentPage("home")} className="mb-4 text-blue-500 hover:underline">
            ← Back to Home
          </button>
          <h1 className="mb-4 text-3xl font-bold text-gray-800">My Projects</h1>
          <p className="text-gray-600">Here's a selection of my recent work across different domains.</p>
        </header>

        <div className="grid gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">E-Commerce Platform</h2>
            <p className="mb-4 text-sm text-gray-500">React, Node.js, MongoDB</p>
            <p className="text-gray-600">
              A full-featured e-commerce platform with product management, cart functionality, payment processing, and
              order tracking.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">AI Content Generator</h2>
            <p className="mb-4 text-sm text-gray-500">Python, TensorFlow, FastAPI</p>
            <p className="text-gray-600">
              An AI-powered application that generates high-quality content based on user prompts, utilizing transformer
              models for natural language generation.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
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

function SkillsPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <button onClick={() => setCurrentPage("home")} className="mb-4 text-blue-500 hover:underline">
            ← Back to Home
          </button>
          <h1 className="mb-4 text-3xl font-bold text-gray-800">My Skills</h1>
          <p className="text-gray-600">An overview of my technical expertise and professional capabilities.</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
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

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
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

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
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

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
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

function ContactPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="min-h-full p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <button onClick={() => setCurrentPage("home")} className="mb-4 text-blue-500 hover:underline">
            ← Back to Home
          </button>
          <h1 className="mb-4 text-3xl font-bold text-gray-800">Contact Me</h1>
          <p className="text-gray-600">Get in touch for collaborations, opportunities, or just to say hello!</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
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

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
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

          <div className="p-6 md:col-span-2 bg-gray-50 rounded-lg shadow-md">
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
