# Rate Limiter APIs

A Node.js + Express API project implementing a rate limiter middleware that limits each IP address to 10 requests per 5 minutes. When the limit is exceeded, the API returns a 429 status code with a `Retry-After` header.

## Features

- ✅ IP-based rate limiting (10 requests per 5 minutes per IP)
- ✅ Returns 429 status code when limit is exceeded
- ✅ Includes `Retry-After` header in response
- ✅ Standard rate limit headers (`RateLimit-*`)
- ✅ Error handling middleware
- ✅ Clean project structure

## Requirements

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rate-limiter-apis
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the server:
```bash
npm start
```

The server will run on port 4000 by default (or the port specified in the `PORT` environment variable).

2. Test the API:
```bash
# Make requests to the API
curl http://localhost:4000/api

# After 10 requests from the same IP, you'll receive:
# Status: 429 Too Many Requests
# Headers: Retry-After: 300
```

## API Endpoints

### GET /api
Returns a success message. This endpoint is protected by the rate limiter.

**Response (200 OK):**
```json
{
  "message": "Data fetched successfully",
  "data": []
}
```

**Response (429 Too Many Requests):**
```json
{
  "error": "Too many requests from this IP, please try again later.",
  "message": "Rate limit exceeded. Maximum 10 requests per 5 minutes.",
  "retryAfter": 300
}
```

## Rate Limiter Configuration

The rate limiter is configured in `src/middlewares/ratelimiter.js`:

- **Window**: 5 minutes (300,000 milliseconds)
- **Max Requests**: 10 requests per IP per window
- **Status Code**: 429 (Too Many Requests)
- **Retry-After Header**: Included in response (in seconds)

## Project Structure

```
rate-limiter-apis/
├── src/
│   ├── app.js                 # Main application file
│   ├── controllers/
│   │   └── users.controller.js
│   ├── middlewares/
│   │   └── ratelimiter.js    # Rate limiter middleware
│   └── routes/
│       └── users.route.js
├── package.json
├── README.md
└── .gitignore
```

## Environment Variables

- `PORT`: Server port (default: 4000)

## Testing

To test the rate limiter, you can use curl or any HTTP client:

```bash
# Make multiple requests quickly
for i in {1..15}; do
  curl -i http://localhost:4000/api
  echo "Request $i"
done
```

After the 10th request, you should see a 429 response with the `Retry-After` header.

## Dependencies

- **express**: Web framework for Node.js
- **express-rate-limit**: Rate limiting middleware for Express

## License

ISC

