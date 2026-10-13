# 🚀 PathForge AI — AI Career Roadmap & Skill Gap Analyzer

> **A high-impact, interactive prototype built for the Handshake AI Mission: *"Turn an Idea into a Working Prototype"*.**

Live Demo: Deployable directly to GitHub Pages with zero build dependencies.

---

## 🎯 The 3-Line Idea Description
1. **Who opens it:** Students, career switchers, and ambitious developers aiming to break into top-tier tech roles (AI/ML, Full Stack, Data Science, Cloud DevOps, Cybersecurity, Product Management, UI/UX).
2. **What it does:** In under 60 seconds, it audits current technical skills against verified 2026 industry benchmarks, calculates a real-time readiness match score, and builds an actionable week-by-week visual roadmap.
3. **The Core Promise:** Replaces overwhelming and generic tutorials with a personalized, day-by-day learning blueprint showing exactly what to study, what to build, and when they are ready to interview.

---

## ⚡ What Changed After Version 1 (Iterative Polish)
During initial testing of Version 1, several gaps and UX friction points were identified:
- **Gap 1 (No direct bridge to AI tools):** Users liked seeing project recommendations, but didn't know how to prompt ChatGPT or Claude to guide them through building them.
  - *Fix in v2:* Implemented the **AI Portfolio Capstone Prompt Generator** with one-click clipboard copy of structured system architecture prompts.
- **Gap 2 (Lost configuration on page refresh/sharing):** If a user configured their exact skills, sharing the link opened a blank default view.
  - *Fix in v2:* Built **URL Hash State Serialization** (`#role=ai_ml&hours=15&skills=Python,PyTorch`), allowing any evaluator or colleague to open the exact configured roadmap from the link.
- **Gap 3 (Abstract time commitment):** Seeing "16 weeks" felt vague without daily pacing.
  - *Fix in v2:* Added a **Dynamic 7-Day Weekly Study Scheduler** that calculates exact daily hours and focus tasks based on the study slider.
- **Gap 4 (Motivation & Gamification):** Checking milestones felt static.
  - *Fix in v2:* Added an interactive progress bar with a lightweight, offline HTML5 canvas confetti celebration engine.

---

## ✨ Key Features
- **8 In-Demand Tech Tracks:** AI/ML Engineer, Full Stack Software Engineer, Data Scientist, Cloud DevOps Solutions Architect, Cybersecurity Analyst, Technical Product Manager, and UI/UX Systems Designer.
- **Skill Gap & Readiness Engine:** Visualizes *Skills Mastered* vs. *High-Priority Gaps* vs. *Differentiator Skills*.
- **Dynamic Pacing & Compensation Intelligence:** Real-time salary benchmarks and target completion dates calculated from weekly commitment.
- **Interactive Milestone Checklist:** Progress tracking with persistent local state and celebration effects.
- **Multi-Format Exporting:** 1-Click Print/PDF export, Markdown blueprint download, and shareable URL generator.
- **Modern Aesthetics:** Dark/Light theme toggle, glassmorphic cards, mesh gradients, and Google Fonts typography.

---

## 🚀 How to Publish on GitHub Pages (Free Shareable URL)

1. Create a new public repository on GitHub (e.g., `pathforge-prototype`).
2. Run the following terminal commands in this directory:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/pathforge-prototype.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Click **Settings** → **Pages** (on the left menu).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
4. In about 60 seconds, your site is live at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/pathforge-prototype/`

---

## 🛠️ Tech Stack
- **HTML5:** Semantic architecture, accessible forms, OpenGraph meta tags.
- **CSS3:** Custom properties design tokens, glassmorphism, responsive grid/flexbox, print media styles.
- **JavaScript (ES6+):** Zero-dependency modular state engine, canvas particle animation, URL hash state serialization.
