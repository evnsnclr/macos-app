export default function LinkedinApp() {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* LinkedIn header */}
      <div className="flex items-center p-4 bg-white border-b">
        <div className="text-xl font-bold text-blue-700">LinkedIn</div>
      </div>

      {/* Profile section */}
      <div className="bg-white border-b">
        {/* Cover photo */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700"></div>

        {/* Profile info */}
        <div className="relative px-6 pb-6">
          <div className="absolute w-24 h-24 overflow-hidden bg-white border-4 border-white rounded-full -top-12">
            <div className="flex items-center justify-center w-full h-full text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              P
            </div>
          </div>

          <div className="pt-16">
            <h1 className="text-2xl font-bold">Portfolio User</h1>
            <p className="text-gray-600">Full-Stack Developer | React | Next.js | Node.js | AI Enthusiast</p>
            <p className="mt-1 text-sm text-gray-500">San Francisco, California · 500+ connections</p>

            <div className="flex mt-4 space-x-3">
              <button className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700">
                Connect
              </button>
              <button className="px-4 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50">
                Message
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
              Passionate full-stack developer with 5+ years of experience building web and mobile applications.
              Specialized in creating intuitive user experiences with React and Next.js, backed by robust Node.js APIs.
              Recently exploring AI integration in web applications.
            </p>
          </div>

          {/* Experience section */}
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-bold">Experience</h2>

            <div className="space-y-4">
              <div className="flex">
                <div className="w-12 h-12 mr-4 overflow-hidden bg-gray-100 rounded">
                  <div className="flex items-center justify-center w-full h-full text-xl font-bold text-gray-500">
                    T
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Senior Frontend Developer</h3>
                  <p className="text-gray-600">Tech Innovations Inc.</p>
                  <p className="text-sm text-gray-500">Jan 2022 - Present · 3 years 5 months</p>
                  <p className="mt-2 text-gray-700">
                    Leading the frontend development team in building responsive and accessible web applications.
                    Implemented modern React patterns and optimized performance across multiple projects.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 mr-4 overflow-hidden bg-gray-100 rounded">
                  <div className="flex items-center justify-center w-full h-full text-xl font-bold text-gray-500">
                    D
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Full-Stack Developer</h3>
                  <p className="text-gray-600">Digital Solutions LLC</p>
                  <p className="text-sm text-gray-500">Mar 2019 - Dec 2021 · 2 years 10 months</p>
                  <p className="mt-2 text-gray-700">
                    Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with
                    design and product teams to deliver high-quality user experiences.
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
                <div className="flex items-center justify-center w-full h-full text-xl font-bold text-gray-500">U</div>
              </div>

              <div>
                <h3 className="font-semibold">University of Technology</h3>
                <p className="text-gray-600">Bachelor of Science in Computer Science</p>
                <p className="text-sm text-gray-500">2015 - 2019</p>
                <p className="mt-2 text-gray-700">
                  Graduated with honors. Specialized in software engineering and artificial intelligence.
                </p>
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
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Express</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">MongoDB</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">PostgreSQL</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">GraphQL</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">REST APIs</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">HTML/CSS</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Tailwind CSS</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Git</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">CI/CD</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Docker</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">AWS</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">Python</span>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">TensorFlow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
