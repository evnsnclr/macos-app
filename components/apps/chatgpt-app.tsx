"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, User, ArrowDown } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatGPTApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm ChatGPT. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const sendMessage = async () => {
    if (input.trim() === "" || isTyping) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

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
        setMessages((prev) => [...prev, assistantMessage])
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
    <div className="flex flex-col h-full bg-[#343541]">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12Z"
                fill="currentColor"
              />
              <path
                d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                fill="currentColor"
              />
              <path
                d="M12 6.5C9.9884 6.5 8.21269 7.40799 7 8.79514C7.37353 9.20724 7.37353 9.87274 7 10.3C7.40147 10.7599 8.09111 10.7973 8.55371 10.3578C9.36714 9.48976 10.6223 9 12 9C15.0376 9 17.5 11.4624 17.5 14.5C17.5 17.5376 15.0376 20 12 20C8.96243 20 6.5 17.5376 6.5 14.5C6.5 13.9477 5.91102 13.3953 5 13.3953C4.44772 13.3953 4 13.9477 4 14.5C4 18.6421 7.35786 22 12 22C16.6421 22 20 18.6421 20 14.5C20 10.3579 16.6421 7 12 7C11.6481 7 11.3024 7.02459 10.9655 7.07202C10.8186 7.09006 10.2579 6.78254 10.5359 5.99986C10.9371 5.75945 11.4539 5.5 12 5.5C12.8284 5.5 13.5 4.82843 13.5 4C13.5 3.17157 12.8284 2.5 12 2.5C11.059 2.5 10.1752 2.89465 9.5 3.5C9.19448 3.80552 8.95672 4.15941 8.78885 4.54096C8.29305 5.4479 7.42088 5.949 6.5 5.5C5.78124 5.07552 5.66891 4.08205 6.12132 3.41421C6.63066 2.53149 7.42294 1.77143 8.41421 1.22183C9.36459 0.695458 10.6173 0 12 0C14.4853 0 16.5 2.01472 16.5 4.5C16.5 6.41704 15.2099 8.0297 13.4691 8.67022C13.1392 8.78266 12.7876 8.87247 12.4197 8.93L12.0993 8.97719C12.0332 8.98572 11.9666 8.99284 11.8995 8.99846C11.493 9.62476 10.7683 10.0166 10.0044 9.92923C9.22029 9.83852 8.6397 9.25352 8.56052 8.56502C8.47889 7.85471 8.86356 7.15851 9.49574 6.79293C9.90491 6.60599 10.3655 6.57218 10.7779 6.67558C11.1663 6.56403 11.5748 6.5 12 6.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white">ChatGPT</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-6">
              <div className={`flex ${message.role === "assistant" ? "bg-[#444654]" : "bg-[#343541]"} p-4 rounded-lg`}>
                <div className="flex-shrink-0 mr-4">
                  {message.role === "assistant" ? (
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-white whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mb-6">
              <div className="flex bg-[#444654] p-4 rounded-lg">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M9.5 12C9.5 13.3807 10.6193 14.5 12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-700">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              className="w-full p-4 pr-12 text-white bg-[#40414f] rounded-lg focus:outline-none resize-none"
              rows={1}
              disabled={isTyping}
            />
            <button
              onClick={sendMessage}
              disabled={input.trim() === "" || isTyping}
              className={`absolute right-3 bottom-3 p-1 rounded-md ${
                input.trim() === "" || isTyping ? "text-gray-500" : "text-white hover:bg-gray-600"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-xs text-center mt-2 text-gray-400">
            ChatGPT can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>

      {/* Scroll to bottom button - appears when needed */}
      {messages.length > 3 && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-8 p-2 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
