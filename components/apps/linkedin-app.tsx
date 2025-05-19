"use client"

import { ExternalLink } from "lucide-react"

export default function LinkedinApp() {
  // LinkedIn profile URL
  const linkedinProfileUrl = "https://www.linkedin.com/in/evnsmith/"

  const handleOpenLinkedIn = () => {
    window.open(linkedinProfileUrl, "_blank")
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* LinkedIn header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="text-xl font-bold text-blue-700">LinkedIn</div>
        <button 
          onClick={handleOpenLinkedIn}
          className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md"
        >
          <span>View on LinkedIn</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Profile section */}
      <div className="bg-white border-b">
        {/* Cover photo */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700"></div>

        {/* Profile info */}
        <div className="relative px-6 pb-6">
          <div className="absolute w-24 h-24 overflow-hidden bg-white border-4 border-white rounded-full -top-12">
            <div className="flex items-center justify-center w-full h-full text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              E
            </div>
          </div>

          <div className="pt-16">
            <h1 className="text-2xl font-bold">Evan Smith</h1>
            <p className="text-gray-600">Full-Stack Developer | React | Next.js | Node.js | AI Enthusiast</p>
            <p className="mt-1 text-sm text-gray-500">San Francisco Bay Area · 500+ connections</p>

            <div className="flex mt-4 space-x-3">
              <button 
                onClick={handleOpenLinkedIn}
                className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
              >
                View Profile
              </button>
              <button 
                onClick={handleOpenLinkedIn}
                className="px-4 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
              >
                Connect
              </button>
              <button className="px-4 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50">
                More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* About section */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-bold">About</h2>
            <p className="text-gray-700">
              Passionate full-stack developer with experience building web and mobile applications.
              Specialized in creating intuitive user experiences with React and Next.js, backed by robust Node.js APIs.
              Exploring AI integration in web applications.
            </p>
          </div>

          {/* Experience section */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-bold">Experience</h2>

            <div className="space-y-4">
              <div className="flex">
                <div className="w-12 h-12 mr-4 overflow-hidden bg-gray-100 rounded">
                  <div className="flex items-center justify-center w-full h-full text-xl font-bold text-gray-500">
                    G
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Data Scientist</h3>
                  <p className="text-gray-600">Georgia Tech Research Institute</p>
                  <p className="text-sm text-gray-500">2020 - Present</p>
                  <p className="mt-2 text-gray-700">
                    Research and development of machine learning algorithms and data analysis pipelines.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 mr-4 overflow-hidden bg-gray-100 rounded">
                  <div className="flex items-center justify-center w-full h-full text-xl font-bold text-gray-500">
                    G
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Graduate Research Assistant</h3>
                  <p className="text-gray-600">Georgia Tech</p>
                  <p className="text-sm text-gray-500">2019 - 2020</p>
                  <p className="mt-2 text-gray-700">
                    Machine learning research and development of data analysis techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Education section */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-bold">Education</h2>

            <div className="flex">
              <div className="w-12 h-12 mr-4 overflow-hidden bg-gray-100 rounded">
                <div className="flex items-center justify-center w-full h-full text-xl font-bold text-gray-500">G</div>
              </div>

              <div>
                <h3 className="font-semibold">Georgia Institute of Technology</h3>
                <p className="text-gray-600">Master of Science in Analytics</p>
                <p className="text-sm text-gray-500">2019 - 2020</p>
              </div>
            </div>
            
            <div className="flex mt-4">
              <div className="w-12 h-12 mr-4 overflow-hidden bg-gray-100 rounded">
                <div className="flex items-center justify-center w-full h-full text-xl font-bold text-gray-500">U</div>
              </div>

              <div>
                <h3 className="font-semibold">University of Georgia</h3>
                <p className="text-gray-600">Bachelor of Science in Mathematics</p>
                <p className="text-sm text-gray-500">2015 - 2019</p>
              </div>
            </div>
          </div>

          {/* Skills section */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-bold">Skills</h2>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">JavaScript</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">TypeScript</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">React.js</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Next.js</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Node.js</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Python</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Machine Learning</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Data Analysis</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">R</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">SQL</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">HTML/CSS</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Tailwind CSS</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Git</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Docker</span>
            </div>
          </div>
          
          {/* View on LinkedIn */}
          <div className="flex justify-center py-4">
            <button 
              onClick={handleOpenLinkedIn}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              View Full Profile on LinkedIn
              <ExternalLink className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
