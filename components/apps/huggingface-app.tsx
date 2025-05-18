export default function HuggingfaceApp() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* HuggingFace header */}
      <div className="flex items-center p-4 bg-yellow-50 border-b">
        <div className="text-xl font-bold text-gray-800">🤗 Hugging Face</div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-3xl font-bold">AI Projects</h1>

          <div className="grid gap-6">
            {/* Project 1 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h2 className="mb-2 text-2xl font-semibold">Text Generation Model</h2>
              <div className="mb-4 text-sm text-gray-500">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  Natural Language Processing
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Transformer
                </span>
              </div>

              <p className="mb-4 text-gray-700">
                A fine-tuned GPT model for generating creative content, including stories, poems, and marketing copy.
                The model was trained on a diverse dataset of high-quality written content to ensure versatility and
                coherence.
              </p>

              <div className="p-4 mb-4 bg-gray-100 rounded-md">
                <h3 className="mb-2 text-sm font-semibold">Example Output:</h3>
                <p className="text-sm text-gray-700 italic">
                  "The sunset painted the sky in hues of orange and purple, casting long shadows across the quiet beach.
                  Waves gently lapped at the shore, their rhythmic sound a soothing melody to the few remaining
                  visitors..."
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Updated 2 weeks ago</div>
                <button className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
                  View Model
                </button>
              </div>
            </div>

            {/* Project 2 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h2 className="mb-2 text-2xl font-semibold">Image Classification API</h2>
              <div className="mb-4 text-sm text-gray-500">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                  Computer Vision
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  ResNet
                </span>
              </div>

              <p className="mb-4 text-gray-700">
                A robust image classification API built on a fine-tuned ResNet architecture. The model can identify over
                1,000 different object categories with high accuracy and is optimized for real-time performance.
              </p>

              <div className="p-4 mb-4 bg-gray-100 rounded-md">
                <h3 className="mb-2 text-sm font-semibold">Performance Metrics:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Top-1 Accuracy: 92.3%</li>
                  <li>• Top-5 Accuracy: 98.7%</li>
                  <li>• Inference Time: 15ms</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Updated 1 month ago</div>
                <button className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
                  View Model
                </button>
              </div>
            </div>

            {/* Project 3 */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h2 className="mb-2 text-2xl font-semibold">Sentiment Analysis Tool</h2>
              <div className="mb-4 text-sm text-gray-500">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  Natural Language Processing
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  BERT
                </span>
              </div>

              <p className="mb-4 text-gray-700">
                A sentiment analysis tool that can detect emotions and sentiment in text with high accuracy. Built on a
                fine-tuned BERT model, it can identify nuanced emotional states beyond simple positive/negative
                classification.
              </p>

              <div className="p-4 mb-4 bg-gray-100 rounded-md">
                <h3 className="mb-2 text-sm font-semibold">Supported Emotions:</h3>
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
                <div className="text-sm text-gray-500">Updated 3 months ago</div>
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
