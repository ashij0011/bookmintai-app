# BookMint AI 📚

**AI Coloring Book Generator** — [bookmintai.ca](https://bookmintai.ca)

Generate beautiful, print-ready coloring books instantly using AI. Enter any topic, choose your page count, and download a custom PDF coloring book in minutes.

---

## Features

- 🎨 AI-generated black-and-white coloring pages (DALL·E 3)
- 📄 Print-ready 8.5×11" PDF with cover page
- 🔢 10–50 pages per book
- ♾️ Unlimited topics
- ⚡ No account required
- 🔐 API key never exposed to the frontend

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript (ES Modules) |
| Styling | Tailwind CSS |
| AI Images | OpenAI DALL·E 3 |
| PDF | pdf-lib |
| Deployment | Hostinger Node.js Apps |

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bookmintai.git
cd bookmintai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-key-here
NODE_ENV=development
```

> **Get your key** at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).  
> You need access to **DALL·E 3** (requires a paid OpenAI account).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

```bash
npm run build
npm start
```

The app starts on port `3000` by default, or the value of the `PORT` environment variable.

---

## Deploying on Hostinger Node.js Apps

### Step-by-step

1. **Push to GitHub** — Commit and push your repository.

2. **Create a Node.js App** on Hostinger:
   - Log in to hPanel → Websites → Manage
   - Go to **Node.js** → **Create Application**
   - Node.js version: **18** or higher
   - Application root: `/` (or your repo subfolder)
   - Entry point: `node_modules/.bin/next` with args `start`

3. **Set Environment Variables** in hPanel:
   ```
   OPENAI_API_KEY=sk-your-key-here
   NODE_ENV=production
   PORT=3000
   ```

4. **Install & Build** via Hostinger's terminal or SSH:
   ```bash
   npm install
   npm run build
   ```

5. **Start the app** — Hostinger will run `npm start` automatically.

### Notes for Hostinger

- The `next.config.js` includes `output: 'standalone'` for efficient deployment.
- Make sure your Node.js version is ≥ 18.
- If Hostinger uses a custom port, the `start` script reads `$PORT` automatically.
- PDF generation is memory-intensive for large books (50 pages). Ensure your plan has adequate RAM (≥ 512 MB recommended).

---

## API Reference

### `POST /api/generate-book`

Generate a coloring book PDF.

**Request body:**
```json
{
  "topic": "Dinosaurs",
  "pageCount": 20
}
```

| Field | Type | Required | Constraints |
|---|---|---|---|
| `topic` | string | ✅ | 2–100 chars, letters/numbers/basic punctuation |
| `pageCount` | number | ✅ | Integer 10–50 |

**Success response:**
- Status: `200`
- Content-Type: `application/pdf`
- Body: Binary PDF file

**Error responses:**
```json
{ "success": false, "error": "Human-readable error message" }
{ "success": false, "errors": ["Validation error 1", "..."] }
```

| Status | Meaning |
|---|---|
| 400 | Invalid JSON body |
| 422 | Validation errors |
| 429 | OpenAI rate limit hit |
| 500 | Server / configuration error |
| 502 | OpenAI API error |

### `GET /api/generate-book`

Health check endpoint.

```json
{
  "service": "BookMint AI",
  "endpoint": "POST /api/generate-book",
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Project Structure

```
bookmintai/
│
├── app/
│   ├── layout.js                  # Root HTML layout + metadata
│   ├── page.js                    # Landing page
│   └── api/
│       └── generate-book/
│           └── route.js           # POST /api/generate-book
│
├── components/
│   ├── GeneratorForm.js           # Main form with progress & download
│   ├── HowItWorks.js              # Step-by-step section
│   ├── Features.js                # Feature grid
│   ├── Navbar.js                  # Top navigation
│   └── Footer.js                  # Site footer
│
├── lib/
│   ├── openai.js                  # DALL·E 3 image generation
│   ├── pdf.js                     # pdf-lib PDF builder
│   └── validation.js              # Input validation helpers
│
├── styles/
│   └── globals.css                # Tailwind + global styles
│
├── public/                        # Static assets
│
├── .env.example                   # Environment variable template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## Adding Features (Future Roadmap)

The codebase is structured to make these additions straightforward:

### Stripe Payments
- Add `STRIPE_SECRET_KEY` to env
- Create `/app/api/checkout/route.js` for session creation
- Add `/app/api/webhooks/stripe/route.js` for events
- Gate `/api/generate-book` behind a payment check

### Authentication (NextAuth)
- Install `next-auth`
- Create `/app/api/auth/[...nextauth]/route.js`
- Wrap the generator form with a session check

### Usage Limits
- Add a database (e.g. Postgres via Prisma)
- Track generations per user/IP in a `generations` table
- Check limits in `route.js` before calling OpenAI

### Generation History
- Store PDF metadata (topic, pages, timestamp) per user
- Create `/app/dashboard/page.js` with a history list
- Store PDFs in S3 / Cloudflare R2

---

## Estimated Costs

| Pages | DALL·E 3 cost (standard quality) |
|---|---|
| 10 pages | ~$0.40 |
| 20 pages | ~$0.80 |
| 50 pages | ~$2.00 |

Prices as of 2024. See [OpenAI pricing](https://openai.com/pricing) for current rates.

---

## License

MIT — see `LICENSE` for details.

---

*Made with ☕ and AI — [bookmintai.ca](https://bookmintai.ca)*
