# API Documentation

Complete API reference for the AI Content Detector.

## Base URL

**Production:** `https://ai-content-detector.workers.dev`  
**Development:** `http://localhost:8787`

## Authentication

No authentication required. API uses IP-based rate limiting.

## Rate Limiting

- **Limit:** 10 requests per minute per IP address
- **Window:** 60 seconds
- **Response:** 429 Too Many Requests

When rate limit is exceeded:
```json
{
  "error": "Rate limit exceeded. Please try again later.",
  "resetAt": "2025-10-17T03:01:00.000Z"
}
```

---

## Endpoints

### 1. Text Detection

Analyze text content to determine if it was AI-generated.

**Endpoint:** `POST /api/detect-text`

**Content-Type:** `application/json`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| text | string | Yes | Text content to analyze (10-10,000 characters) |

**Example Request:**
```bash
curl -X POST https://ai-content-detector.workers.dev/api/detect-text \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is a sample text to analyze for AI-generated content."
  }'
```

#### Response

**Success (200 OK):**
```json
{
  "success": true,
  "isAiGenerated": false,
  "confidence": 0.65,
  "reasoning": "Text appears to be naturally written with varied sentence structure.",
  "type": "text",
  "model": "@cf/meta/llama-2-7b-chat-int8"
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Whether the request was successful |
| isAiGenerated | boolean | Whether content is likely AI-generated |
| confidence | number | Confidence score (0.0 - 1.0) |
| reasoning | string | Explanation of the detection result |
| type | string | Content type analyzed ("text") |
| model | string | AI model used for analysis |

#### Validation Errors

**400 Bad Request - Missing text:**
```json
{
  "error": "Text is required and must be a string"
}
```

**400 Bad Request - Too short:**
```json
{
  "error": "Text must be at least 10 characters long"
}
```

**400 Bad Request - Too long:**
```json
{
  "error": "Text must be less than 10,000 characters"
}
```

#### Error Response

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Text detection failed",
  "details": "Error message here"
}
```

---

### 2. Image Detection

Analyze image content to determine if it was AI-generated.

**Endpoint:** `POST /api/detect-image`

**Content-Type:** `multipart/form-data`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| image | file | Yes | Image file to analyze (max 5MB) |

**Supported formats:** JPEG, PNG, GIF, WebP

**Example Request:**
```bash
curl -X POST https://ai-content-detector.workers.dev/api/detect-image \
  -F "image=@/path/to/image.jpg"
```

#### Response

**Success (200 OK):**
```json
{
  "success": true,
  "isAiGenerated": true,
  "confidence": 0.82,
  "reasoning": "Image shows characteristics of AI-generated content",
  "type": "image",
  "model": "@cf/microsoft/resnet-50",
  "classifications": [
    {
      "label": "digital art",
      "score": 0.89
    },
    {
      "label": "computer graphics",
      "score": 0.76
    },
    {
      "label": "synthetic image",
      "score": 0.68
    }
  ]
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Whether the request was successful |
| isAiGenerated | boolean | Whether content is likely AI-generated |
| confidence | number | Confidence score (0.0 - 1.0) |
| reasoning | string | Explanation of the detection result |
| type | string | Content type analyzed ("image") |
| model | string | AI model used for analysis |
| classifications | array | Top image classifications with scores |

#### Validation Errors

**400 Bad Request - Wrong content type:**
```json
{
  "error": "Request must be multipart/form-data"
}
```

**400 Bad Request - Missing file:**
```json
{
  "error": "Image file is required"
}
```

**400 Bad Request - File too large:**
```json
{
  "error": "Image must be less than 5MB"
}
```

**400 Bad Request - Invalid file type:**
```json
{
  "error": "File must be an image"
}
```

#### Error Response

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Image detection failed",
  "details": "Error message here"
}
```

---

### 3. Health Check

Check API status and version.

**Endpoint:** `GET /api/health`

**Example Request:**
```bash
curl https://ai-content-detector.workers.dev/api/health
```

#### Response

