"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function TerminalApp() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentDirectory, setCurrentDirectory] = useState("~")
  const [showWelcome, setShowWelcome] = useState(true)

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus the input when the terminal is clicked
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory(1)
    } else if (e.key === "Tab") {
      e.preventDefault()
      autocompleteCommand()
    }
  }

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return

    const newIndex = historyIndex + direction
    if (newIndex >= -1 && newIndex < commandHistory.length) {
      setHistoryIndex(newIndex)
      if (newIndex === -1) {
        setInput("")
      } else {
        setInput(commandHistory[newIndex])
      }
    }
  }

  const autocompleteCommand = () => {
    const commands = ["ls", "cd", "pwd", "echo", "clear", "date", "help", "cat", "mkdir", "touch", "whoami", "history"]

    if (input) {
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(input))
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
      } else if (matchingCommands.length > 1) {
        addToHistory(`\nPossible commands: ${matchingCommands.join(", ")}`)
      }
    }
  }

  const addToHistory = (text: string) => {
    setHistory((prev) => [...prev, text])
  }

  const executeCommand = () => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    // Add command to history
    addToHistory(`${currentDirectory} $ ${trimmedInput}`)

    // Add to command history for up/down navigation
    setCommandHistory((prev) => [trimmedInput, ...prev])
    setHistoryIndex(-1)

    // Process command
    const [command, ...args] = trimmedInput.split(" ")

    switch (command.toLowerCase()) {
      case "clear":
        setHistory([])
        setShowWelcome(false)
        break
      case "ls":
        listDirectory()
        break
      case "pwd":
        addToHistory(`/Users/portfolio${currentDirectory === "~" ? "" : currentDirectory}`)
        break
      case "cd":
        changeDirectory(args[0])
        break
      case "echo":
        addToHistory(args.join(" "))
        break
      case "date":
        addToHistory(new Date().toString())
        break
      case "whoami":
        addToHistory("portfolio-user")
        break
      case "help":
        showHelp()
        break
      case "cat":
        catFile(args[0])
        break
      case "mkdir":
        addToHistory(`mkdir: created directory '${args[0]}'`)
        break
      case "touch":
        addToHistory(`touch: created file '${args[0]}'`)
        break
      case "history":
        showCommandHistory()
        break
      default:
        addToHistory(`Command not found: ${command}. Type 'help' for available commands.`)
    }

    setInput("")
  }

  const listDirectory = () => {
    if (currentDirectory === "~") {
      addToHistory("Documents  Downloads  Pictures  Projects  README.md")
    } else if (currentDirectory === "~/Projects") {
      addToHistory("portfolio-website  react-app  node-api  python-scripts")
    } else {
      addToHistory("No files found")
    }
  }

  const changeDirectory = (dir?: string) => {
    if (!dir || dir === "~") {
      setCurrentDirectory("~")
    } else if (dir === "..") {
      if (currentDirectory !== "~") {
        setCurrentDirectory("~")
      }
    } else if (dir === "Projects" && currentDirectory === "~") {
      setCurrentDirectory("~/Projects")
    } else {
      addToHistory(`cd: no such directory: ${dir}`)
    }
  }

  const catFile = (filename?: string) => {
    if (!filename) {
      addToHistory("cat: missing file operand")
      return
    }

    if (filename === "README.md" && currentDirectory === "~") {
      addToHistory(`
# Portfolio Terminal

Welcome to my interactive terminal portfolio!

## Available Commands:
- ls: List directory contents
- cd: Change directory
- pwd: Print working directory
- echo: Display a message
- clear: Clear the terminal
- date: Display current date and time
- whoami: Display current user
- help: Show available commands
- cat: Display file contents
- mkdir: Create a directory
- touch: Create a file
- history: Show command history

Explore around to learn more about me and my projects!
      `)
    } else {
      addToHistory(`cat: ${filename}: No such file or directory`)
    }
  }

  const showHelp = () => {
    addToHistory(`
Available commands:
  ls        List directory contents
  cd        Change directory
  pwd       Print working directory
  echo      Display a message
  clear     Clear the terminal
  date      Display current date and time
  whoami    Display current user
  help      Show this help message
  cat       Display file contents
  mkdir     Create a directory
  touch     Create a file
  history   Show command history
    `)
  }

  const showCommandHistory = () => {
    if (commandHistory.length === 0) {
      addToHistory("No commands in history")
      return
    }

    const historyList = commandHistory
      .slice()
      .reverse()
      .map((cmd, i) => `${i + 1}  ${cmd}`)
      .join("\n")

    addToHistory(historyList)
  }

  return (
    <div
      ref={terminalRef}
      className="flex flex-col h-full bg-black text-green-400 font-mono p-2 overflow-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {showWelcome && (
        <div className="mb-4">
          <div className="text-xl font-bold mb-2">Portfolio Terminal v1.0</div>
          <div>Welcome to my interactive terminal portfolio!</div>
          <div>Type 'help' to see available commands.</div>
        </div>
      )}

      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}

      <div className="flex items-center mt-1">
        <span className="mr-2">{currentDirectory} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none"
          autoFocus
        />
      </div>
    </div>
  )
}
