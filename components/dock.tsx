"use client"

import { motion } from "framer-motion"
import { useWindowContext } from "@/components/window-context"
import { useDarkMode } from "@/components/dark-mode-context"
import DockIcon from "@/components/dock-icon"
import FinderApp from "@/components/apps/finder-app"
import SafariApp from "@/components/apps/safari-app"
import NotesApp from "@/components/apps/notes-app"
import GithubApp from "@/components/apps/github-app"
import LinkedinApp from "@/components/apps/linkedin-app"
import HuggingfaceApp from "@/components/apps/huggingface-app"
import CalculatorApp from "@/components/apps/calculator-app"
import SpotifyApp from "@/components/apps/spotify-app"
import MailApp from "@/components/apps/mail-app"
import VSCodeApp from "@/components/apps/vscode-app"
import TerminalApp from "@/components/apps/terminal-app"
import ChatGPTApp from "@/components/apps/chatgpt-app"

export default function Dock() {
  const { openWindow } = useWindowContext()
  const { isDarkMode } = useDarkMode()

  return (
    <div className="absolute bottom-0 w-full flex justify-center mb-3 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className={`px-5 py-2.5 rounded-2xl ${
          isDarkMode 
            ? 'bg-black/30 border-white/10' 
            : 'bg-white/20 border-white/30'
        } backdrop-blur-xl border flex items-end space-x-1.5 sm:space-x-2.5 overflow-x-auto sm:overflow-visible max-w-[92vw] sm:max-w-none scrollbar-hide shadow-lg`}
      >
        <DockIcon icon="/finder.svg" label="Finder" onClick={() => openWindow("finder", "Finder", <FinderApp />)} />
        <DockIcon icon="/safari.svg" label="Portfolio" onClick={() => openWindow("safari", "Portfolio", <SafariApp />)} />
        <DockIcon icon="/notes.svg" label="About Me" onClick={() => openWindow("notes", "About Me", <NotesApp />)} />
        <DockIcon icon="/mail.svg" label="Mail" onClick={() => openWindow("mail", "Mail", <MailApp />)} />
        <DockIcon
          icon="/calculator.svg"
          label="Calculator"
          onClick={() => openWindow("calculator", "Calculator", <CalculatorApp />)}
        />
        <DockIcon icon="/spotify.svg" label="Spotify" onClick={() => openWindow("spotify", "Spotify", <SpotifyApp />)} />
        <DockIcon icon="/vscode.svg" label="VS Code" onClick={() => openWindow("vscode", "VS Code", <VSCodeApp />)} />
        <DockIcon
          icon="/terminal.svg"
          label="Terminal"
          onClick={() => openWindow("terminal", "Terminal", <TerminalApp />)}
        />
        <DockIcon icon="/chatgpt.svg" label="ChatGPT" onClick={() => openWindow("chatgpt", "ChatGPT", <ChatGPTApp />)} />
        <DockIcon
          icon="/github.svg"
          label="GitHub"
          onClick={() => openWindow("github", "GitHub Projects", <GithubApp />)}
        />
        <DockIcon
          icon="/linkedin.svg"
          label="LinkedIn"
          onClick={() => openWindow("linkedin", "LinkedIn", <LinkedinApp />)}
        />
        <DockIcon
          icon="/huggingface.svg"
          label="AI Projects"
          onClick={() => openWindow("huggingface", "AI Projects", <HuggingfaceApp />)}
        />
      </motion.div>
    </div>
  )
}
