🏰 Ivalice Chronicles
Party Builder & Tactical Role Optimizer

A Final Fantasy Tactics–inspired tactical planning application built with React.

Design custom party compositions, unlock abilities, and receive structured tactical analysis powered by real ability metadata and deterministic rule evaluation.

⚔️ This is a theorycrafting and build-planning tool — not a playable game.

🌐 Live Demo

🔗 Deployed Application
https://zachmolzner.github.io/Final-Fantasy-Tactics-Party-Optimizer/

🎥 5-Minute Demo Walkthrough
A guided walkthrough of the architecture, optimization engine, and API integration.

👉 https://drive.google.com/file/d/146aVMSj_oOLQTG_nEgIV4q3Cx8rUzN1K/view?usp=sharing

🎮 Core Features
🧩 Party Customization

Build a 5-unit tactical party with deep configuration controls:

Select Primary Job

Assign Secondary Action Set

Unlock job abilities

Equip:

Reaction abilities

Support abilities

Movement abilities

Configure:

Brave

Faith

Gender

Zodiac sign

Level

Advanced constraints include:

Gender-locked jobs (Bard / Dancer)

Unique character job gating (Ramza, Agrias, etc.)

🧠 Tactical Optimization Engine

The deterministic analyzer evaluates actual unlocked abilities — not job titles.

Core Role Coverage

Healing

Damage

Ranged pressure

Buffing

Debuffing

Advanced Capabilities

Revive

AoE damage

Crowd control

Mobility

Magic burst

Cleanse

Additional Systems

Role redundancy detection

Zodiac compatibility scoring

Overall Party Score (0–100)

The optimizer is fully explainable — no black-box AI.

🌐 External API Integration

The project includes a service layer that integrates with the Final Fantasy Fandom API.

Fetches structured job data

Normalizes external responses into internal data models

Keeps UI decoupled from API logic

Ensures optimizer works with clean, predictable data

API access is isolated within services/fandom/ to maintain architectural separation between data retrieval and application logic.

🌍 Community Features (MVP)

Save party builds locally

Post builds to a Community feed

Add strategy notes

Search and sort shared builds

Save builds from other users

Load shared builds directly into Party Customizer

All data persistence is handled via LocalStorage (MVP architecture).

🔐 Authentication (Frontend MVP)

Lightweight profile system

Protected routes (Community / Profile)

Local session persistence

Display name identity normalization

Author-only delete permissions

Authentication state is managed via Context API and route protection is handled with a reusable ProtectedRoute wrapper.

🖥 UI & Visual Design

Inspired by classic FFT aesthetics while maintaining modern usability standards.

Visual Direction

Parchment-style panels

Gold accent borders

Subtle radial highlights

Stone-toned gradients

Responsive layout

Accessible spacing and contrast

Layout Structure

| Party Roster | Unit Sheet | Party Report |

Additional Pages:

Home

Community

Profile

Sign In

🧱 Tech Stack

React

React Router (HashRouter for GitHub Pages)

Context API

Custom Hooks

LocalStorage persistence layer

Rule-based optimization engine

Modular component architecture

BEM-based CSS methodology

Vite

📁 Project Structure
Final-Fantasy-Tactics-Party-Optimizer/
├── public/
├── scripts/
│ └── sync-fandom-jobs.js
├── src/
│ ├── app/
│ ├── assets/
│ ├── components/
│ │ ├── layout/
│ │ ├── party/
│ │ └── shared/
│ ├── context/
│ ├── data/
│ ├── hooks/
│ ├── routes/
│ ├── services/
│ │ ├── fandom/
│ │ └── storage/
│ ├── styles/
│ ├── utils/
│ │ └── optimizer/
│ ├── main.jsx
│ └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md

💾 Data Model

Each unit stores:

Name

Level

Gender

Zodiac

Primary job

Secondary job

Reaction / Support / Movement abilities

Unlocked abilities (bucketed per job)

Brave & Faith

Equipment (MVP placeholder)

Party analysis derives capability from ability tags, not static job assumptions.

🚀 Running Locally
npm install
npm run dev

Open:
http://localhost:5173

To deploy:

npm run deploy
🔮 Planned Enhancements

Backend authentication (JWT)

Database-backed community feed

Expanded job database via API

Equipment stat modeling

Build import/export codes

Dark mode variant

Advanced analytics (synergy heatmaps, archetype detection)

🎯 Why This Project Matters

This project demonstrates:

Complex state management

Derived data computation

Deterministic rule-based system design

Clean separation of logic and UI

API integration and normalization

Scalable component architecture

Evolution from MVP → multi-page application

It reflects both engineering discipline and passion-driven product design.

📜 Disclaimer

This is a fan-made planning tool inspired by Final Fantasy Tactics.

It is not affiliated with or endorsed by Square Enix.
No copyrighted game assets are intentionally distributed in this project.
