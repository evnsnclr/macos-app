export default function NotesApp() {
  return (
    <div className="flex flex-col h-full p-6 bg-yellow-50">
      <h1 className="mb-6 text-2xl font-bold">About Me</h1>

      <div className="prose max-w-none">
        <p>
          Hello! I'm a passionate developer with expertise in web development, mobile applications, and AI technologies.
          I love creating intuitive and engaging user experiences that solve real-world problems.
        </p>

        <h2 className="mt-6">My Journey</h2>
        <p>
          I started my journey in technology with a strong foundation in computer science. Over the years, I've worked
          on various projects ranging from responsive web applications to complex AI systems. My experience spans across
          different industries, allowing me to bring diverse perspectives to my work.
        </p>

        <h2 className="mt-6">Skills & Expertise</h2>
        <ul>
          <li>
            <strong>Frontend:</strong> React, Next.js, Vue.js, HTML/CSS, Tailwind CSS
          </li>
          <li>
            <strong>Backend:</strong> Node.js, Express, Python, Django, FastAPI
          </li>
          <li>
            <strong>Mobile:</strong> React Native, Flutter
          </li>
          <li>
            <strong>AI/ML:</strong> TensorFlow, PyTorch, Hugging Face Transformers
          </li>
          <li>
            <strong>DevOps:</strong> Docker, Kubernetes, CI/CD, AWS, Vercel
          </li>
        </ul>

        <h2 className="mt-6">Personal Interests</h2>
        <p>
          When I'm not coding, you can find me hiking in nature, reading science fiction, or experimenting with new
          recipes. I'm also passionate about continuous learning and regularly take courses to expand my knowledge in
          emerging technologies.
        </p>

        <h2 className="mt-6">Let's Connect!</h2>
        <p>
          I'm always open to new opportunities, collaborations, or just a friendly chat about technology. Feel free to
          reach out through any of the contact methods in my portfolio.
        </p>
      </div>
    </div>
  )
}
