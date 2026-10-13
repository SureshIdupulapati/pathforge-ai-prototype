/**
 * PathForge AI - Interactive Application Logic
 * Prototype v2.0 for Handshake AI Mission
 */

(function () {
  'use strict';

  // State Management
  const state = {
    selectedRole: 'ai_ml',
    selectedLevel: 'student',
    timeline: '6_months',
    hoursPerWeek: 15,
    selectedSkills: new Set(),
    completedMilestones: new Set(),
    customSkills: [],
    theme: localStorage.getItem('pathforge_theme') || 'dark'
  };

  // DOM Elements Cache
  const elements = {
    // Nav
    navPresetSelect: document.getElementById('nav-preset-select'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    navStartBtn: document.getElementById('nav-start-btn'),

    // Assessment Form
    roleSelect: document.getElementById('role-select'),
    levelSelect: document.getElementById('level-select'),
    timelineSelect: document.getElementById('timeline-select'),
    hoursSlider: document.getElementById('hours-slider'),
    hoursBadge: document.getElementById('hours-badge'),
    hoursHint: document.getElementById('hours-hint'),
    skillsContainer: document.getElementById('skills-container'),
    customSkillInput: document.getElementById('custom-skill-input'),
    addSkillBtn: document.getElementById('add-skill-btn'),
    selectedSkillsCount: document.getElementById('selected-skills-count'),
    requiredSkillsCount: document.getElementById('required-skills-count'),
    generateRoadmapBtn: document.getElementById('generate-roadmap-btn'),

    // Results Section
    resultsSection: document.getElementById('results-section'),
    reconfigureBtn: document.getElementById('reconfigure-btn'),
    scoreRingFill: document.getElementById('score-ring-fill'),
    scoreText: document.getElementById('score-text'),
    scoreStatusTitle: document.getElementById('score-status-title'),
    scoreStatusSub: document.getElementById('score-status-sub'),
    salaryValue: document.getElementById('salary-value'),
    salarySub: document.getElementById('salary-sub'),
    targetDateValue: document.getElementById('target-date-value'),
    pacingDetailsSub: document.getElementById('pacing-details-sub'),
    gapsCountValue: document.getElementById('gaps-count-value'),
    gapsCountSub: document.getElementById('gaps-count-sub'),

    // Matrix
    listMastered: document.getElementById('list-mastered'),
    listMissing: document.getElementById('list-missing'),
    listBonus: document.getElementById('list-bonus'),
    countMastered: document.getElementById('count-mastered'),
    countMissing: document.getElementById('count-missing'),
    countBonus: document.getElementById('count-bonus'),

    // Milestones & Roadmap
    roadmapProgressFill: document.getElementById('roadmap-progress-fill'),
    milestonesCounterText: document.getElementById('milestones-counter-text'),
    roadmapPhasesContainer: document.getElementById('roadmap-phases-container'),
    projectCardsContainer: document.getElementById('project-cards-container'),
    scheduleGrid: document.getElementById('schedule-grid'),
    scheduleSubtitle: document.getElementById('schedule-subtitle'),

    // Export Actions
    shareLinkBtn: document.getElementById('share-link-btn'),
    exportMarkdownBtn: document.getElementById('export-markdown-btn'),
    printRoadmapBtn: document.getElementById('print-roadmap-btn'),

    // Toast & Canvas
    toastContainer: document.getElementById('toast-container'),
    confettiCanvas: document.getElementById('confetti-canvas')
  };

  // ==========================================================================
  // Initialization
  // ==========================================================================

  function init() {
    setupTheme();
    setupEventListeners();
    loadFromUrlHash();
    renderSkillChipsForRole();
    updateSkillCounts();

    // If URL provided parameters or previous state exists, auto-render
    if (window.location.hash.length > 5) {
      generateRoadmap(false);
    }
  }

  // ==========================================================================
  // Theme Handling
  // ==========================================================================

  function setupTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('pathforge_theme', state.theme);
    updateThemeIcon();
    showToast(`Switched to ${state.theme} mode`, '🎨');
  }

  function updateThemeIcon() {
    if (elements.themeIcon) {
      elements.themeIcon.textContent = state.theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // ==========================================================================
  // Event Listeners
  // ==========================================================================

  function setupEventListeners() {
    // Theme toggle
    elements.themeToggleBtn.addEventListener('click', toggleTheme);

    // Preset selector in nav
    elements.navPresetSelect.addEventListener('change', function (e) {
      if (e.target.value !== '') {
        applyPreset(parseInt(e.target.value, 10));
      }
    });

    // Preset chip buttons in configurator
    document.querySelectorAll('.preset-chip').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-preset'), 10);
        applyPreset(idx);
      });
    });

    // Role selector change
    elements.roleSelect.addEventListener('change', function () {
      state.selectedRole = this.value;
      state.selectedSkills.clear();
      renderSkillChipsForRole();
      updateSkillCounts();
    });

    // Level selector
    elements.levelSelect.addEventListener('change', function () {
      state.selectedLevel = this.value;
    });

    // Timeline selector
    elements.timelineSelect.addEventListener('change', function () {
      state.timeline = this.value;
    });

    // Hours slider
    elements.hoursSlider.addEventListener('input', function () {
      state.hoursPerWeek = parseInt(this.value, 10);
      elements.hoursBadge.textContent = `${state.hoursPerWeek} hrs / week`;
      
      const daily = (state.hoursPerWeek / 7).toFixed(1);
      let desc = '~2.1 hours per day (Ideal for working professionals & students)';
      if (state.hoursPerWeek <= 10) {
        desc = `~${daily} hrs/day (Casual pacing, great for busy schedules)`;
      } else if (state.hoursPerWeek >= 25) {
        desc = `~${daily} hrs/day (Intensive full-time bootcamp pace)`;
      } else {
        desc = `~${daily} hrs/day (Balanced accelerated mastery)`;
      }
      elements.hoursHint.textContent = desc;
    });

    // Add custom skill
    elements.addSkillBtn.addEventListener('click', addCustomSkill);
    elements.customSkillInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addCustomSkill();
      }
    });

    // Generate Roadmap Button
    elements.generateRoadmapBtn.addEventListener('click', function () {
      generateRoadmap(true);
    });

    // Reconfigure / Edit Profile
    elements.reconfigureBtn.addEventListener('click', function () {
      elements.assessmentSection = document.getElementById('assessment-section');
      elements.assessmentSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Export & Share
    elements.shareLinkBtn.addEventListener('click', shareRoadmapLink);
    elements.exportMarkdownBtn.addEventListener('click', exportMarkdownPlan);
    elements.printRoadmapBtn.addEventListener('click', function () {
      window.print();
    });
  }

  // ==========================================================================
  // Presets & Skill Chips
  // ==========================================================================

  function applyPreset(index) {
    if (!PRESET_PROFILES[index]) return;
    const preset = PRESET_PROFILES[index];

    state.selectedRole = preset.roleId;
    elements.roleSelect.value = preset.roleId;

    state.selectedLevel = preset.level;
    elements.levelSelect.value = preset.level;

    state.hoursPerWeek = preset.hours;
    elements.hoursSlider.value = preset.hours;
    elements.hoursBadge.textContent = `${preset.hours} hrs / week`;

    state.timeline = preset.timeline;
    elements.timelineSelect.value = preset.timeline;

    state.selectedSkills = new Set(preset.skills);

    renderSkillChipsForRole();
    updateSkillCounts();
    generateRoadmap(true);
    showToast(`Loaded "${preset.name}" preset!`, '⚡');
  }

  function renderSkillChipsForRole() {
    const roleData = CAREER_DATA[state.selectedRole];
    if (!roleData) return;

    elements.skillsContainer.innerHTML = '';

    // Render standard skills
    roleData.requiredSkills.forEach(skillObj => {
      const isSelected = state.selectedSkills.has(skillObj.name);
      const chip = createSkillChipElement(skillObj.name, skillObj.category, isSelected);
      elements.skillsContainer.appendChild(chip);
    });

    // Render custom skills if any
    state.customSkills.forEach(customSkill => {
      const isSelected = state.selectedSkills.has(customSkill);
      const chip = createSkillChipElement(customSkill, 'Custom', isSelected);
      elements.skillsContainer.appendChild(chip);
    });

    updateSkillCounts();
  }

  function createSkillChipElement(skillName, category, isSelected) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `skill-chip ${isSelected ? 'selected' : ''}`;
    chip.setAttribute('data-skill', skillName);
    chip.innerHTML = `
      <span class="chip-check">✓</span>
      <span>${skillName}</span>
      <span style="font-size: 0.65rem; opacity: 0.65; margin-left: 2px;">${category}</span>
    `;

    chip.addEventListener('click', function () {
      toggleSkill(skillName, chip);
    });

    return chip;
  }

  function toggleSkill(skillName, chipElement) {
    if (state.selectedSkills.has(skillName)) {
      state.selectedSkills.delete(skillName);
      chipElement.classList.remove('selected');
    } else {
      state.selectedSkills.add(skillName);
      chipElement.classList.add('selected');
    }
    updateSkillCounts();
  }

  function addCustomSkill() {
    const text = elements.customSkillInput.value.trim();
    if (!text) return;

    if (!state.customSkills.includes(text)) {
      state.customSkills.push(text);
      state.selectedSkills.add(text);
      elements.customSkillInput.value = '';
      renderSkillChipsForRole();
      showToast(`Added custom skill: ${text}`, '💡');
    } else {
      showToast(`"${text}" is already listed!`, '⚠️');
    }
  }

  function updateSkillCounts() {
    const roleData = CAREER_DATA[state.selectedRole];
    if (!roleData) return;

    elements.selectedSkillsCount.textContent = state.selectedSkills.size;
    elements.requiredSkillsCount.textContent = roleData.requiredSkills.length;
  }

  // ==========================================================================
  // Roadmap Generation & Engine
  // ==========================================================================

  function generateRoadmap(shouldScroll) {
    const roleData = CAREER_DATA[state.selectedRole];
    if (!roleData) return;

    // 1. Calculate Skill Match Score
    const totalRequired = roleData.requiredSkills.length;
    let matchedCount = 0;
    const masteredList = [];
    const missingList = [];
    const bonusList = [];

    roleData.requiredSkills.forEach(req => {
      if (state.selectedSkills.has(req.name)) {
        matchedCount++;
        masteredList.push(req);
      } else {
        if (req.priority === 'Bonus') {
          bonusList.push(req);
        } else {
          missingList.push(req);
        }
      }
    });

    // Custom skills count as bonus/mastered
    state.customSkills.forEach(cs => {
      if (state.selectedSkills.has(cs)) {
        masteredList.push({ name: cs, category: 'Custom', priority: 'Differentiator' });
      }
    });

    const matchPercent = Math.min(100, Math.round((matchedCount / totalRequired) * 100));

    // Update Top Overview Cards
    updateScoreGauge(matchPercent);
    elements.salaryValue.textContent = roleData.avgSalary;
    elements.salarySub = document.getElementById('salary-sub');
    if (elements.salarySub) {
      elements.salarySub.textContent = `High Demand: ${roleData.demandLevel}`;
    }

    elements.gapsCountValue.textContent = `${missingList.length} Skills`;
    elements.gapsCountSub.textContent = `${masteredList.length} already mastered &bull; ${bonusList.length} bonuses`;

    // Calculate Completion Date
    const totalBaseWeeks = roleData.phases.reduce((sum, p) => sum + p.estimatedWeeks, 0);
    // Pace multiplier: 15 hrs standard base
    const paceMultiplier = 15 / state.hoursPerWeek;
    const estimatedWeeks = Math.max(4, Math.round(totalBaseWeeks * paceMultiplier));

    const today = new Date();
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + estimatedWeeks * 7);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    elements.targetDateValue.textContent = `${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;
    elements.pacingDetailsSub.textContent = `~${estimatedWeeks} weeks total @ ${state.hoursPerWeek} hrs/week`;

    // 2. Render Gap Matrix
    renderGapMatrix(masteredList, missingList, bonusList);

    // 3. Render Phases and Milestones
    renderPhases(roleData.phases, paceMultiplier);

    // 4. Render Project Lab
    renderProjectLab(roleData);

    // 5. Render Study Schedule
    renderSchedule(state.hoursPerWeek);

    // Update overall milestone progress bar
    updateMilestoneProgress();

    // Reveal results section
    elements.resultsSection.classList.add('active');

    // Sync state to URL hash
    updateUrlHash();

    if (shouldScroll) {
      setTimeout(() => {
        elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function updateScoreGauge(percent) {
    elements.scoreText.textContent = `${percent}%`;

    // SVG stroke dashoffset calculation: circumference is 2 * PI * 35 ~ 220
    const circumference = 220;
    const offset = circumference - (percent / 100) * circumference;
    elements.scoreRingFill.style.strokeDashoffset = offset;

    // Color gradient / stroke changes based on tier
    if (percent >= 75) {
      elements.scoreRingFill.style.stroke = 'var(--accent-emerald)';
      elements.scoreStatusTitle.textContent = 'Job-Ready Baseline 🚀';
      elements.scoreStatusSub.textContent = 'Minimal gaps remaining. Focus on capstones & system design.';
    } else if (percent >= 45) {
      elements.scoreRingFill.style.stroke = 'var(--accent-primary)';
      elements.scoreStatusTitle.textContent = 'Intermediate Foundation ⚡';
      elements.scoreStatusSub.textContent = 'Solid core knowledge. Follow the phase sprint below.';
    } else {
      elements.scoreRingFill.style.stroke = 'var(--accent-amber)';
      elements.scoreStatusTitle.textContent = 'Accelerated Transition 🌱';
      elements.scoreStatusSub.textContent = 'Clear step-by-step pathway prepared from zero.';
    }
  }

  function renderGapMatrix(mastered, missing, bonus) {
    elements.countMastered.textContent = mastered.length;
    elements.countMissing.textContent = missing.length;
    elements.countBonus.textContent = bonus.length;

    elements.listMastered.innerHTML = mastered.length ? mastered.map(s => `
      <div class="gap-item">
        <span>✅ ${s.name}</span>
        <span class="gap-item-tag tag-mastered">${s.category || 'Skill'}</span>
      </div>
    `).join('') : '<div style="font-size:0.8rem; color:var(--text-dim); padding:0.5rem;">None marked yet.</div>';

    elements.listMissing.innerHTML = missing.length ? missing.map(s => `
      <div class="gap-item">
        <span>🎯 ${s.name}</span>
        <span class="gap-item-tag tag-missing">${s.priority}</span>
      </div>
    `).join('') : '<div style="font-size:0.8rem; color:var(--accent-emerald); padding:0.5rem;">All core requirements met! 🎉</div>';

    elements.listBonus.innerHTML = bonus.length ? bonus.map(s => `
      <div class="gap-item">
        <span>🚀 ${s.name}</span>
        <span class="gap-item-tag tag-bonus">${s.category || 'Differentiator'}</span>
      </div>
    `).join('') : '<div style="font-size:0.8rem; color:var(--text-dim); padding:0.5rem;">Core stack prioritized.</div>';
  }

  function renderPhases(phases, paceMultiplier) {
    elements.roadmapPhasesContainer.innerHTML = '';

    phases.forEach(phase => {
      const scaledWeeks = Math.max(1, Math.round(phase.estimatedWeeks * paceMultiplier));

      const phaseCard = document.createElement('div');
      phaseCard.className = 'phase-card';
      phaseCard.id = `phase-card-${phase.phaseNumber}`;

      let milestonesHtml = phase.milestones.map(m => {
        const isDone = state.completedMilestones.has(m.id);
        return `
          <div class="milestone-item ${isDone ? 'completed' : ''}" id="milestone-row-${m.id}" data-mid="${m.id}">
            <div class="custom-checkbox" role="checkbox" aria-checked="${isDone}" tabindex="0" title="Toggle status">
              <span class="custom-checkbox-icon">✓</span>
            </div>
            <div class="milestone-body">
              <div class="milestone-text">${m.title}</div>
              <div class="milestone-meta">
                <span class="milestone-tag">${m.tag}</span>
                <span class="milestone-resource">📖 ${m.resource}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      phaseCard.innerHTML = `
        <div class="phase-header">
          <div class="phase-title-group">
            <div class="phase-badge-num">0${phase.phaseNumber}</div>
            <div class="phase-titles">
              <h3>${phase.title}</h3>
              <span class="phase-duration-badge">⏱️ ~${scaledWeeks} Weeks Duration</span>
            </div>
          </div>
        </div>

        <p class="phase-description">${phase.description}</p>

        <div class="milestones-checklist">
          ${milestonesHtml}
        </div>

        <div class="phase-project-card">
          <div class="phase-project-info">
            <div class="phase-project-badge">🛠️ Phase Milestone Project &bull; ${phase.miniProject.difficulty}</div>
            <div class="phase-project-title">${phase.miniProject.title}</div>
            <div class="phase-project-specs">${phase.miniProject.specs}</div>
          </div>
          <button type="button" class="btn btn-secondary btn-copy-prompt" data-project-title="${phase.miniProject.title}" data-project-specs="${phase.miniProject.specs}">
            📋 Copy AI Prompt
          </button>
        </div>
      `;

      // Attach milestone checkbox toggle handlers
      phaseCard.querySelectorAll('.milestone-item').forEach(item => {
        const mid = item.getAttribute('data-mid');
        const checkbox = item.querySelector('.custom-checkbox');

        const toggleHandler = () => {
          if (state.completedMilestones.has(mid)) {
            state.completedMilestones.delete(mid);
            item.classList.remove('completed');
            checkbox.setAttribute('aria-checked', 'false');
          } else {
            state.completedMilestones.add(mid);
            item.classList.add('completed');
            checkbox.setAttribute('aria-checked', 'true');
            triggerConfetti();
            showToast('Milestone completed! Keep going! 🎯', '🎉');
          }
          saveStateLocally();
          updateMilestoneProgress();
        };

        checkbox.addEventListener('click', toggleHandler);
        checkbox.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleHandler();
          }
        });
      });

      // Attach Phase mini-project prompt button
      phaseCard.querySelector('.btn-copy-prompt').addEventListener('click', function () {
        const title = this.getAttribute('data-project-title');
        const specs = this.getAttribute('data-project-specs');
        copyProjectPromptToClipboard(title, specs);
      });

      elements.roadmapPhasesContainer.appendChild(phaseCard);
    });
  }

  function updateMilestoneProgress() {
    const roleData = CAREER_DATA[state.selectedRole];
    if (!roleData) return;

    let totalMilestones = 0;
    roleData.phases.forEach(p => {
      totalMilestones += p.milestones.length;
    });

    const completedCount = state.completedMilestones.size;
    const pct = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;

    elements.roadmapProgressFill.style.width = `${pct}%`;
    elements.milestonesCounterText.textContent = `${completedCount} of ${totalMilestones} Milestones Completed (${pct}%)`;

    if (completedCount === totalMilestones && totalMilestones > 0) {
      triggerConfetti(true);
      showToast('Incredible! All milestones completed! 🏆', '⭐');
    }
  }

  // ==========================================================================
  // Project Lab & Prompts
  // ==========================================================================

  function renderProjectLab(roleData) {
    elements.projectCardsContainer.innerHTML = '';

    roleData.phases.slice(1).forEach((phase, idx) => {
      const proj = phase.miniProject;
      let diffClass = 'diff-beginner';
      if (proj.difficulty.toLowerCase().includes('intermediate')) diffClass = 'diff-intermediate';
      if (proj.difficulty.toLowerCase().includes('advanced') || proj.difficulty.toLowerCase().includes('cap-stone')) diffClass = 'diff-advanced';

      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div>
          <div class="project-badge-bar">
            <span class="project-difficulty ${diffClass}">${proj.difficulty}</span>
            <span style="font-size: 0.75rem; color: var(--text-dim);">Portfolio Capstone 0${idx + 1}</span>
          </div>
          <h3 class="project-card-title">${proj.title}</h3>
          <p class="project-card-desc">${proj.specs}</p>
          <div class="project-tech-stack">
            <span class="tech-tag">${roleData.title}</span>
            <span class="tech-tag">Portfolio Ready</span>
            <span class="tech-tag">GitHub Showcase</span>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-copy-prompt" style="margin-top: 1rem;">
          🤖 Generate Architecture Prompt
        </button>
      `;

      card.querySelector('.btn-copy-prompt').addEventListener('click', function () {
        copyProjectPromptToClipboard(proj.title, proj.specs);
      });

      elements.projectCardsContainer.appendChild(card);
    });
  }

  function copyProjectPromptToClipboard(projectTitle, projectSpecs) {
    const role = CAREER_DATA[state.selectedRole].title;
    const promptText = `I am preparing to land a role as a ${role}. 
I want to build this portfolio project: "${projectTitle}".
Project Scope: ${projectSpecs}

Please act as a Principal Staff Software Engineer & Technical Mentor.
Help me build this in 4 structured steps:
1. System Architecture & Tech Stack: Recommend the modern production stack, database schema, and API structure.
2. Step-by-Step Implementation Plan: Break this into 5 logical coding milestones with best practices.
3. Edge Cases & Production Considerations: What mistakes do juniors make with this type of project that I should avoid?
4. GitHub README & Resume Bullet Points: Provide 3 high-impact STAR-format resume bullet points with quantified metrics for this project.

Start by presenting Step 1 (Architecture & System Design).`;

    navigator.clipboard.writeText(promptText).then(() => {
      showToast('Copied ChatGPT Prompt! Paste into ChatGPT/Claude 🚀', '📋');
    }).catch(() => {
      showToast('Clipboard access denied, prompt logged to console.', '⚠️');
      console.log('AI Prompt:\n', promptText);
    });
  }

  // ==========================================================================
  // Weekly Study Pacing Schedule
  // ==========================================================================

  function renderSchedule(totalHours) {
    elements.scheduleSubtitle.textContent = `Calibrated for ${totalHours} hours per week of deliberate practice.`;
    elements.scheduleGrid.innerHTML = '';

    const days = [
      { name: 'Monday', pct: 0.12, task: 'Theory & Core Concepts Deep-Dive' },
      { name: 'Tuesday', pct: 0.12, task: 'Hands-on Coding & Documentation Exercises' },
      { name: 'Wednesday', pct: 0.12, task: 'Algorithmic Drills & Bug Debugging' },
      { name: 'Thursday', pct: 0.12, task: 'Component / Model Refactoring' },
      { name: 'Friday', pct: 0.12, task: 'Code Review, Notes & Technical Synthesis' },
      { name: 'Saturday', pct: 0.22, task: 'Deep Build: Portfolio Capstone Architecture' },
      { name: 'Sunday', pct: 0.18, task: 'Weekly Retrospective & Next Week Sprint Plan' }
    ];

    days.forEach(day => {
      const hours = (totalHours * day.pct).toFixed(1);
      const col = document.createElement('div');
      col.className = 'schedule-day-col';
      col.innerHTML = `
        <div class="schedule-day-name">${day.name}</div>
        <div class="schedule-hours-badge">${hours} hrs</div>
        <div class="schedule-focus-task">${day.task}</div>
      `;
      elements.scheduleGrid.appendChild(col);
    });
  }

  // ==========================================================================
  // Export & Share Functions
  // ==========================================================================

  function shareRoadmapLink() {
    updateUrlHash();
    const shareUrl = window.location.href;

    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Share link copied to clipboard! Anyone can open this prototype state.', '🔗');
    }).catch(() => {
      showToast('Copy URL manually from your address bar.', '📋');
    });
  }

  function updateUrlHash() {
    const params = new URLSearchParams();
    params.set('role', state.selectedRole);
    params.set('level', state.selectedLevel);
    params.set('timeline', state.timeline);
    params.set('hours', state.hoursPerWeek.toString());
    params.set('skills', Array.from(state.selectedSkills).join(','));
    window.location.hash = params.toString();
  }

  function loadFromUrlHash() {
    if (!window.location.hash || window.location.hash.length < 3) return;

    try {
      const hashStr = window.location.hash.substring(1);
      const params = new URLSearchParams(hashStr);

      if (params.has('role') && CAREER_DATA[params.get('role')]) {
        state.selectedRole = params.get('role');
        elements.roleSelect.value = state.selectedRole;
      }

      if (params.has('level')) {
        state.selectedLevel = params.get('level');
        elements.levelSelect.value = state.selectedLevel;
      }

      if (params.has('timeline')) {
        state.timeline = params.get('timeline');
        elements.timelineSelect.value = state.timeline;
      }

      if (params.has('hours')) {
        const h = parseInt(params.get('hours'), 10);
        if (!isNaN(h) && h >= 5 && h <= 40) {
          state.hoursPerWeek = h;
          elements.hoursSlider.value = h;
          elements.hoursBadge.textContent = `${h} hrs / week`;
        }
      }

      if (params.has('skills')) {
        const skillsList = params.get('skills').split(',').map(s => s.trim()).filter(Boolean);
        state.selectedSkills = new Set(skillsList);
      }
    } catch (e) {
      console.warn('Error parsing URL hash:', e);
    }
  }

  function exportMarkdownPlan() {
    const roleData = CAREER_DATA[state.selectedRole];
    if (!roleData) return;

    let md = `# PathForge AI: Personalized Career Blueprint\n\n`;
    md += `**Target Role:** ${roleData.title}\n`;
    md += `**Experience Level:** ${state.selectedLevel.toUpperCase()}\n`;
    md += `**Weekly Commitment:** ${state.hoursPerWeek} hrs/week\n`;
    md += `**Estimated US Market Compensation:** ${roleData.avgSalary}\n`;
    md += `**Skills Mastered:** ${Array.from(state.selectedSkills).join(', ') || 'None selected'}\n\n`;
    md += `---\n\n## Phased Learning Trajectory\n\n`;

    roleData.phases.forEach(p => {
      md += `### Phase ${p.phaseNumber}: ${p.title} (~${p.estimatedWeeks} Weeks)\n`;
      md += `${p.description}\n\n`;
      md += `**Milestones:**\n`;
      p.milestones.forEach(m => {
        const checked = state.completedMilestones.has(m.id) ? '[x]' : '[ ]';
        md += `- ${checked} **${m.title}** (Resource: ${m.resource})\n`;
      });
      md += `\n**Phase Capstone Project:** ${p.miniProject.title}\n`;
      md += `*Specs:* ${p.miniProject.specs}\n\n`;
    });

    md += `---\n*Generated by PathForge AI Prototype | Handshake AI Mission*\n`;

    // Trigger download of markdown file
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PathForge-${state.selectedRole}-Blueprint.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Downloaded Markdown Blueprint! 📝', '💾');
  }

  function saveStateLocally() {
    try {
      localStorage.setItem('pathforge_completed_milestones', JSON.stringify(Array.from(state.completedMilestones)));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // ==========================================================================
  // Toast Notifications
  // ==========================================================================

  function showToast(message, icon = '✨') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="font-size: 1.1rem;">${icon}</span>
      <span>${message}</span>
    `;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ==========================================================================
  // Lightweight Confetti Particle Canvas Animation
  // ==========================================================================

  function triggerConfetti(massive = false) {
    const canvas = elements.confettiCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = massive ? 120 : 50;
    const particles = [];
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() * 200 - 100),
        y: canvas.height * 0.4 + (Math.random() * 100 - 50),
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 14 - 3,
        gravity: 0.4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        alpha: 1
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach(p => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.015;

        if (p.alpha > 0) {
          active = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.5);
          ctx.restore();
        }
      });

      if (active) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    render();
  }

  // Start app
  document.addEventListener('DOMContentLoaded', init);

})();
