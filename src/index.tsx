import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import App from './App'

type Bindings = {
  AI: any;
}

const app = new Hono<{ Bindings: Bindings }>()

// Serve the React app
app.get('/', (c) => {
  const html = renderToString(<App />)
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Content Detector</title>
        <script type="module" src="/src/main.tsx"></script>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `)
})

// API endpoint for content detection
app.post('/api/detect', async (c) => {
  try {
    const { content, type } = await c.req.json()
    
    // TODO: Implement AI detection logic using Cloudflare AI
    // const result = await c.env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
    //   prompt: content
    // })
    
    return c.json({
      success: true,
      isAiGenerated: false, // Placeholder
      confidence: 0,
      type: type
    })
  } catch (error) {
    return c.json({ success: false, error: 'Detection failed' }, 500)
  }
})

export default app
