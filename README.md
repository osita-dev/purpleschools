
PURPLESCHOOL

PurpleSchool is an intelligent learning platform designed for West African secondary school students preparing for WAEC, NECO, and JAMB exams. It combines an AI tutor, step-by-step guidance, exam-focused practice, and gamification to create a calm, encouraging, and engaging learning environment.

PurpleSchool is for students who want to truly understand their subjects, not just memorize answers. It also supports parents looking for reliable academic tools for their children, and teachers or schools seeking smarter ways to track student progress.

PurpleSchool is designed to be modern, professional, and easy to use, with a premium feel and smooth interface inspired by top tech products.

Who PurpleSchool Is For

PurpleSchool is built for:

* Secondary school students in JSS1 to SS3 aiming for better grades
* Students preparing for WAEC, NECO, and JAMB
* Learners who want to understand difficult topics step by step
* Parents who want structured, curriculum-aligned learning for their children
* Teachers and schools looking for data-driven tools to track student progress

Key Features

* AI Tutor: Get instant explanations and guidance for questions and topics
* Exam Practice: Solve real past WAEC and NECO questions with feedback
* Personalized Learning: Learn at your own pace with curriculum-aligned lessons
* Progress Tracking: Monitor XP, levels, achievements, and study streaks
* Gamification: Level up, earn achievements, and celebrate learning milestones
* Streaks and Micro-Wins: Stay motivated with daily engagement tracking
* Offline Access: Use PurpleSchool anywhere through Progressive Web App support
* Secure Login: Students, parents, and teachers have controlled access
* Analytics for Schools: Teachers and admins can track class performance and progress

How PurpleSchool Works

Students can ask the AI tutor questions, and it will explain the topic clearly, keeping conversations positive and non-shaming. Every question, study session, and streak earns XP, levels, and achievements. Students can see their progress in a dashboard, which makes learning rewarding and fun.

The system encourages daily learning through streaks and micro-wins, celebrates milestones, and adapts to each student’s pace. Parents and teachers can later access performance insights to provide guidance or adjust learning paths.

Progressive Web App

PurpleSchool is a PWA, which means it can be installed on any device, accessed offline, and provides fast loading with automatic updates. It feels like a premium app without the need for downloads from app stores.

Getting Started

To run PurpleSchool locally, you can follow these steps:

1. Clone the repository
2. Install dependencies
3. Run the development server

Example:
git clone [https://github.com/osita-dev/purpleschools.git]
cd purpleschool
bun install
bun run dev

Open your browser at [http://localhost:5173]to start using PurpleSchool.

Project Structure

* Components: Reusable UI elements
* Pages: Individual screens like Dashboard, Learn, About, Profile
* Contexts: Shared state management for things like level progress
* Services: Handle API calls and backend interactions
* Assets: Static files, images, and icons
* App.tsx: Main application layout
* main.tsx: Application entry point

Future Plans

PurpleSchool will expand to support more subjects, parent dashboards, teacher analytics, advanced AI tutoring, and richer gamification. Donation and support features may also be added to help sustain the platform and give students access to premium resources.

Why PurpleSchool

PurpleSchool is more than an online learning platform. It is designed to make learning enjoyable, motivating, and effective. Students feel guided, parents feel reassured, and schools can monitor performance. Every feature is built with West African exam success in mind, making it the go-to platform for secondary school learners.


Tech Stack

PurpleSchool is built with modern web technologies to ensure speed, reliability, and a premium user experience.

Frontend is powered by React and TypeScript with Vite for fast development. The UI is designed using Tailwind CSS and ShadCN UI, creating a clean and responsive look. React Query manages data and state efficiently, while React Router handles smooth page navigation.

PWA support is provided through vite-plugin-pwa, allowing offline use, fast loading, and installable app experience. The architecture is modular and scalable, so adding new features or pages is simple.

Getting Started
Prerequisites

Before running PurpleSchool, make sure you have:

Bun runtime alternative to Node.js (v16 or higher)

npm or bun

Installation

To run PurpleSchool locally:

Clone the repository:

git clone https://github.com/osita-dev/purpleschools.gitt
cd purpleschool


Install dependencies:

bun install


Start the development server:

bun run dev


Open your browser at http://localhost:5173 to see PurpleSchool in action.

To build for production:

bun run build


To preview the production build:

bun run preview

Project Structure

src/components/ – Reusable UI components

src/pages/ – Application pages like Dashboard, Learn, Profile

src/contexts/ – Shared React contexts for state management

src/services/ – API and backend logic

src/assets/ – Images, icons, and other static files

App.tsx – Root application component

main.tsx – Application entry point

PWA Support

PurpleSchool is a Progressive Web App, which means:

It can be installed on mobile and desktop devices

Works offline with cached content

Loads quickly even on slower networks

Updates automatically in the background

Service workers are handled with vite-plugin-pwa to provide this seamless experience.

Contributing

We welcome contributions from developers who want to help improve PurpleSchool. To contribute:

Fork the repository

Create a new branch for your feature

Commit your changes

Open a pull request

Roadmap

Future improvements include:

AI-generated quizzes for practice

Detailed analytics for students and teachers

Teacher dashboards to track class performance

Group learning and collaboration features

JAMB CBT simulations

Support

For questions, feedback, or suggestions:

Email: support@purpleschool.com

Website: https://purpleschool.org

License

This project is licensed under the MIT License.