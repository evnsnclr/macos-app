"use client"

import { useState } from "react"
import { Search, Star, Inbox, Send, File, Trash2, Tag, Settings, Plus, Paperclip, Smile } from "lucide-react"

export default function MailApp() {
  const [activeFolder, setActiveFolder] = useState("inbox")
  const [selectedEmail, setSelectedEmail] = useState<number | null>(1)
  const [composeOpen, setComposeOpen] = useState(false)

  const folders = [
    { id: "inbox", name: "Inbox", icon: <Inbox className="w-4 h-4" />, count: 3 },
    { id: "starred", name: "Starred", icon: <Star className="w-4 h-4" />, count: 0 },
    { id: "sent", name: "Sent", icon: <Send className="w-4 h-4" />, count: 0 },
    { id: "drafts", name: "Drafts", icon: <File className="w-4 h-4" />, count: 2 },
    { id: "trash", name: "Trash", icon: <Trash2 className="w-4 h-4" />, count: 0 },
  ]

  const emails = {
    inbox: [
      {
        id: 1,
        from: "GitHub",
        email: "noreply@github.com",
        subject: "Your repository has been starred",
        preview: "User johndoe has starred your repository portfolio-website. You now have 42 stars!",
        time: "10:23 AM",
        read: false,
        starred: false,
      },
      {
        id: 2,
        from: "LinkedIn",
        email: "jobs-noreply@linkedin.com",
        subject: "5 new job recommendations for you",
        preview:
          "Based on your profile, we think these jobs might be a good fit for you: Senior Frontend Developer at...",
        time: "Yesterday",
        read: true,
        starred: false,
      },
      {
        id: 3,
        from: "Vercel",
        email: "notifications@vercel.com",
        subject: "Your deployment is complete",
        preview:
          "Your project portfolio-website has been successfully deployed to production. View your deployment at...",
        time: "May 15",
        read: true,
        starred: true,
      },
    ],
    drafts: [
      {
        id: 4,
        from: "Me",
        email: "me@example.com",
        subject: "Project proposal",
        preview: "I'm writing to propose a new project that I believe would be beneficial for our team...",
        time: "May 12",
        read: true,
        starred: false,
      },
      {
        id: 5,
        from: "Me",
        email: "me@example.com",
        subject: "Meeting notes",
        preview: "Here are the notes from our meeting yesterday: 1. Discussed project timeline 2. Assigned tasks...",
        time: "May 10",
        read: true,
        starred: false,
      },
    ],
  }

  const selectedEmailData = selectedEmail
    ? emails[activeFolder as keyof typeof emails]?.find((email) => email.id === selectedEmail)
    : null

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="flex items-center p-2 bg-gray-100 border-b">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search mail"
            className="w-full pl-10 pr-4 py-1.5 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="ml-2 p-1.5 text-gray-600 hover:bg-gray-200 rounded">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r p-2 hidden sm:block">
          <button
            onClick={() => setComposeOpen(true)}
            className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </button>

          <nav>
            <ul className="space-y-1">
              {folders.map((folder) => (
                <li key={folder.id}>
                  <button
                    onClick={() => {
                      setActiveFolder(folder.id)
                      setSelectedEmail(null)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm ${
                      activeFolder === folder.id ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-500">{folder.icon}</span>
                      <span>{folder.name}</span>
                    </div>
                    {folder.count > 0 && (
                      <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">{folder.count}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 pt-4 border-t">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Labels</h3>
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-200">
                  <Tag className="w-4 h-4 mr-3 text-red-500" />
                  <span>Important</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-200">
                  <Tag className="w-4 h-4 mr-3 text-blue-500" />
                  <span>Work</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-200">
                  <Tag className="w-4 h-4 mr-3 text-green-500" />
                  <span>Personal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Email list */}
        <div
          className={`border-r ${selectedEmail && !composeOpen ? "hidden md:block" : ""} ${composeOpen ? "hidden md:block" : ""} w-full md:w-64 lg:w-80`}
        >
          <div className="h-full overflow-auto">
            {emails[activeFolder as keyof typeof emails]?.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email.id)}
                className={`p-3 border-b cursor-pointer ${
                  selectedEmail === email.id ? "bg-blue-50" : email.read ? "" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium truncate">{email.from}</div>
                  <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{email.time}</div>
                </div>
                <div className="text-sm font-medium truncate">{email.subject}</div>
                <div className="text-xs text-gray-500 truncate">{email.preview}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Email content or compose */}
        <div className={`flex-1 ${!selectedEmail && !composeOpen ? "hidden md:block" : ""}`}>
          {composeOpen ? (
            <div className="h-full flex flex-col">
              <div className="p-3 border-b">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">New Message</h2>
                  <button onClick={() => setComposeOpen(false)} className="text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center border-b pb-2">
                    <span className="w-16 text-sm text-gray-600">To:</span>
                    <input type="text" className="flex-1 outline-none" placeholder="recipient@example.com" />
                  </div>

                  <div className="flex items-center border-b pb-2">
                    <span className="w-16 text-sm text-gray-600">Subject:</span>
                    <input type="text" className="flex-1 outline-none" placeholder="Subject" />
                  </div>
                </div>
              </div>

              <div className="flex-1 p-3">
                <textarea
                  className="w-full h-full outline-none resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <div className="p-3 border-t flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>

                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send</button>
              </div>
            </div>
          ) : selectedEmailData ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-medium">{selectedEmailData.subject}</h2>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-yellow-500">
                      <Star className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedEmail(null)}
                      className="text-gray-500 hover:text-gray-700 md:hidden"
                    >
                      &times;
                    </button>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium mr-3">
                    {selectedEmailData.from.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{selectedEmailData.from}</div>
                    <div className="text-sm text-gray-500">{selectedEmailData.email}</div>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">{selectedEmailData.time}</div>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-auto">
                <p className="text-gray-800 whitespace-pre-line">
                  {selectedEmailData.preview}

                  {/* Expanded content */}
                  {selectedEmailData.id === 1 &&
                    `
                  
Dear Portfolio User,

We're excited to let you know that your repository "portfolio-website" has received a new star from user johndoe.

Your repository now has 42 stars in total. This is a great milestone and shows that your work is being recognized by the community.

You can view your repository statistics here: https://github.com/portfolio-user/portfolio-website/

Keep up the great work!

Best regards,
The GitHub Team
                  `}

                  {selectedEmailData.id === 3 &&
                    `
                  
Hello Portfolio User,

Your deployment to portfolio-website.vercel.app has completed successfully.

Deployment details:
- Project: portfolio-website
- Environment: Production
- Branch: main
- Commit: 8f7e3d9
- Deployment URL: https://portfolio-website.vercel.app

Your site is now live and accessible to visitors. You can view detailed analytics and logs in your Vercel dashboard.

Thank you for using Vercel!

The Vercel Team
                  `}
                </p>
              </div>

              <div className="p-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Reply</button>
                <button className="px-4 py-2 ml-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Forward</button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">Select an email to read</div>
          )}
        </div>
      </div>
    </div>
  )
}
