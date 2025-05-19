"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, User, ArrowDown, MessageSquare, ListPlus, Trash2 } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

export default function ChatGPTApp() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "default",
      title: "New chat",
      messages: [
        {
          id: 1,
          role: "assistant",
          content: "Hello! I'm ChatGPT. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "ml-help",
      title: "Help with neural network training",
      messages: [
        {
          id: 1,
          role: "assistant",
          content: "Hello! I'm ChatGPT. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    },
    {
      id: "css-issues",
      title: "CSS is impossible to understand",
      messages: [
        {
          id: 1,
          role: "assistant",
          content: "Hello! I'm ChatGPT. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    },
    {
      id: "prod-bug",
      title: "Urgent: Production is down!!!",
      messages: [
        {
          id: 1,
          role: "assistant",
          content: "Hello! I'm ChatGPT. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9), // 9 days ago
    },
    {
      id: "please-fix",
      title: "Please fix (no explanation)",
      messages: [
        {
          id: 1,
          role: "assistant",
          content: "Hello! I'm ChatGPT. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Get the active conversation (always the default one now)
  const activeConversation = conversations.find(c => c.id === "default") || conversations[0]

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages])

  useEffect(() => {
    // Auto focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    
    // Auto-resize the textarea based on content
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    // Clear only the default/active conversation since users can't switch anymore
    setConversations(prev => 
      prev.map(conv => 
        conv.id === "default" 
          ? { 
              ...conv, 
              messages: [
                {
                  id: Date.now(),
                  role: "assistant",
                  content: "Chat cleared. How can I help you today?",
                  timestamp: new Date(),
                }
              ] 
            } 
          : conv
      )
    )
  }

  const sendMessage = async () => {
    if (input.trim() === "" || isTyping) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setConversations(prev => 
      prev.map(conv => 
        conv.id === "default" 
          ? { ...conv, messages: [...conv.messages, userMessage] } 
          : conv
      )
    )
    
    setInput("")
    setIsTyping(true)

    // Auto-resize the textarea back to default
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    // Simulate the ChatGPT typing delay
    setTimeout(
      () => {
        const response = generateResponse(input.trim())
        const assistantMessage: Message = {
          id: Date.now() + 1,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        }
        
        setConversations(prev => 
          prev.map(conv => 
            conv.id === "default" 
              ? { ...conv, messages: [...conv.messages, assistantMessage] } 
              : conv
          )
        )
        
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const generateResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase()

    // Simple pattern matching for responses
    if (userInputLower.includes("hello") || userInputLower.includes("hi") || userInputLower.includes("hey")) {
      return "Hello there! How can I assist you today?"
    } else if (userInputLower.includes("how are you")) {
      return "I'm functioning well, thank you for asking! How about you?"
    } else if (userInputLower.includes("name")) {
      return "I'm ChatGPT, an AI language model developed by OpenAI. It's nice to meet you!"
    } else if (userInputLower.includes("help")) {
      return "I'm here to help! You can ask me questions, request information, or just chat. What would you like to know?"
    } else if (userInputLower.includes("thank")) {
      return "You're welcome! If you have any other questions, feel free to ask."
    } else if (userInputLower.includes("weather")) {
      return "I don't have access to real-time weather data, but I'd recommend checking a weather app or website for the most current forecast."
    } else if (userInputLower.includes("joke") || userInputLower.includes("funny")) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the developer go broke? Because they lost their domain in a crash!",
        "How do you comfort a JavaScript bug? You console it!",
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why was the computer cold? It left its Windows open!",
      ]
      return jokes[Math.floor(Math.random() * jokes.length)]
    } else if (userInputLower.includes("portfolio")) {
      return "This portfolio is a great example of creative web development! It simulates a macOS environment with working applications. Try exploring the other apps in the dock to see more examples of the developer's work."
    } else if (userInputLower.includes("coding") || userInputLower.includes("programming")) {
      return "Programming is an amazing skill! If you're looking to learn, I'd recommend starting with JavaScript or Python. There are many free resources online to help you begin your coding journey."
    } else if (userInputLower.includes("react") || userInputLower.includes("next.js")) {
      return "React is a powerful JavaScript library for building user interfaces, and Next.js is a great framework built on top of React. This portfolio is actually built with React and likely uses Next.js for its robust features!"
    } else {
      const responses = [
        "That's an interesting point. Could you tell me more about it?",
        "I understand. Is there anything specific you'd like to know about that?",
        "Thanks for sharing. How can I help you with that?",
        "I see what you mean. Is there anything else you'd like to discuss?",
        "That's good to know. Do you have any questions about it?",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  return (
    <div className="flex h-full bg-[#1e1e1e] text-gray-100">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-64 flex flex-col border-r border-gray-700 bg-[#202123]">
          {/* Chat history header */}
          <div className="p-3 border-b border-gray-700">
            <h2 className="font-medium text-sm">Chat history</h2>
          </div>

          {/* Chat history */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`w-full flex items-center gap-2 p-2 rounded-md text-sm text-left line-clamp-1 ${
                    conversation.id === "default" ? 'bg-gray-700/70' : 'bg-gray-700/20'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 truncate">{conversation.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clear chat button */}
          <div className="p-2 border-t border-gray-700">
            <button 
              onClick={clearChat}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-md bg-red-600/20 hover:bg-red-600/30 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear current chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Toggle sidebar button */}
        <button 
          onClick={() => setShowSidebar(prev => !prev)}
          className="absolute top-2 left-2 z-10 p-1 text-gray-400 hover:text-gray-200 rounded-md"
        >
          <ListPlus className="w-5 h-5" />
        </button>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto pt-8 pb-32">
            {activeConversation.messages.map((message) => (
              <div 
                key={message.id} 
                className={`group px-4 py-6 ${
                  message.role === "assistant" ? "bg-[#444654]" : "bg-transparent"
                }`}
              >
                <div className="flex gap-4 max-w-3xl mx-auto">
                  <div className="flex-shrink-0 mt-0.5">
                    {message.role === "assistant" ? (
                      <div className="w-8 h-8 bg-[#10a37f] rounded-sm flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" className="text-white">
                          <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.5047 5.19742 27.7511 5.49804 26.0429C5.55718 26.0726 5.66048 26.1177 5.73461 26.1528L13.699 30.7533C13.8975 30.8665 14.1233 30.9277 14.3532 30.9277C14.583 30.9277 14.8088 30.8665 15.0073 30.7533L24.731 25.1313V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.662 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1579 26.6803 10.0968 26.4504 10.0968C26.2206 10.0968 25.9948 10.1579 25.7963 10.2712L16.0726 15.8933V11.9564C16.0715 11.9366 16.0753 11.9168 16.0837 11.8988C16.0921 11.8807 16.1048 11.865 16.1207 11.8531L24.1719 7.20468C25.4053 6.49254 26.8158 6.19586 28.2383 6.35659C29.6608 6.51732 30.9997 7.12911 32.0634 8.09949C33.127 9.06988 33.8536 10.3489 34.1442 11.7569C34.4349 13.165 34.2694 14.6201 33.6707 15.9305C33.5974 15.9649 33.4589 16.0117 33.3404 16.0517L35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8586 19.9893 10.8434 19.9763 10.8319 19.9602C10.8205 19.9441 10.8133 19.9254 10.8108 19.9058V10.6071C10.8108 9.18295 11.2668 7.78848 12.1291 6.63696C12.9913 5.48543 14.2151 4.64663 15.6048 4.31414C15.9255 4.23979 16.2561 4.20131 16.5876 4.19926C16.5876 4.27341 16.5876 4.39068 16.5876 4.47452V13.2296C16.5859 13.4589 16.6451 13.6846 16.7593 13.8836C16.8735 14.0825 17.0393 14.2474 17.2394 14.3608L26.9611 19.9829L23.6064 21.9257C23.5905 21.9363 23.5717 21.9427 23.5519 21.9445C23.5321 21.9464 23.5124 21.9435 23.4942 21.9361L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-[#5436da] rounded-sm flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-base">
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="px-4 py-6 bg-[#444654]">
                <div className="flex gap-4 max-w-3xl mx-auto">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 bg-[#10a37f] rounded-sm flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" className="text-white">
                        <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.5047 5.19742 27.7511 5.49804 26.0429C5.55718 26.0726 5.66048 26.1177 5.73461 26.1528L13.699 30.7533C13.8975 30.8665 14.1233 30.9277 14.3532 30.9277C14.583 30.9277 14.8088 30.8665 15.0073 30.7533L24.731 25.1313V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.662 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1579 26.6803 10.0968 26.4504 10.0968C26.2206 10.0968 25.9948 10.1579 25.7963 10.2712L16.0726 15.8933V11.9564C16.0715 11.9366 16.0753 11.9168 16.0837 11.8988C16.0921 11.8807 16.1048 11.865 16.1207 11.8531L24.1719 7.20468C25.4053 6.49254 26.8158 6.19586 28.2383 6.35659C29.6608 6.51732 30.9997 7.12911 32.0634 8.09949C33.127 9.06988 33.8536 10.3489 34.1442 11.7569C34.4349 13.165 34.2694 14.6201 33.6707 15.9305C33.5974 15.9649 33.4589 16.0117 33.3404 16.0517L35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8586 19.9893 10.8434 19.9763 10.8319 19.9602C10.8205 19.9441 10.8133 19.9254 10.8108 19.9058V10.6071C10.8108 9.18295 11.2668 7.78848 12.1291 6.63696C12.9913 5.48543 14.2151 4.64663 15.6048 4.31414C15.9255 4.23979 16.2561 4.20131 16.5876 4.19926C16.5876 4.27341 16.5876 4.39068 16.5876 4.47452V13.2296C16.5859 13.4589 16.6451 13.6846 16.7593 13.8836C16.8735 14.0825 17.0393 14.2474 17.2394 14.3608L26.9611 19.9829L23.6064 21.9257C23.5905 21.9363 23.5717 21.9427 23.5519 21.9445C23.5321 21.9464 23.5124 21.9435 23.4942 21.9361L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message input */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1e1e1e]">
          <div className="max-w-3xl mx-auto p-4">
            <div className="relative border border-gray-600 rounded-lg bg-[#40414f] shadow-xl">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Message ChatGPT..."
                className="w-full py-3 px-4 pr-12 text-white bg-transparent rounded-lg focus:outline-none resize-none max-h-[200px] min-h-[44px]"
                style={{ height: 'auto' }}
                disabled={isTyping}
                rows={1}
              />
              <button
                onClick={sendMessage}
                disabled={input.trim() === "" || isTyping}
                className={`absolute right-2 bottom-2 p-1.5 rounded-md ${
                  input.trim() === "" || isTyping ? "text-gray-500" : "text-gray-300 hover:bg-gray-600"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-center mt-2 text-gray-500">
              ChatGPT can make mistakes. Consider checking important information.
            </div>
          </div>
        </div>

        {/* Scroll to bottom button - appears when needed */}
        {activeConversation.messages.length > 3 && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-24 right-8 p-2 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
