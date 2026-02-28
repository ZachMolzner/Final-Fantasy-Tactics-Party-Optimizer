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

Watch the Demo:
https://drive.google.com/file/d/146aVMSj_oOLQTG_nEgIV4q3Cx8rUzN1K/preview

🎮 Core Features
🧩 Party Customization

Build a 5-unit tactical party with deep configuration controls.

Select

Primary Job

Secondary Action Set

Unlock

Job abilities

Equip

Reaction abilities

Support abilities

Movement abilities

Configure

Brave

Faith

Gender

Zodiac sign

Level

Advanced Constraints

Gender-locked jobs (Bard / Dancer)

Unique character job gating

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

Service layer integrates with the Final Fantasy Fandom API.

Fetches structured job data

Normalizes responses into internal data models

Keeps UI decoupled from API logic

API access isolated within services/fandom/

🌍 Community Features (MVP)

Save party builds locally

Post builds to a Community feed

Add strategy notes

Search and sort shared builds

Save builds from other users

Load shared builds directly into Party Customizer

All persistence handled via LocalStorage.

🔐 Authentication (Frontend MVP)

Lightweight profile system

Protected routes (Community / Profile)

Local session persistence

Author-only delete permissions

Authentication managed via Context API and a reusable ProtectedRoute wrapper.

🧱 Tech Stack

React

React Router (HashRouter)

Context API

Custom Hooks

LocalStorage

Rule-based optimization engine

Modular architecture

BEM CSS methodology

Vite

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

Advanced analytics

🎯 Why This Project Matters

This project demonstrates:

Complex state management

Derived data computation

Deterministic rule-based system design

Clean separation of logic and UI

API integration and normalization

Scalable component architecture

It reflects both engineering discipline and passion-driven product design.

📜 Disclaimer

This is a fan-made planning tool inspired by Final Fantasy Tactics.

It is not affiliated with or endorsed by Square Enix.