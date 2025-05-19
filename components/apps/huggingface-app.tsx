import { useDarkMode } from "@/components/dark-mode-context"

export default function HuggingfaceApp() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'dark bg-zinc-900' : 'bg-white'}`}>
      {/* HuggingFace header */}
      <div className={`flex items-center p-4 ${isDarkMode ? 'bg-amber-950/30' : 'bg-yellow-50'} border-b ${isDarkMode ? 'border-zinc-700' : ''}`}>
        <div className={`text-xl font-bold ${isDarkMode ? 'text-amber-100' : 'text-gray-800'}`}>🤗 Hugging Face</div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className={`mb-6 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI Projects</h1>

          <div className="grid gap-6">
            {/* Project 1 */}
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'}`}>
              <h2 className={`mb-2 text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Text Generation Model</h2>
              <div className="mb-4 text-sm text-gray-500">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  Natural Language Processing
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Transformer
                </span>
              </div>

              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                A fine-tuned GPT model for generating creative content, including stories, poems, and marketing copy.
                The model was trained on a diverse dataset of high-quality written content to ensure versatility and
                coherence.
              </p>

              <div className={`p-4 mb-4 rounded-md ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-100'}`}>
                <h3 className={`mb-2 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Example Output:</h3>
                <p className={`text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  &ldquo;The sunset painted the sky in hues of orange and purple, casting long shadows across the quiet beach.
                  Waves gently lapped at the shore, their rhythmic sound a soothing melody to the few remaining
                  visitors...&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Updated 2 weeks ago</div>
                <button className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
                  View Model
                </button>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'}`}>
              <h2 className={`mb-2 text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Image Classification API</h2>
              <div className="mb-4 text-sm text-gray-500">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                  Computer Vision
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  ResNet
                </span>
              </div>

              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                A robust image classification API built on a fine-tuned ResNet architecture. The model can identify over
                1,000 different object categories with high accuracy and is optimized for real-time performance.
              </p>

              <div className={`p-4 mb-4 rounded-md ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-100'}`}>
                <h3 className={`mb-2 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Performance Metrics:</h3>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• Top-1 Accuracy: 92.3%</li>
                  <li>• Top-5 Accuracy: 98.7%</li>
                  <li>• Inference Time: 15ms</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Updated 1 month ago</div>
                <button className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
                  View Model
                </button>
              </div>
            </div>

            {/* Project 3 */}
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'}`}>
              <h2 className={`mb-2 text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sentiment Analysis Tool</h2>
              <div className="mb-4 text-sm text-gray-500">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  Natural Language Processing
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  BERT
                </span>
              </div>

              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                A sentiment analysis tool that can detect emotions and sentiment in text with high accuracy. Built on a
                fine-tuned BERT model, it can identify nuanced emotional states beyond simple positive/negative
                classification.
              </p>

              <div className={`p-4 mb-4 rounded-md ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-100'}`}>
                <h3 className={`mb-2 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Supported Emotions:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Anger</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Sadness</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Joy</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Fear</span>
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Surprise</span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">Neutral</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Updated 3 months ago</div>
                <button className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
                  View Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
