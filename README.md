# 🧠 CodeCrack - Smart Interview Management Platform

CodeCrack is a full-stack, real-time interview management platform designed for seamless scheduling, conducting, and reviewing of technical interviews. It features secure authentication, integrated video calls, live chat, and feedback collection — all in one intuitive interface.

<br/>

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - Role-based access with Clerk (Candidate & Interviewer)
  - Secure session handling and route protection

- 🎥 **Real-time Video Interviews**
  - Start or join meetings instantly using Stream.io Video SDK
  - Auto-recording enabled with post-call review support

- 🗓️ **Interview Scheduling**
  - Schedule interviews with time slots, candidates, and multiple interviewers
  - Calendar-based UI with customizable time and date

- 📁 **Recordings Dashboard**
  - View and playback recorded sessions
  - Copy/share links with built-in player

- 📊 **Interviewer Dashboard**
  - Track upcoming, completed, and failed interviews
  - Mark results as **Pass/Fail** with optional comments

- 🧑‍💻 **Live Code Editor (Collaborative)**
  - Embedded Monaco editor for on-call coding rounds
  - Supports C++, Java, Python with syntax highlighting

- 📡 **Realtime Updates**
  - Uses Stream.io and Convex for low-latency sync and storage
  - Chat-style overlays, participant panels, and presence detection

---

## 🛠️ Tech Stack

| Frontend         | Backend            | Realtime + Auth      | Styling            |
|------------------|--------------------|----------------------|--------------------|
| Next.js          | Convex DB/Funcs    | Stream.io(Video SDK) | TailwindCSS        |
| TypeScript       | Convex API Routes  | Clerk (Auth & JWT)   | ShadCN UI          |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/codecrack.git
cd codecrack

# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local

# Run the app locally
npm run dev


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
