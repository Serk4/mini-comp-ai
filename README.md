# mini‑comp‑ai — SOC 2 Evidence Analysis Demo
A lightweight SOC 2 evidence‑analysis application built with NestJS + Prisma + Groq on the backend and Next.js (App Router) + Tailwind on the frontend.
The app demonstrates how AI can streamline compliance workflows by summarizing evidence, identifying gaps, and recommending controls.

Features
Evidence Requests
Submit raw SOC 2 evidence text (e.g., access reviews, incident reports, vendor assessments).

AI generates:

Summary

Recommended controls

Missing evidence

Requests are stored in a database with status tracking.

Dashboard
Displays real‑time metrics:

Total requests

Pending requests

Completed requests

Shows the 5 most recent requests with status badges.

Requests List
View all evidence requests.

Click into any request to see full AI analysis.

Request Detail
Shows raw text, status, summary, recommended controls, and missing evidence.

Includes a Mark as Completed action for workflow progression.

New Request
Simple form to submit new evidence text.

Automatically redirects to the newly created request.

Tech Stack
Frontend
Next.js 14 (App Router)

React Server Components

Tailwind CSS

Fetch API (no client state libraries)

Backend
NestJS

Prisma ORM

SQLite (default) or any Prisma‑supported DB

Groq API for LLM‑powered analysis

Running the App
Backend
Code
cd apps/api
npm install
npm run start:dev
Frontend
Code
cd apps/web
npm install
npm run dev
Frontend runs on http://localhost:3000  
Backend runs on http://localhost:3001

Project Structure
Code
apps/
  api/        # NestJS backend (evidence processing + DB)
  web/        # Next.js frontend (dashboard + UI)
Sample SOC 2 Inputs
A full set of 50 realistic SOC 2 evidence samples is included in:

Code
SOC2-sample-requests.md
Use them to quickly populate the system.

Status Workflow
New requests start as pending

Users can mark them as completed from the detail page

Dashboard updates automatically based on backend data
