"use client"

import { useState } from "react"
import {
  File,
  Folder,
  ChevronRight,
  ChevronDown,
  Code,
  Settings,
  Search,
  GitBranch,
  Play,
  Split,
  X,
} from "lucide-react"

export default function VSCodeApp() {
  const [activeFile, setActiveFile] = useState("index.tsx")
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    src: true,
    components: true,
  })

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }))
  }

  const fileStructure = [
    {
      name: "node_modules",
      type: "folder",
      children: [],
    },
    {
      name: "public",
      type: "folder",
      children: [
        { name: "favicon.ico", type: "file" },
        { name: "robots.txt", type: "file" },
      ],
    },
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Button.tsx", type: "file" },
            { name: "Card.tsx", type: "file" },
            { name: "Navbar.tsx", type: "file" },
          ],
        },
        { name: "App.tsx", type: "file" },
        { name: "index.tsx", type: "file" },
        { name: "styles.css", type: "file" },
      ],
    },
    { name: "package.json", type: "file" },
    { name: "tsconfig.json", type: "file" },
    { name: "README.md", type: "file" },
  ]

  const fileContents: Record<string, string> = {
    "index.tsx": `import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);`,
    "App.tsx": `import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Button from './components/Button';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <h1>Welcome to My Portfolio</h1>
        <div className="card-container">
          <Card 
            title="Project 1" 
            description="A description of project 1" 
          />
          <Card 
            title="Project 2" 
            description="A description of project 2" 
          />
          <Card 
            title="Project 3" 
            description="A description of project 3" 
          />
        </div>
        <Button>Contact Me</Button>
      </main>
    </div>
  );
}

export default App;`,
    "components/Navbar.tsx": `import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Portfolio</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;`,
    "components/Card.tsx": `import React from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="card-button">Learn More</button>
    </div>
  );
};

export default Card;`,
    "components/Button.tsx": `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;`,
    "styles.css": `/* Global styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Navbar styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

/* Card styles */
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card-button {
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

/* Button component */
.button {
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #005fa3;
}

/* App layout */
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}`,
    "package.json": `{
  "name": "portfolio-website",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "typescript": "^4.5.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@types/react": "^17.0.39",
    "@types/react-dom": "^17.0.11"
  }
}`,
    "README.md": `# Portfolio Website

A modern portfolio website built with React and TypeScript.

## Features

- Responsive design
- Project showcase
- Contact form
- Modern UI components

## Getting Started

1. Clone the repository
2. Install dependencies with \`npm install\`
3. Start the development server with \`npm start\`

## Build

Run \`npm run build\` to create a production build.

## License

MIT
`,
  }

  const renderFileTree = (items: Array<{
    name: string;
    type: string;
    path?: string;
    children?: Array<{
      name: string;
      type: string;
      path?: string;
      fileType?: string;
    }>;
  }>, level = 0) => {
    return items.map((item) => {
      if (item.type === "folder") {
        const isExpanded = expandedFolders[item.name] || false

        return (
          <div key={item.name}>
            <div
              className={`flex items-center py-1 px-${level * 2} hover:bg-gray-800 cursor-pointer`}
              onClick={() => toggleFolder(item.name)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500 mr-1" />
              )}
              <Folder className="w-4 h-4 text-blue-400 mr-1" />
              <span className="text-gray-300 text-sm">{item.name}</span>
            </div>

            {isExpanded && item.children && item.children.length > 0 && (
              <div className="ml-4">{renderFileTree(item.children, level + 1)}</div>
            )}
          </div>
        )
      } else {
        const filePath =
          level > 0
            ? `${items.find((i) => i.type === "folder" && expandedFolders[i.name])?.name}/${item.name}`
            : item.name

        return (
          <div
            key={item.name}
            className={`flex items-center py-1 px-${level * 2} hover:bg-gray-800 cursor-pointer ${
              activeFile === filePath || activeFile === item.name ? "bg-gray-800" : ""
            }`}
            onClick={() => setActiveFile(item.name)}
          >
            <File className="w-4 h-4 text-gray-400 ml-5 mr-1" />
            <span className="text-gray-300 text-sm">{item.name}</span>
          </div>
        )
      }
    })
  }

  const getLanguageFromFile = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "ts":
      case "tsx":
        return "typescript"
      case "js":
      case "jsx":
        return "javascript"
      case "css":
        return "css"
      case "json":
        return "json"
      case "md":
        return "markdown"
      default:
        return "plaintext"
    }
  }

  const getFileContent = (filename: string) => {
    // Check if it's a component file
    if (filename.startsWith("components/")) {
      return fileContents[filename] || "File not found"
    }

    return fileContents[filename] || "File not found"
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Title bar */}
      <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center">
          <Code className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-sm">VS Code - Portfolio Project</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-gray-200">
            <Split className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-200">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-900 border-r border-gray-800 hidden md:block">
          <div className="flex flex-col h-full">
            {/* Activity bar */}
            <div className="w-10 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 space-y-4">
              <button className="p-1 text-blue-500 border-l-2 border-blue-500">
                <File className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-300">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-300">
                <GitBranch className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-300">
                <Play className="w-5 h-5" />
              </button>
            </div>

            {/* Explorer */}
            <div className="flex-1 overflow-auto">
              <div className="p-2 text-xs font-semibold text-gray-500 uppercase">Explorer</div>
              <div className="mt-2">{renderFileTree(fileStructure)}</div>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex bg-gray-800 border-b border-gray-700">
            <div className="flex items-center px-3 py-1 bg-gray-900 border-r border-gray-700">
              <span className="text-xs text-gray-300">{activeFile}</span>
              <button className="ml-2 text-gray-500 hover:text-gray-300">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Code editor */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            <pre className="text-gray-300 whitespace-pre-wrap">{getFileContent(activeFile)}</pre>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-3 py-1 bg-blue-600 text-white text-xs">
            <div className="flex items-center space-x-3">
              <span>main</span>
              <span>{getLanguageFromFile(activeFile)}</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>Ln 1, Col 1</span>
              <span>Spaces: 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
