"use client"

import { useState } from "react"
import { Folder, FileText, ImageIcon, Code, FileVideo, Music } from "lucide-react"

export default function FinderApp() {
  const [currentFolder, setCurrentFolder] = useState("home")

  const folders = {
    home: [
      { name: "Projects", type: "folder", path: "projects" },
      { name: "Resume", type: "folder", path: "resume" },
      { name: "Skills", type: "folder", path: "skills" },
      { name: "Education", type: "folder", path: "education" },
      { name: "Contact", type: "folder", path: "contact" },
    ],
    projects: [
      { name: "Web Development", type: "folder", path: "web-projects" },
      { name: "Mobile Apps", type: "folder", path: "mobile-projects" },
      { name: "AI Projects", type: "folder", path: "ai-projects" },
      { name: "Project Showcase.pdf", type: "file", fileType: "pdf" },
    ],
    resume: [
      { name: "Resume.pdf", type: "file", fileType: "pdf" },
      { name: "Cover Letter.docx", type: "file", fileType: "doc" },
      { name: "Certifications", type: "folder", path: "certifications" },
    ],
    skills: [
      { name: "Technical Skills.txt", type: "file", fileType: "text" },
      { name: "Soft Skills.txt", type: "file", fileType: "text" },
      { name: "Languages.txt", type: "file", fileType: "text" },
    ],
    education: [
      { name: "University Degree.pdf", type: "file", fileType: "pdf" },
      { name: "Courses", type: "folder", path: "courses" },
      { name: "Achievements.txt", type: "file", fileType: "text" },
    ],
    contact: [
      { name: "Contact Info.txt", type: "file", fileType: "text" },
      { name: "Social Media.txt", type: "file", fileType: "text" },
    ],
  }

  const getIconForFile = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "doc":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "text":
        return <FileText className="w-5 h-5 text-gray-500" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-purple-500" />
      case "code":
        return <Code className="w-5 h-5 text-green-500" />
      case "video":
        return <FileVideo className="w-5 h-5 text-orange-500" />
      case "audio":
        return <Music className="w-5 h-5 text-pink-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const navigateToFolder = (path: string) => {
    setCurrentFolder(path)
  }

  const navigateUp = () => {
    if (currentFolder === "home") return

    // Simple navigation up one level
    const paths = {
      projects: "home",
      resume: "home",
      skills: "home",
      education: "home",
      contact: "home",
      "web-projects": "projects",
      "mobile-projects": "projects",
      "ai-projects": "projects",
      certifications: "resume",
      courses: "education",
    }

    setCurrentFolder(paths[currentFolder as keyof typeof paths] || "home")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center p-2 space-x-2 bg-gray-100 border-b">
        <button onClick={navigateUp} className="p-1 rounded hover:bg-gray-200">
          Back
        </button>
        <div className="px-3 py-1 text-sm bg-white border rounded-md">/{currentFolder}</div>
      </div>

      {/* Sidebar and content */}
      <div className="flex flex-1">
        {/* Sidebar - hidden on small screens */}
        <div className="hidden sm:block w-48 p-2 bg-gray-50 border-r">
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-semibold text-gray-500 uppercase">Favorites</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => navigateToFolder("home")}
                  className="flex items-center w-full px-2 py-1 text-sm text-left rounded hover:bg-gray-200"
                >
                  <Folder className="w-4 h-4 mr-2 text-blue-500" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToFolder("projects")}
                  className="flex items-center w-full px-2 py-1 text-sm text-left rounded hover:bg-gray-200"
                >
                  <Folder className="w-4 h-4 mr-2 text-blue-500" />
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToFolder("resume")}
                  className="flex items-center w-full px-2 py-1 text-sm text-left rounded hover:bg-gray-200"
                >
                  <Folder className="w-4 h-4 mr-2 text-blue-500" />
                  Resume
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {folders[currentFolder as keyof typeof folders]?.map((item, index) => (
              <div
                key={index}
                onClick={() => (item.type === "folder" ? navigateToFolder(item.path) : null)}
                className="flex flex-col items-center p-2 space-y-1 text-center cursor-pointer rounded-md hover:bg-gray-100"
              >
                {item.type === "folder" ? (
                  <Folder className="w-12 h-12 text-blue-500" />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center">{getIconForFile(item.fileType)}</div>
                )}
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
