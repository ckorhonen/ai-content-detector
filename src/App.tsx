import React, { useState } from 'react'

interface DetectionResult {
  success: boolean;
  isAiGenerated: boolean;
  confidence: number;
  reasoning?: string;
  type: string;
  model?: string;
  classifications?: Array<{ label: string; score: number }>;
  error?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text')
  const [textContent, setTextContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTextAnalyze = async () => {
    if (!textContent.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/detect-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textContent })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Analysis failed')
        return
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageAnalyze = async () => {
    if (!imageFile) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await fetch('/api/detect-image', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Analysis failed')
        return
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return 'text-red-600'
    if (confidence >= 0.4) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.7) return 'High'
    if (confidence >= 0.4) return 'Medium'
    return 'Low'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            🤖 AI Content Detector
          </h1>
          <p className="text-lg text-gray-600">
            Detect AI-generated content with advanced machine learning
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('text')
                setResult(null)
                setError(null)
              }}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === 'text'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 Text Analysis
            </button>
            <button
              onClick={() => {
                setActiveTab('image')
                setResult(null)
                setError(null)
              }}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === 'image'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🖼️ Image Analysis
            </button>
          </div>

          {/* Text Tab */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter text to analyze
                </label>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Paste or type the text you want to analyze for AI-generated content..."
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {textContent.length} / 10,000 characters
                </p>
              </div>

              <button
                onClick={handleTextAnalyze}
                disabled={loading || !textContent.trim() || textContent.length < 10}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                  loading || !textContent.trim() || textContent.length < 10
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Text'
                )}
              </button>
            </div>
          )}

          {/* Image Tab */}
          {activeTab === 'image' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload an image to analyze
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    disabled={loading}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer block"
                  >
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-gray-600">
                          {imageFile?.name} ({(imageFile?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                        </p>
                        <p className="text-sm text-indigo-600 font-medium">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-gray-600">Click to upload an image</p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={handleImageAnalyze}
                disabled={loading || !imageFile}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                  loading || !imageFile
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Image'
                )}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">❌ {error}</p>
            </div>
          )}

          {/* Results */}
          {result && result.success && (
            <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                📊 Analysis Results
              </h3>

              <div className="space-y-4">
                {/* AI Detection Status */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <span className="font-semibold text-gray-700">AI Generated:</span>
                  <span className={`text-xl font-bold ${result.isAiGenerated ? 'text-red-600' : 'text-green-600'}`}>
                    {result.isAiGenerated ? '⚠️ YES' : '✅ NO'}
                  </span>
                </div>

                {/* Confidence Score */}
                <div className="p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">Confidence:</span>
                    <span className={`text-xl font-bold ${getConfidenceColor(result.confidence)}`}>
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        result.confidence >= 0.7 ? 'bg-red-500' :
                        result.confidence >= 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Confidence Level: {getConfidenceLabel(result.confidence)}
                  </p>
                </div>

                {/* Reasoning */}
                {result.reasoning && (
                  <div className="p-4 bg-white rounded-lg">
                    <span className="font-semibold text-gray-700 block mb-2">Analysis:</span>
                    <p className="text-gray-600">{result.reasoning}</p>
                  </div>
                )}

                {/* Model Info */}
                {result.model && (
                  <div className="p-4 bg-white rounded-lg">
                    <span className="font-semibold text-gray-700 block mb-2">Model Used:</span>
                    <code className="text-sm text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {result.model}
                    </code>
                  </div>
                )}

                {/* Image Classifications */}
                {result.classifications && result.classifications.length > 0 && (
                  <div className="p-4 bg-white rounded-lg">
                    <span className="font-semibold text-gray-700 block mb-3">Top Classifications:</span>
                    <div className="space-y-2">
                      {result.classifications.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-medium text-indigo-600">
                            {(item.score * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-600">
          <p>Powered by Cloudflare Workers AI</p>
          <p className="mt-1">Rate limit: 10 requests per minute</p>
        </div>
      </div>
    </div>
  )
}

export default App
