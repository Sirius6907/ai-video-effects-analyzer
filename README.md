# 🎬 AI Video Effects Analyzer

**Strategic Vision-Loop Integration for Adobe After Effects & VFX Pipelines.**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Adobe](https://img.shields.io/badge/Adobe-After_Effects-blue?style=for-the-badge&logo=adobe-after-effects)](https://www.adobe.com/products/aftereffects.html)
[![AI](https://img.shields.io/badge/AI-Analyzed-purple?style=for-the-badge)](https://github.com/Sirius6907/ai-video-effects-analyzer)

---

## ⚡ 30-Second Executive Summary
VFX workflows are notoriously fragmented. This system bridges the gap between raw footage analysis and creative execution by automating the detection of motion patterns and color distributions, then synthesizing custom **ExtendScript** code for instant implementation in Adobe After Effects.

**Primary Impact**: Reduces average VFX setup latency by automating repetitive script synthesis and feature-matching logic.

---

## 🏗️ Engineering Deep Dive (5-Minute Value)

### Architecture & Ownership
I architected this as a hybrid analysis-to-execution pipeline. The core logic handles frame-accurate metadata extraction and translates high-level VFX requirements into deterministic Adobe-compatible scripts.

*   **Vision-Loop Integration**: Implemented visual feature extraction to identify camera movement and lighting variations.
*   **ExtendScript Synthesis Engine**: Designed a translation layer that generates AE-compatible JavaScript code based on footage analysis.
*   **Decision Logic**: Chose a web-based dashboard for orchestrating multiple VFX projects, providing better visibility than traditional CLI-only scripts.

### Technical Challenges Solved
*   **Version Compatibility**: Built a robust abstraction layer for ExtendScript to ensure generated code remains compatible across legacy and modern After Effects versions.
*   **Timeline Optimization**: Optimized the rendering and handling of frame-accurate metadata to maintain UI responsiveness during heavy processing.

---

## 🛠️ Feature Stack
- **AI-Powered Recommendations**: Suggests optimal effect stacks based on video content analysis.
- **ExtendScript Generation**: Directly outputs scripts for instant import into the AE Engine.
- **Workflow Automation**: Automates the "Time-to-First-Effect" sequence for VFX artists.

---

## 💻 Installation & Setup

### 1. Prerequisites
- Node.js v20+
- Adobe After Effects (for script execution)

### 2. Setup
```bash
git clone https://github.com/Sirius6907/ai-video-effects-analyzer.git
cd ai-video-effects-analyzer
npm install
```

### 3. Usage
```bash
npm start
```

---

## 📈 Roadmap
- [ ] Real-time "Look" Transfer using AI color grading.
- [ ] Cloud-based collaborative VFX libraries.
- [ ] Integration with Davinci Resolve / Fusion.

---

## 👔 Engineering Ownership Narrative (Interview Defense)
*   "I designed the end-to-end architecture, moving from visual feature ingestion to script synthesis."
*   "I personally implemented the ExtendScript translation logic, which was the most critical technical bottleneck for multi-version compatibility."
*   "I prioritized developer experience (DX) for VFX artists by ensuring 'Time-to-Magic' was under 5 minutes."

---

*"Empowering the next generation of visual storytellers through intelligent automation."*
