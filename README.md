🏰 Ivalice Chronicles: Party Builder & Role Optimizer

A Final Fantasy Tactics–inspired web application that allows users to build custom party compositions and receive structured tactical analysis based on unlocked abilities, role coverage, redundancy, and zodiac compatibility.

This is a build planning and theorycrafting tool — not a playable game.

🎮 Project Overview

Ivalice Chronicles recreates the character configuration experience of Final Fantasy Tactics in a modern web interface. Users can:

Create up to 5 custom units

Select jobs and secondary ability sets

Unlock abilities per job

Assign reaction, support, and movement abilities

Adjust Brave, Faith, Gender, Zodiac, and Level

View live tactical analysis of their party composition

Save and load party builds

The optimizer evaluates party balance based on real ability tags rather than simple job labels.

🧠 Optimization Engine

The rule-based analyzer evaluates:

Core Role Coverage

Healing

Damage

Ranged

Buffer

Debuffer

Advanced Capabilities

Revive

AoE damage

Crowd control

Mobility

Magic burst

Cleanse

Additional Analysis

Redundancy detection (too many similar units)

Tactical suggestions with one-click apply actions

Zodiac compatibility scoring between party members

Overall Party Score (0–100)

The optimizer is explainable and deterministic — no black-box AI.

🖥 UI Design

The interface follows a Faithful FFT aesthetic with modern readability:

Parchment panels

Gold accent borders

Stone-textured background

Serif headings inspired by classic tactical RPG UI

Clean spacing and responsive layout

Three-panel layout:

| Party Roster | Unit Sheet | Party Report |

🧱 Tech Stack

React

React Router

LocalStorage persistence

Custom rule-based optimization engine

Modular component architecture

BEM-based CSS structure

📁 Project Structure
src/
├── components/
├── routes/
│ └── PartyCustomizerPage/
├── data/
│ ├── jobs.seed.js
│ ├── zodiac.constants.js
├── utils/
│ └── optimizer/
│ ├── analyzeParty.js
│ └── suggestFixes.js
├── services/
│ └── storage/

💾 Data Model

Each unit stores:

Identity (name, level, gender, zodiac)

Primary & secondary job

Reaction, support, movement abilities

Unlocked abilities per job

Brave and Faith

Equipment (visual MVP)

Party analysis derives capability directly from unlocked ability tags.

🚀 Running Locally
npm install
npm run dev

Open:

http://localhost:5173

🔮 Future Enhancements

Backend authentication (save builds per user)

Community build sharing

Expanded job database via third-party API

Equipment stat modeling

Import/export build codes

Dark mode variant

🎯 Why This Project

This project demonstrates:

Complex state management

Derived data computation

Modular architecture

Rule-based optimization systems

UX recreation of legacy game UI in a modern web context

Structured problem solving and system design

It reflects both software engineering skills and passion-driven product design.

📜 Disclaimer

This project is a fan-made planning tool inspired by Final Fantasy Tactics.
It is not affiliated with or endorsed by Square Enix.
