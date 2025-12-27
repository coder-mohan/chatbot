# Full-Stack Chatbot (LLM Powered)

A full-stack chatbot application built with **React (Vite)** and **Node.js/Express**, secured using **JWT authentication** and powered by the **Google Gemini API**.

## Features
- Email/Password authentication with JWT
- Protected chat API (`/api/chat/generate`)
- AI responses generated via Gemini
- Loading state and user-friendly error handling
- Automatic logout on token expiry
- Exponential backoff for LLM API failures

## Tech Stack
- Frontend: React (Vite), Axios, Tailwind CSS
- Backend: Node.js, Express, MongoDB, JWT
- LLM: Google Gemini API

## Environment Variables

**Frontend**
VITE_BACKEND_URL=https://chatbot-meqq-git-main-mohan-sharmas-projects.vercel.app/


**Backend**
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL= https://chatbot-meqq-git-main-mohan-sharmas-projects.vercel.app/ 


## Run Locally
npm install
npm run dev

## Deployment
- Frontend deployed on **Vercel**
- GitHub-based CI/CD with auto-deploy on push

## Assignment Compliance
✔ React + Express  
✔ JWT Authentication  
✔ Secure LLM Integration  
✔ Error Handling & Retry Logic  
✔ Deployed Application  
