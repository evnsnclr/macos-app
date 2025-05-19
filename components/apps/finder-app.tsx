"use client"

import { useState, useEffect } from "react"
import { FileText, ImageIcon, Code, FileVideo, Music, Search } from "lucide-react"
import Image from "next/image"

type FolderItem = {
  name: string;
  type: "folder";
  path: string;
}

type FileItem = {
  name: string;
  type: "file";
  fileType: string;
}

type Item = FolderItem | FileItem;

type FoldersMap = {
  [key: string]: Item[];
}

interface FinderAppProps {
  initialFolder?: string;
}

export default function FinderApp({ initialFolder = "home" }: FinderAppProps) {
  const [currentFolder, setCurrentFolder] = useState(initialFolder)
  const [searchQuery, setSearchQuery] = useState("")
  const [breadcrumb, setBreadcrumb] = useState<string[]>([initialFolder])
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  // Update breadcrumb when initialFolder changes
  useEffect(() => {
    setCurrentFolder(initialFolder);
    setBreadcrumb([initialFolder]);
  }, [initialFolder]);

  const folders: FoldersMap = {
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
    "web-projects": [
      { name: "React Projects", type: "folder", path: "react-projects" },
      { name: "Portfolio Site", type: "folder", path: "portfolio" },
      { name: "E-commerce Demo", type: "folder", path: "ecommerce" },
    ],
    "mobile-projects": [
      { name: "iOS Apps", type: "folder", path: "ios-apps" },
      { name: "Android Apps", type: "folder", path: "android-apps" },
      { name: "React Native Projects", type: "folder", path: "react-native" },
    ],
    "ai-projects": [
      { name: "Machine Learning", type: "folder", path: "ml-projects" },
      { name: "Data Analysis", type: "folder", path: "data-analysis" },
      { name: "AI Demo.mp4", type: "file", fileType: "video" },
    ],
    certifications: [
      { name: "Web Development.pdf", type: "file", fileType: "pdf" },
      { name: "AWS Certification.pdf", type: "file", fileType: "pdf" },
      { name: "UI/UX Design.pdf", type: "file", fileType: "pdf" },
    ],
    courses: [
      { name: "Computer Science", type: "folder", path: "cs-courses" },
      { name: "Design Courses", type: "folder", path: "design-courses" },
      { name: "Course List.xlsx", type: "file", fileType: "doc" },
    ],
  }

  useEffect(() => {
    // Reset selected item when changing folders
    setSelectedItem(null)
  }, [currentFolder])

  const getIconForFile = (fileType: string = "text") => {
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
    
    // Update breadcrumb
    const index = breadcrumb.indexOf(path)
    if (index >= 0) {
      // If we're navigating to a folder that's already in the breadcrumb
      setBreadcrumb(breadcrumb.slice(0, index + 1))
    } else {
      // If we're navigating to a new folder
      setBreadcrumb([...breadcrumb, path])
    }
  }

  const navigateUp = () => {
    if (currentFolder === "home") return

    // Get the previous folder from breadcrumb
    if (breadcrumb.length > 1) {
      const newBreadcrumb = breadcrumb.slice(0, breadcrumb.length - 1)
      setBreadcrumb(newBreadcrumb)
      setCurrentFolder(newBreadcrumb[newBreadcrumb.length - 1])
    } else {
      setCurrentFolder("home")
      setBreadcrumb(["home"])
    }
  }

  const handleItemClick = (item: Item) => {
    if (item.type === "folder") {
      navigateToFolder(item.path)
    } else {
      setSelectedItem(item)
    }
  }

  // Filter items based on search query
  const filteredItems = searchQuery 
    ? (folders[currentFolder as keyof typeof folders] || []).filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : folders[currentFolder as keyof typeof folders] || []

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200">
      {/* Toolbar */}
      <div className="flex items-center p-2 bg-gray-100 border-b space-x-2">
        <div className="flex space-x-1.5">
          <button 
            onClick={navigateUp}
            className="p-1 rounded hover:bg-gray-200"
            title="Navigate up"
          >
            ←
          </button>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-4">
          {/* Breadcrumb navigation */}
          <div className="flex items-center px-3 py-1 text-sm bg-white border rounded-md w-full">
            {breadcrumb.map((folder, index) => (
              <div key={folder} className="flex items-center">
                {index > 0 && <span className="mx-1 text-gray-400">/</span>}
                <button 
                  onClick={() => navigateToFolder(folder)}
                  className={`text-sm hover:text-blue-500 ${folder === currentFolder ? 'font-semibold' : ''}`}
                >
                  {folder.charAt(0).toUpperCase() + folder.slice(1).replace('-', ' ')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-2 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-1.5 px-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on small screens */}
        <div className="hidden sm:block w-48 p-2 bg-gray-50 border-r">
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-semibold text-gray-500 uppercase">Favorites</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => navigateToFolder("home")}
                  className={`flex items-center w-full px-2 py-1 text-sm text-left rounded hover:bg-gray-200 ${
                    currentFolder === "home" ? "bg-blue-100 text-blue-700" : ""
                  }`}
                >
                  <Image src="/folder.svg" width={16} height={16} alt="Folder" className="w-4 h-4 mr-2 text-blue-500" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToFolder("projects")}
                  className={`flex items-center w-full px-2 py-1 text-sm text-left rounded hover:bg-gray-200 ${
                    currentFolder === "projects" ? "bg-blue-100 text-blue-700" : ""
                  }`}
                >
                  <Image src="/folder.svg" width={16} height={16} alt="Folder" className="w-4 h-4 mr-2 text-blue-500" />
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToFolder("resume")}
                  className={`flex items-center w-full px-2 py-1 text-sm text-left rounded hover:bg-gray-200 ${
                    currentFolder === "resume" ? "bg-blue-100 text-blue-700" : ""
                  }`}
                >
                  <Image src="/folder.svg" width={16} height={16} alt="Folder" className="w-4 h-4 mr-2 text-blue-500" />
                  Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToFolder("skills")}
                  className={`flex items-center w-full px-2 py-1 text-sm text-left rounded hover:bg-gray-200 ${
                    currentFolder === "skills" ? "bg-blue-100 text-blue-700" : ""
                  }`}
                >
                  <Image src="/folder.svg" width={16} height={16} alt="Folder" className="w-4 h-4 mr-2 text-blue-500" />
                  Skills
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-2 text-xs font-semibold text-gray-500 uppercase">Tags</h3>
            <ul className="space-y-1">
              <li className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-200">
                <span className="w-2 h-2 mr-2 rounded-full bg-red-500"></span>
                Important
              </li>
              <li className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-200">
                <span className="w-2 h-2 mr-2 rounded-full bg-green-500"></span>
                Work
              </li>
              <li className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-200">
                <span className="w-2 h-2 mr-2 rounded-full bg-blue-500"></span>
                Personal
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 overflow-auto">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`flex flex-col items-center p-2 space-y-1 text-center cursor-pointer rounded-md transition-all hover:bg-gray-100 ${
                    selectedItem?.name === item.name ? "bg-blue-100 ring-2 ring-blue-300" : ""
                  }`}
                >
                  {item.type === "folder" ? (
                    <div className="w-14 h-14 flex items-center justify-center">
                      <Image src="/folder.svg" width={40} height={40} alt="Folder" className="text-blue-500" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200">
                      {getIconForFile(item.fileType)}
                    </div>
                  )}
                  <span className="text-xs font-medium w-full truncate">{item.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 py-20">
              <Search className="w-12 h-12 mb-2 text-gray-300" />
              <p>No items match your search</p>
            </div>
          )}
        </div>
        
        {/* Info panel - shown when an item is selected */}
        {selectedItem && (
          <div className="hidden md:block w-56 p-3 bg-gray-50 border-l">
            <h3 className="font-medium mb-2">Info</h3>
            <div className="mb-4">
              <div className="flex justify-center mb-3">
                {selectedItem.type === "folder" ? (
                  <Image src="/folder.svg" width={48} height={48} alt="Folder" />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                    {getIconForFile(selectedItem.fileType)}
                  </div>
                )}
              </div>
              
              <p className="text-sm font-medium text-center">{selectedItem.name}</p>
            </div>
            
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span>{selectedItem.type === "folder" ? "Folder" : selectedItem.fileType.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span>{selectedItem.type === "folder" ? "--" : "256 KB"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created:</span>
                <span>Today</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Modified:</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="px-3 py-1 text-xs text-gray-500 border-t bg-gray-50 flex justify-between">
        <span>{filteredItems.length} items</span>
        <span>44 GB available</span>
      </div>
    </div>
  )
}
