# AI Career Coach Frontend

Next.js frontend for the AI-Powered Career & Skills Advisor.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp env_example.txt .env.local
# Edit .env.local with your API URL
```

3. Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Built with Tailwind CSS and Lucide React icons
- **Real-time Feedback**: Loading states and error handling
- **Interactive Forms**: Dynamic skill and interest input
- **Expandable Results**: Detailed career paths and skill roadmaps
- **Resource Integration**: Direct links to learning resources
- **Time Management**: Structured learning timelines

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
- React Hot Toast (Notifications)
- Axios (HTTP Client)

## Project Structure

```
frontend/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
├── components/
│   ├── CareerForm.tsx
│   ├── CareerResults.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorBoundary.tsx
│   └── Toast.tsx
├── lib/
│   └── api.ts
└── public/
```
