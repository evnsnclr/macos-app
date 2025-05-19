"use client"

import { useState } from "react"
import { Star, GitFork, Eye, Code, ExternalLink } from "lucide-react"

export default function GithubApp() {
  const [activeTab, setActiveTab] = useState("repositories")
  
  // GitHub profile URL
  const githubProfileUrl = "https://github.com/evnsnclr"

  const handleViewOnGithub = () => {
    window.open(githubProfileUrl, "_blank")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "repositories":
        return <RepositoriesTab githubProfileUrl={githubProfileUrl} />
      case "contributions":
        return <ContributionsTab />
      default:
        return <RepositoriesTab githubProfileUrl={githubProfileUrl} />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* GitHub header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
        <div className="flex items-center">
          <Code className="w-6 h-6 mr-2" />
          <span className="text-lg font-semibold">GitHub</span>
        </div>
        <button 
          onClick={handleViewOnGithub}
          className="flex items-center px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Profile section */}
      <div className="p-6 bg-gray-100 border-b">
        <div className="flex items-start">
          <div className="w-24 h-24 mr-6 overflow-hidden bg-gray-300 rounded-full">
            <div className="flex items-center justify-center w-full h-full text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              E
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Evan Sinclair</h1>
            <p className="text-gray-600">@evnsnclr</p>
            <p className="mt-2 text-gray-700">
              Full-stack developer passionate about creating intuitive and engaging user experiences.
            </p>

            <div className="flex mt-4 space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Eye className="w-4 h-4 mr-1" />
                <span>4 followers</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Eye className="w-4 h-4 mr-1" />
                <span>5 following</span>
              </div>
              <button 
                onClick={handleViewOnGithub}
                className="flex items-center text-sm text-blue-600 hover:underline"
              >
                Visit profile <ExternalLink className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("repositories")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "repositories"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Repositories
        </button>
        <button
          onClick={() => setActiveTab("contributions")}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === "contributions"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Contributions
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">{renderContent()}</div>
    </div>
  )
}

function RepositoriesTab({ githubProfileUrl }: { githubProfileUrl: string }) {
  const repositories = [
    {
      name: "GPT-Data-Analyzer",
      description: "Tool for analyzing and visualizing data with GPT",
      language: "Python",
      languageColor: "#3572A5",
      stars: 24,
      forks: 5,
      updatedAt: "Updated 2 days ago",
    },
    {
      name: "OpenAI_Agent_Swarm",
      description: "HAAS = Hierarchical Autonomous Agent Swarm - \"Resistance is futile!\"",
      language: "Python",
      languageColor: "#3572A5",
      stars: 47,
      forks: 12,
      updatedAt: "Updated 1 week ago",
    },
    {
      name: "portfolio-website",
      description: "Personal portfolio website built with Next.js and Tailwind CSS",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 16,
      forks: 3,
      updatedAt: "Updated 3 days ago",
    },
    {
      name: "mlrose",
      description: "Python package for implementing Machine Learning, Randomized Optimization and Search algorithms",
      language: "Jupyter Notebook",
      languageColor: "#DA5B0B",
      stars: 8,
      forks: 2,
      updatedAt: "Updated 2 weeks ago",
    },
    {
      name: "AMIA-Latex-Template",
      description: "Latex template for AMIA submissions",
      language: "PostScript",
      languageColor: "#7A151A",
      stars: 5,
      forks: 1,
      updatedAt: "Updated 1 month ago",
    },
  ]

  const handleRepoClick = (repoName: string) => {
    window.open(`${githubProfileUrl}/${repoName}`, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Popular Repositories</h2>
        <button 
          onClick={() => window.open(githubProfileUrl, "_blank")}
          className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {repositories.map((repo, index) => (
          <div 
            key={index} 
            className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => handleRepoClick(repo.name)}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-blue-600">{repo.name}</h3>
              <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-md">Public</span>
            </div>

            <p className="mt-2 text-gray-600">{repo.description}</p>

            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center text-sm">
                <span className="w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: repo.languageColor }}></span>
                <span>{repo.language}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-1" />
                <span>{repo.stars}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <GitFork className="w-4 h-4 mr-1" />
                <span>{repo.forks}</span>
              </div>

              <div className="text-sm text-gray-600">{repo.updatedAt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContributionsTab() {
  // Simplified contribution graph
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const contributionLevels = [0, 1, 2, 3, 4]

  // Generate random contribution data
  const generateContributions = () => {
    const contributions = []

    for (let i = 0; i < 52; i++) {
      // 52 weeks
      const week = []
      for (let j = 0; j < 7; j++) {
        // 7 days
        const level = Math.floor(Math.random() * 5) // 0-4 contribution level
        week.push(level)
      }
      contributions.push(week)
    }

    return contributions
  }

  const contributions = generateContributions()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contribution Activity</h2>

      <div className="p-4 bg-white border rounded-md">
        <div className="flex justify-between mb-2">
          {months.map((month, index) => (
            <div key={index} className="text-xs text-gray-500">
              {month}
            </div>
          ))}
        </div>

        <div className="flex">
          {contributions.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((level, dayIndex) => {
                let bgColor

                switch (level) {
                  case 0:
                    bgColor = "bg-gray-100"
                    break
                  case 1:
                    bgColor = "bg-green-100"
                    break
                  case 2:
                    bgColor = "bg-green-300"
                    break
                  case 3:
                    bgColor = "bg-green-500"
                    break
                  case 4:
                    bgColor = "bg-green-700"
                    break
                  default:
                    bgColor = "bg-gray-100"
                }

                return (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${bgColor}`}
                    title={`${level} contributions`}
                  ></div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end mt-2 space-x-2">
          <span className="text-xs text-gray-500">Less</span>
          {contributionLevels.map((level) => {
            let bgColor

            switch (level) {
              case 0:
                bgColor = "bg-gray-100"
                break
              case 1:
                bgColor = "bg-green-100"
                break
              case 2:
                bgColor = "bg-green-300"
                break
              case 3:
                bgColor = "bg-green-500"
                break
              case 4:
                bgColor = "bg-green-700"
                break
              default:
                bgColor = "bg-gray-100"
            }

            return <div key={level} className={`w-3 h-3 rounded-sm ${bgColor}`}></div>
          })}
          <span className="text-xs text-gray-500">More</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Activity</h3>

        <div className="p-4 border rounded-md">
          <div className="flex items-start">
            <div className="w-8 h-8 mr-4 overflow-hidden bg-gray-300 rounded-full">
              <div className="flex items-center justify-center w-full h-full text-sm bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                P
              </div>
            </div>

            <div>
              <div className="font-medium">
                <span className="text-blue-600">portfolio-dev</span> pushed to{" "}
                <span className="text-blue-600">main</span> at <span className="text-blue-600">portfolio-website</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">2 days ago</div>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <div className="flex items-start">
            <div className="w-8 h-8 mr-4 overflow-hidden bg-gray-300 rounded-full">
              <div className="flex items-center justify-center w-full h-full text-sm bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                P
              </div>
            </div>

            <div>
              <div className="font-medium">
                <span className="text-blue-600">portfolio-dev</span> created a pull request in{" "}
                <span className="text-blue-600">ai-content-generator</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">3 days ago</div>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <div className="flex items-start">
            <div className="w-8 h-8 mr-4 overflow-hidden bg-gray-300 rounded-full">
              <div className="flex items-center justify-center w-full h-full text-sm bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                P
              </div>
            </div>

            <div>
              <div className="font-medium">
                <span className="text-blue-600">portfolio-dev</span> starred{" "}
                <span className="text-blue-600">user/awesome-project</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">1 week ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
