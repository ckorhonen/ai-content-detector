import React, { useState } from 'react'

interface DetectionResult {
  isAiGenerated: boolean;
  confidence: number;
  type: string;
}

function App() {
  const [content, setContent] = useState('')
  const [contentType, setContentType] = useState('text')
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDetect = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type: contentType })
      })
      const data = await response.json()
      if (data.success) {
        setResult(data)
      }
    } catch (error) {
      console.error('Detection failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🤖 AI Content Detector</h1>
      <p>Detect AI-generated content across images, text, and video</p>
      
      <div style={{ marginTop: '2rem' }}>
        <label>
          Content Type:
          <select 
            value={contentType} 
            onChange={(e) => setContentType(e.target.value)}
            style={{ marginLeft: '1rem', padding: '0.5rem' }}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content to analyze..."
          rows={10}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      <button 
        onClick={handleDetect}
        disabled={loading || !content}
        style={{ 
          marginTop: '1rem', 
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          cursor: loading || !content ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Analyzing...' : 'Detect AI Content'}
      </button>

      {result && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}>
          <h2>Detection Results</h2>
          <p>
            <strong>AI Generated:</strong> {result.isAiGenerated ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
          </p>
          <p>
            <strong>Content Type:</strong> {result.type}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
