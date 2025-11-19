# 🚀 IntelliVoice – AI Voice Coaching & Real-Time Mock Interview Platform

**Your Personal AI Coach for Interviews, Lectures, GD, and Communication Skills.**

IntelliVoice is an advanced **AI-powered voice coaching platform** built using **Next.js, Convex, Deepgram, and GPT models**. It analyzes your speech in real-time, transcribes your audio, and generates expert-level responses based on selected coaching modes like:

* 🎤 **Mock Interview Expert**
* 📘 **Lecture Mode**
* 🎯 **GD / Debate Mode**
* 🧠 **Career & Skill Coach**
* 💼 **HR Interview Mode**

IntelliVoice helps users **practice speaking**, improve **fluency**, and provides **AI feedback**—making it perfect for interview prep, communication training, and learning.

---

## 🌟 Key Features

### 🎙️ Real-Time Voice Transcription

* Powered by **Deepgram Streaming APIs**
* High accuracy + low latency

### 🧠 AI Response Generation

* Uses **GPT-based model**
* Custom expert prompts depending on selected mode (Interview, Lecture, GD)

### 🚦 Mode-Based Intelligence

Each mode has unique behavior:

* **Interview Mode:** Asks follow-up questions, gives feedback
* **Lecture Mode:** Explains concepts with depth
* **GD Mode:** Argues both sides logically
* **Coach Mode:** Encourages improvement and gives tips

### 🔐 Custom Authentication System (Integrated with Convex)

* Fully **custom-built authentication system**, no external auth providers
* Uses **Convex database** to store users, hashed passwords, and sessions
* Implements **secure password hashing** (bcrypt/argon2)
* Generates **JWT-based tokens** for sessions
* Convex functions handle:

  * User registration
  * Login validation
  * Token verification
  * Protected server routes
* Frontend uses tokens to authenticate all API calls

### ⚡ Real-Time Backend (Convex)

* Stores users, sessions, transcripts, audio logs
* Fast and reactive

### 🧩 Modern UI/UX

* Built with **Next.js App Router + Tailwind CSS + ShadCN UI**
* Smooth animations
* Responsive design

### 🗂️ Session Dashboard

* Tracks your progress
* Shows session history
* Quick launch for coaching modes

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 14**
* **React**
* **Tailwind CSS**
* **ShadCN UI**
* **Framer Motion**

### Backend

* **Convex** (real-time database + API)
* **Deepgram** (audio streaming)
* **OpenAI GPT**
* **Custom Authentication System** (JWT + hashed passwords)**

---

## 📁 Project Structure

```bash
intellivoice/
 ├── app/
 │   ├── dashboard/
 │   ├── discussion/
 │   └── api/
 ├── components/
 │   ├── VoiceChat.tsx
 │   ├── ExpertList.ts
 │   ├── CoachingExpert.ts
 ├── convex/
 │   ├── functions/
 │   └── schema.ts
 ├── lib/
 ├── public/
 └── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/intellivoice.git
cd intellivoice
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create `.env.local`:

```
AUTH_SECRET_KEY=
AUTH_JWT_KEY=

NEXT_PUBLIC_DEEPGRAM_KEY=
OPENAI_API_KEY=

CONVEX_DEPLOYMENT=
```

### 4️⃣ Setup Convex

```bash
npx convex dev
```

### 5️⃣ Run project

```bash
npm run dev
```

---

## 🎥 How It Works (Flow)

1. User selects coaching mode (Lecture, Interview, GD…)
2. Fills session form
3. Starts speaking → Deepgram streams transcription
4. Transcription triggers AI prompt
5. AI sends real-time response
6. User sees & hears the reply
7. Entire session saved in Convex backend

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## ⭐ Support & Feedback

If you like this project, consider giving it a **⭐ on GitHub**! Your support motivates development!

---

