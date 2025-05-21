"use client"

import { useState } from "react"
import { Folder, FileText, ImageIcon, Code, FileVideo, Music, ArrowLeft } from "lucide-react"

interface FolderAppProps {
  folderType: string
}

interface FolderItem {
  name: string;
  type: "file" | "folder";
  path?: string;
  fileType?: string;
  content?: string;
}

interface FolderItemWithPath extends FolderItem {
  type: "folder";
  path: string;
}

interface FileItem extends FolderItem {
  type: "file";
  fileType: string;
  content: string;
}

export default function FolderApp({ folderType }: FolderAppProps) {
  const [currentFolder, setCurrentFolder] = useState(folderType)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const folders: Record<string, (FolderItemWithPath | FileItem)[]> = {
    projects: [
      { name: "Web Development", type: "folder", path: "web-projects" },
      { name: "Mobile Apps", type: "folder", path: "mobile-projects" },
      { name: "AI Projects", type: "folder", path: "ai-projects" },
      {
        name: "Project Showcase.pdf",
        type: "file",
        fileType: "pdf",
        content: "Project showcase document with highlights of major projects.",
      },
    ],
    resume: [
      {
        name: "Resume.pdf",
        type: "file",
        fileType: "pdf",
        content: "Professional resume with work experience, skills, and education.",
      },
      {
        name: "Cover Letter.docx",
        type: "file",
        fileType: "doc",
        content: "General cover letter template customizable for different job applications.",
      },
      { name: "Certifications", type: "folder", path: "certifications" },
    ],
    "web-projects": [
      { name: "E-Commerce Platform", type: "folder", path: "ecommerce" },
      { name: "Portfolio Website", type: "folder", path: "portfolio" },
      { name: "Dashboard UI", type: "folder", path: "dashboard" },
      {
        name: "Web Project Overview.txt",
        type: "file",
        fileType: "text",
        content: "Overview of all web development projects including technologies used and key features.",
      },
    ],
    "mobile-projects": [
      { name: "Fitness App", type: "folder", path: "fitness-app" },
      { name: "Social Media App", type: "folder", path: "social-app" },
      {
        name: "Mobile Project Overview.txt",
        type: "file",
        fileType: "text",
        content: "Overview of mobile application projects including React Native and Flutter implementations.",
      },
    ],
    "ai-projects": [
      { name: "Text Generation", type: "folder", path: "text-gen" },
      { name: "Image Classification", type: "folder", path: "image-class" },
      { name: "Sentiment Analysis", type: "folder", path: "sentiment" },
      {
        name: "AI Project Overview.txt",
        type: "file",
        fileType: "text",
        content: "Overview of AI projects including models, datasets, and performance metrics.",
      },
    ],
    certifications: [
      {
        name: "Web Development.pdf",
        type: "file",
        fileType: "pdf",
        content: "Full-stack web development certification.",
      },
      {
        name: "Cloud Computing.pdf",
        type: "file",
        fileType: "pdf",
        content: "AWS certified solutions architect certification.",
      },
      {
        name: "AI & Machine Learning.pdf",
        type: "file",
        fileType: "pdf",
        content: "Machine learning specialization certification.",
      },
    ],
    ecommerce: [
      { name: "Frontend Code", type: "folder", path: "ecommerce-frontend" },
      { name: "Backend API", type: "folder", path: "ecommerce-backend" },
      {
        name: "Project Documentation.pdf",
        type: "file",
        fileType: "pdf",
        content: "Comprehensive documentation for the e-commerce platform.",
      },
      { name: "Demo Screenshots", type: "folder", path: "ecommerce-screenshots" },
    ],
    portfolio: [
      { name: "Source Code", type: "folder", path: "portfolio-code" },
      { name: "Design Assets", type: "folder", path: "portfolio-design" },
      {
        name: "README.md",
        type: "file",
        fileType: "text",
        content:
          "# Portfolio Website\n\nA responsive portfolio website built with Next.js and Tailwind CSS.\n\n## Features\n\n- Responsive design\n- Dark/light mode\n- Project showcase\n- Contact form",
      },
    ],
  }

  const getIconForFile = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="w-10 h-10 text-red-500" />
      case "doc":
        return <FileText className="w-10 h-10 text-blue-500" />
      case "text":
        return <FileText className="w-10 h-10 text-gray-500" />
      case "image":
        return <ImageIcon className="w-10 h-10 text-purple-500" />
      case "code":
        return <Code className="w-10 h-10 text-green-500" />
      case "video":
        return <FileVideo className="w-10 h-10 text-orange-500" />
      case "audio":
        return <Music className="w-10 h-10 text-pink-500" />
      default:
        return <FileText className="w-10 h-10 text-gray-500" />
    }
  }

  const navigateToFolder = (path: string) => {
    setCurrentFolder(path)
    setSelectedFile(null)
  }

  const navigateUp = () => {
    // Simple navigation up one level
    const paths: Record<string, string> = {
      "web-projects": "projects",
      "mobile-projects": "projects",
      "ai-projects": "projects",
      certifications: "resume",
      ecommerce: "web-projects",
      portfolio: "web-projects",
      dashboard: "web-projects",
      "fitness-app": "mobile-projects",
      "social-app": "mobile-projects",
      "text-gen": "ai-projects",
      "image-class": "ai-projects",
      sentiment: "ai-projects",
      "ecommerce-frontend": "ecommerce",
      "ecommerce-backend": "ecommerce",
      "ecommerce-screenshots": "ecommerce",
      "portfolio-code": "portfolio",
      "portfolio-design": "portfolio",
    }

    if (paths[currentFolder]) {
      setCurrentFolder(paths[currentFolder])
      setSelectedFile(null)
    }
  }

  const openFile = (fileName: string | undefined) => {
    if (fileName) {
      setSelectedFile(fileName);
    }
  }

  const renderFileContent = () => {
    if (!selectedFile) return null

    const currentFiles = folders[currentFolder as keyof typeof folders] || []
    const file = currentFiles.find((f) => f.name === selectedFile)

    if (!file || !file.content) return null

    if (file.fileType === "text" || file.fileType === "pdf" || file.fileType === "doc") {
      return (
        <div className="p-4 bg-white rounded-md shadow">
          <div className="flex items-center mb-4">
            {getIconForFile(file.fileType)}
            <h3 className="ml-2 text-lg font-semibold">{file.name}</h3>
          </div>
          <div className="p-4 bg-gray-50 rounded whitespace-pre-wrap font-mono text-sm">{file.content}</div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center p-2 space-x-2 bg-gray-100 border-b">
        <button onClick={navigateUp} className="p-1 rounded hover:bg-gray-200">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="px-3 py-1 text-sm bg-white border rounded-md">/{currentFolder}</div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {selectedFile ? (
          <div className="h-full">
            <button onClick={() => setSelectedFile(null)} className="mb-4 text-sm text-blue-500 hover:underline">
              ← Back to files
            </button>
            {renderFileContent()}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {folders[currentFolder as keyof typeof folders]?.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (item.type === "folder" && 'path' in item) {
                    const folderItem = item as FolderItemWithPath;
                    navigateToFolder(folderItem.path);
                  } else {
                    openFile(item.name);
                  }
                }}
                className="flex flex-col items-center p-2 space-y-1 text-center cursor-pointer rounded-md hover:bg-gray-100"
              >
                {item.type === "folder" ? (
                  <Folder className="w-16 h-16 text-blue-500" />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center">{getIconForFile(item.fileType)}</div>
                )}
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
