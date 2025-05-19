"use client"

import { motion } from "framer-motion"
import {
  H1, H2, P, UL, LI, Lead, Muted
} from "@/components/ui/typography"

// Markdown content with proper syntax
const notesContent = {
  title: "About Evan",
  introduction: "Hello! I'm Evan Smith, a Software Engineer with expertise in machine learning, AI, and fullstack development. I'm passionate about building innovative solutions that leverage cutting-edge technologies to solve complex problems.",
  
  approachTitle: "My Approach",
  approachContent: "I combine strong technical skills with a deep understanding of data science to create applications that are both powerful and intuitive. My experience with AI technologies has taught me to appreciate the balance between technical complexity and practical implementation, always keeping the end user in mind.",
  
  educationTitle: "Education",
  educationContent: "Currently pursuing a Master's degree in Computer Science with specialization in Machine Learning at Georgia Institute of Technology. I hold a degree in Computer Information Systems from Georgia State University's J. Mack Robinson College of Business.",
  
  skillsTitle: "Technical Skills",
  skills: [
    "AI & ML: Deep Learning, Natural Language Processing, PyTorch, Hugging Face Transformers, LangChain, Unsloth, NumPy, Pandas, Scikit-learn",
    "Languages: Python, JavaScript, TypeScript, SQL",
    "Frontend: React, Vue, HTML/CSS",
    "Backend: Node.js, Django, Flask, FastAPI",
    "Databases: PostgreSQL, MySQL, MongoDB",
    "DevOps: AWS, Vercel, Docker, Git, GitHub Actions"
  ],
  
  focusTitle: "Current Focus",
  focusContent: "I'm particularly interested in the application of machine learning to real-world problems, including LLM finetuning, data analysis, and building fullstack applications that make powerful technology accessible to users. My technical background combined with practical experience allows me to bridge the gap between theoretical models and practical implementations.",
  
  interestsTitle: "Personal Interests",
  interestsContent: "When I'm not coding, you can find me weight lifting, cold plunging for recovery, or working on woodworking projects. I'm also passionate about design and applying design principles to both digital and physical creations. These interests help me maintain a balanced perspective and often inspire creative approaches to technical challenges.",
  
  connectTitle: "Let's Connect!",
  connectContent: "I'm always open to new opportunities, collaborations, or just a friendly chat about technology. Feel free to reach out through the contact information in my portfolio or connect with me on LinkedIn."
};

export default function NotesApp() {
  return (
    <div className="flex flex-col h-full p-6 bg-amber-50 overflow-auto">
      <motion.div 
        className="max-w-3xl mx-auto w-full space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <H1 className="text-amber-900">{notesContent.title}</H1>
        
        <Lead className="text-slate-700">{notesContent.introduction}</Lead>
        
        <H2 className="text-amber-800 mt-8">{notesContent.approachTitle}</H2>
        <P className="text-slate-700">{notesContent.approachContent}</P>
        
        <H2 className="text-amber-800 mt-8">{notesContent.educationTitle}</H2>
        <P className="text-slate-700">
          Currently pursuing a <span className="font-semibold">Master&apos;s degree in Computer Science</span> with specialization in Machine Learning at Georgia Institute of Technology.
          I hold a degree in Computer Information Systems from Georgia State University&apos;s J. Mack Robinson College of Business.
        </P>
        
        <H2 className="text-amber-800 mt-8">{notesContent.skillsTitle}</H2>
        <UL className="text-slate-700">
          {notesContent.skills.map((skill, index) => (
            <LI key={index}>{skill}</LI>
          ))}
        </UL>
        
        <H2 className="text-amber-800 mt-8">{notesContent.focusTitle}</H2>
        <P className="text-slate-700">{notesContent.focusContent}</P>
        
        <H2 className="text-amber-800 mt-8">{notesContent.interestsTitle}</H2>
        <P className="text-slate-700">{notesContent.interestsContent}</P>
        
        <H2 className="text-amber-800 mt-8">{notesContent.connectTitle}</H2>
        <P className="text-slate-700">{notesContent.connectContent}</P>
        
        <Muted className="italic text-slate-500 mt-12 text-center">Last updated: {new Date().toLocaleDateString()}</Muted>
      </motion.div>
    </div>
  )
}