**Success (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2025-10-17T03:00:00.000Z",
  "version": "1.0.0"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Detection Algorithm

### Text Detection

The text detection uses Cloudflare's Llama-2 model with the following approach:

1. **Input Validation**: Ensures text is between 10-10,000 characters
2. **AI Analysis**: Sends text to Llama-2-7B model for analysis
3. **Pattern Recognition**: Looks for common AI-generated patterns:
   - Repetitive phrases
   - Unnatural language patterns
   - AI-specific terminology
   - Consistent formatting
4. **Confidence Scoring**: Returns 0.0-1.0 confidence score
5. **Fallback**: Uses heuristics if AI model fails

### Image Detection

The image detection uses Cloudflare's ResNet-50 model:

1. **Input Validation**: Ensures image is valid and under 5MB
2. **Image Classification**: Analyzes image with ResNet-50
3. **AI Indicator Detection**: Checks for labels indicating AI generation:
   - "digital art"
   - "computer graphics"
   - "rendered"
   - "synthetic"
   - "artificial"
4. **Confidence Scoring**: Calculates based on classification scores
5. **Result**: Returns top 5 classifications with scores

---

## Confidence Score Interpretation

| Score Range | Level | Description |
|-------------|-------|-------------|
| 0.7 - 1.0 | High | Very likely AI-generated |
| 0.4 - 0.69 | Medium | Possibly AI-generated |
| 0.0 - 0.39 | Low | Likely human-created |

---

## Best Practices

### Text Analysis

✅ **DO:**
- Provide at least 100 characters for better accuracy
- Use complete sentences
- Include full paragraphs for best results

❌ **DON'T:**
- Send very short text (< 50 chars)
- Send code snippets (not designed for code)
- Exceed 10,000 character limit

### Image Analysis

✅ **DO:**
- Use high-quality images
- Upload images in JPEG or PNG format
- Keep file size under 5MB

❌ **DON'T:**
- Upload very low-resolution images
- Send corrupted or incomplete files
- Rely solely on this for critical decisions

---

## Code Examples

### JavaScript/TypeScript

```typescript
// Text Detection
async function detectText(text: string) {
  const response = await fetch('https://ai-content-detector.workers.dev/api/detect-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text })
  });
  
  const result = await response.json();
  return result;
}

// Image Detection
async function detectImage(imageFile: File) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('https://ai-content-detector.workers.dev/api/detect-image', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  return result;
}
```

### Python

```python
import requests

# Text Detection
def detect_text(text):
    response = requests.post(
        'https://ai-content-detector.workers.dev/api/detect-text',
        json={'text': text}
    )
    return response.json()

# Image Detection
def detect_image(image_path):
    with open(image_path, 'rb') as f:
        response = requests.post(
            'https://ai-content-detector.workers.dev/api/detect-image',
            files={'image': f}
        )
    return response.json()
```

### cURL

```bash
# Text Detection
curl -X POST https://ai-content-detector.workers.dev/api/detect-text \
  -H "Content-Type: application/json" \
  -d '{"text":"Your text here..."}'

# Image Detection
curl -X POST https://ai-content-detector.workers.dev/api/detect-image \
  -F "image=@image.jpg"

# Health Check
curl https://ai-content-detector.workers.dev/api/health
```

---

## CORS Support

The API includes CORS headers for browser-based requests:
- **Access-Control-Allow-Origin:** `*`
- **Access-Control-Allow-Methods:** `GET, POST, OPTIONS`
- **Access-Control-Allow-Headers:** `Content-Type`

---

## Limitations

1. **Rate Limiting:** 10 requests per minute per IP
2. **Text Length:** 10-10,000 characters
3. **Image Size:** Maximum 5MB
4. **Accuracy:** Not 100% accurate; use as a detection aid
5. **Models:** Limited to Cloudflare Workers AI models
6. **Privacy:** Content is processed but not stored

---

## Support

For issues or questions:
- GitHub Issues: [https://github.com/ckorhonen/ai-content-detector/issues](https://github.com/ckorhonen/ai-content-detector/issues)
- Email: ckorhonen@gmail.com

---

**Last Updated:** October 2025  
**API Version:** 1.0.0
