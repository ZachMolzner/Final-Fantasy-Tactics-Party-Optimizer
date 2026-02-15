🏰 Ivalice Chronicles
Party Builder & Role Optimizer

A Final Fantasy Tactics–inspired tactical planning application built with React.
Design custom party compositions, unlock abilities, and receive structured tactical analysis based on real ability data.

⚔️ This is a theorycrafting and build-planning tool — not a playable game.

🎮 Live Features

Ivalice Chronicles recreates the character configuration depth of FFT in a modern web interface.

🧩 Party Customization

Create up to 5 custom units

Select primary job + secondary action set

Unlock abilities per job

Equip:

Reaction abilities

Support abilities

Movement abilities

Adjust:

Brave

Faith

Gender

Zodiac sign

Level

Gender-locked jobs (Bard / Dancer)

Unique character job gating (Ramza, Agrias, etc.)

🧠 Tactical Optimization Engine

The rule-based analyzer evaluates actual unlocked abilities — not just job titles.

Core Role Coverage

Healing

Damage

Ranged pressure

Buffing

Debuffing

Advanced Capability Detection

Revive

AoE damage

Crowd control

Mobility

Magic burst

Cleanse

Additional Systems

Redundancy detection (overlapping roles)

Tactical suggestions

Zodiac compatibility scoring

Overall Party Score (0–100)

The optimizer is deterministic and explainable — no black-box AI.

🌍 Community Features

Users can:

Save party builds locally

Post builds to the Community feed

Add strategy notes

Search and sort shared builds

Save builds from other users

Open shared builds directly in the Party Customizer

All data is persisted via LocalStorage (MVP architecture).

👤 Authentication (Frontend MVP)

Lightweight profile system

Protected routes (Community / Profile)

Local session persistence

Display name identity

Author-only delete for community posts

🖥 UI & Visual Design

The UI is styled to evoke classic FFT aesthetics while maintaining modern usability.

Visual Direction

Parchment-style panels

Gold accent borders

Subtle radial highlights

Stone-toned gradients

Responsive layout

Accessible spacing & contrast

Layout System
| Party Roster | Unit Sheet | Party Report |

Additional pages:

Home (hero + quick links)

Community (composer + feed)

Profile (saved builds overview)

Sign In

🧱 Tech Stack

React

React Router

Custom Hooks

LocalStorage persistence layer

Rule-based optimization engine

Modular component architecture

BEM-based CSS structure

Vite

📁 Project Structure
src/
├── app/
│ ├── App.jsx
│ └── providers.jsx
├── components/
│ ├── layout/
│ ├── party/
│ └── shared/
├── routes/
│ ├── HomePage/
│ ├── PartyCustomizerPage/
│ ├── CommunityPage/
│ ├── ProfilePage/
│ └── SignInPage/
├── data/
│ ├── jobs.seed.js
│ ├── zodiac.constants.js
│ ├── roles.constants.js
│ └── portraits.seed.js
├── utils/
│ └── optimizer/
│ ├── analyzeParty.js
│ └── suggestFixes.js
├── services/
│ └── storage/
│ └── partyStorage.js
└── styles/

💾 Data Model

Each unit stores:

Identity

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

🔮 Planned Enhancements

Backend authentication (per-user accounts)

Database-backed community feed

Expanded job database via external API

Equipment stat modeling

Build import/export codes

Dark mode theme variant

Advanced analytics (synergy heatmap, archetype detection)

🎯 Why This Project Matters

This project demonstrates:

Complex state management

Derived data computation

Rule-based system design

Component architecture planning

UX recreation of legacy systems in modern frameworks

Feature expansion from MVP → multi-page app

Practical frontend authentication patterns

Structured problem solving

It reflects both engineering discipline and passion-driven product design.

📜 Disclaimer

This is a fan-made planning tool inspired by Final Fantasy Tactics.

It is not affiliated with or endorsed by Square Enix.
No copyrighted game assets are distributed in this project.
