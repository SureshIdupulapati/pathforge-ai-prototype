/**
 * PathForge AI - Interactive Application Logic (v2.0)
 * Designed to match the 7 reference product screenshots
 */

(function () {
  'use strict';

  // Application State
  const state = {
    currentTab: 'start',
    selectedRole: 'ai_ml',
    selectedLevel: 'student',
    timeline: '6_months',
    hoursPerWeek: 15,
    selectedSkills: new Set(["Python", "NumPy & Pandas", "Linear Algebra & Calculus"]),
    completedMilestones: new Set(["aiml-1", "aiml-2", "aiml-3", "aiml-4"]), // 4 completed for default demo
    selectedProjectIndex: 1, // Index 1 is Project 2 of 3 (Enterprise Legal Document Intelligence & RAG Chatbot)
    customSkills: [],
    theme: localStorage.getItem('pathforge_theme') || 'light'
  };

  // DOM Elements Cache
  const elements = {
    // Navigation
    navTabsList: document.getElementById('nav-tabs-list'),
    navRoleDropdown: document.getElementById('nav-role-dropdown'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    navBuildBtn: document.getElementById('nav-build-btn'),

    // Tab 1: Start
    tabStart: document.getElementById('tab-start'),
    startBuildCta: document.getElementById('start-build-cta'),
    startExampleCta: document.getElementById('start-example-cta'),
    startHeroScore: document.getElementById('start-hero-score'),
    startHeroStatus: document.getElementById('start-hero-status'),
    startHeroDesc: document.getElementById('start-hero-desc'),
    startStatSalary: document.getElementById('start-stat-salary'),
    startStatTime: document.getElementById('start-stat-time'),
    startStatTimeSub: document.getElementById('start-stat-time-sub'),
    startStatGaps: document.getElementById('start-stat-gaps'),

    // Tab 2: Profile
    tabProfile: document.getElementById('tab-profile'),
    profileRoleCardsGrid: document.getElementById('profile-role-cards-grid'),
    levelTabsGroup: document.getElementById('level-tabs-group'),
    timelineOptionsList: document.getElementById('timeline-options-list'),
    profileHoursText: document.getElementById('profile-hours-text'),
    profileHoursSlider: document.getElementById('profile-hours-slider'),
    profileHoursDailyCalc: document.getElementById('profile-hours-daily-calc'),
    profileCustomSkillInput: document.getElementById('profile-custom-skill-input'),
    profileAddSkillBtn: document.getElementById('profile-add-skill-btn'),
    profileSkillsChipsWrapper: document.getElementById('profile-skills-chips-wrapper'),
    previewRoleTitle: document.getElementById('preview-role-title'),
    previewScoreVal: document.getElementById('preview-score-val'),
    previewProgressBar: document.getElementById('preview-progress-bar'),
    previewMetricSkills: document.getElementById('preview-metric-skills'),
    previewMetricGaps: document.getElementById('preview-metric-gaps'),
    previewMetricPace: document.getElementById('preview-metric-pace'),
    previewMetricFinish: document.getElementById('preview-metric-finish'),
    profileGenerateBtn: document.getElementById('profile-generate-btn'),

    // Tab 3: Results
    tabResults: document.getElementById('tab-results'),
    resultsPageTitle: document.getElementById('results-page-title'),
    resultsPageSubtitle: document.getElementById('results-page-subtitle'),
    resultsEditProfileBtn: document.getElementById('results-edit-profile-btn'),
    resultsScoreNum: document.getElementById('results-score-num'),
    resultsScoreTier: document.getElementById('results-score-tier'),
    resultsScoreDesc: document.getElementById('results-score-desc'),
    routeTrackFill: document.getElementById('route-track-fill'),
    routeMarkerYou: document.getElementById('route-marker-you'),
    resultsSalaryVal: document.getElementById('results-salary-val'),
    resultsSalaryNote: document.getElementById('results-salary-note'),
    resultsFinishVal: document.getElementById('results-finish-val'),
    resultsFinishNote: document.getElementById('results-finish-note'),
    resultsGapsVal: document.getElementById('results-gaps-val'),
    resultsGapsNote: document.getElementById('results-gaps-note'),
    matrixCountHave: document.getElementById('matrix-count-have'),
    matrixListHave: document.getElementById('matrix-list-have'),
    matrixCountMissing: document.getElementById('matrix-count-missing'),
    matrixListMissing: document.getElementById('matrix-list-missing'),
    matrixCountBonus: document.getElementById('matrix-count-bonus'),
    matrixListBonus: document.getElementById('matrix-list-bonus'),

    // Tab 4: Roadmap
    tabRoadmap: document.getElementById('tab-roadmap'),
    roadmapSubLead: document.getElementById('roadmap-sub-lead'),
    roadmapCompletedText: document.getElementById('roadmap-completed-text'),
    roadmapCompletedBar: document.getElementById('roadmap-completed-bar'),
    roadmapCompletedPhaseStatus: document.getElementById('roadmap-completed-phase-status'),
    roadmapPhasesNav: document.getElementById('roadmap-phases-nav'),
    roadmapPhasesList: document.getElementById('roadmap-phases-list'),

    // Tab 5: Projects
    tabProjects: document.getElementById('tab-projects'),
    projectsListContainer: document.getElementById('projects-list-container'),
    aiPromptTextBox: document.getElementById('ai-prompt-text-box'),
    projectsCopyPromptBtn: document.getElementById('projects-copy-prompt-btn'),

    // Tab 6: Weekly Plan
    tabWeekly: document.getElementById('tab-weekly'),
    weeklyPageTitle: document.getElementById('weekly-page-title'),
    weeklyChartContainer: document.getElementById('weekly-chart-container'),
    shareUrlSnippet: document.getElementById('share-url-snippet'),
    weeklyCopyShareBtn: document.getElementById('weekly-copy-share-btn'),
    weeklyExportMdBtn: document.getElementById('weekly-export-md-btn'),
    weeklyPrintBtn: document.getElementById('weekly-print-btn'),

    // Notifications
    toastContainer: document.getElementById('toast-container')
  };

  // ==========================================================================
  // Initialization
  // ==========================================================================

  function init() {
    setupTheme();
    loadFromUrlHash();
    setupEventListeners();

    renderRoleCards();
    renderSkillChips();
    refreshCalculations();
    renderProjectsLab();
    renderWeeklyChart();

    // Check URL tab parameter or hash
    if (window.location.hash.includes('tab=')) {
      const match = window.location.hash.match(/tab=([a-z_-]+)/);
      if (match && match[1]) {
        switchTab(match[1]);
      }
    }
  }

  // ==========================================================================
  // Theme Management
  // ==========================================================================

  function setupTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('pathforge_theme', state.theme);
    updateThemeIcon();
    showToast(`Switched to ${state.theme} mode`, '🎨');
  }

  function updateThemeIcon() {
    if (elements.themeIcon) {
      elements.themeIcon.textContent = state.theme === 'light' ? '🌙' : '☀️';
    }
  }

  // ==========================================================================
  // Tab Navigation Engine
  // ==========================================================================

  function switchTab(tabName) {
    const validTabs = ['start', 'profile', 'results', 'roadmap', 'projects', 'weekly'];
    if (!validTabs.includes(tabName)) tabName = 'start';

    state.currentTab = tabName;

    // Update Nav Buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    // Update Tab Sections
    document.querySelectorAll('.page-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSec = document.getElementById(`tab-${tabName}`);
    if (targetSec) {
      targetSec.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateUrlHash();
  }

  // ==========================================================================
  // Event Listeners
  // ==========================================================================

  function setupEventListeners() {
    // Nav Tabs clicks
    elements.navTabsList.addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-tab-btn');
      if (btn) {
        switchTab(btn.getAttribute('data-tab'));
      }
    });

    // Theme Toggle
    elements.themeToggleBtn.addEventListener('click', toggleTheme);

    // Nav CTA: Build my roadmap
    elements.navBuildBtn.addEventListener('click', () => {
      switchTab('profile');
    });

    // Nav Role Dropdown
    elements.navRoleDropdown.value = state.selectedRole;
    elements.navRoleDropdown.addEventListener('change', (e) => {
      setRole(e.target.value);
    });

    // Start Tab: Build my roadmap CTA
    elements.startBuildCta.addEventListener('click', () => {
      switchTab('profile');
    });

    // Start Tab: See an example CTA
    elements.startExampleCta.addEventListener('click', () => {
      applyPreset(0);
      switchTab('results');
    });

    // Start Tab: Preset Rows
    document.querySelectorAll('.start-preset-row').forEach(row => {
      row.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-preset'), 10);
        applyPreset(idx);
        switchTab('results');
      });
    });

    // Profile: Level Tabs
    elements.levelTabsGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.level-tab-btn');
      if (btn) {
        document.querySelectorAll('.level-tab-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.selectedLevel = btn.getAttribute('data-level');
        refreshCalculations();
      }
    });

    // Profile: Timeline Options
    elements.timelineOptionsList.addEventListener('click', (e) => {
      const item = e.target.closest('.timeline-option-item');
      if (item) {
        document.querySelectorAll('.timeline-option-item').forEach(b => b.classList.remove('selected'));
        item.classList.add('selected');
        state.timeline = item.getAttribute('data-timeline');
        refreshCalculations();
      }
    });

    // Profile: Hours Slider
    elements.profileHoursSlider.addEventListener('input', function () {
      state.hoursPerWeek = parseInt(this.value, 10);
      elements.profileHoursText.innerHTML = `${state.hoursPerWeek} <span style="font-size:1.5rem; font-weight:700;">hours a week</span>`;
      
      const daily = (state.hoursPerWeek / 7).toFixed(1);
      elements.profileHoursDailyCalc.textContent = `About ${daily} hours a day. Balanced pace for most students and working people.`;
      
      refreshCalculations();
      renderWeeklyChart();
    });

    // Profile: Add Custom Skill
    elements.profileAddSkillBtn.addEventListener('click', addCustomSkill);
    elements.profileCustomSkillInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addCustomSkill();
      }
    });

    // Profile: Generate Roadmap CTA
    elements.profileGenerateBtn.addEventListener('click', () => {
      refreshCalculations();
      switchTab('results');
      showToast('Roadmap generated successfully!', '🎯');
    });

    // Results: Edit Profile CTA
    elements.resultsEditProfileBtn.addEventListener('click', () => {
      switchTab('profile');
    });

    // Projects: Copy Prompt Button
    elements.projectsCopyPromptBtn.addEventListener('click', copyAiPrompt);

    // Weekly Plan: Action Buttons
    elements.weeklyCopyShareBtn.addEventListener('click', copyShareLink);
    elements.weeklyExportMdBtn.addEventListener('click', exportMarkdownPlan);
    elements.weeklyPrintBtn.addEventListener('click', () => window.print());
  }

  // ==========================================================================
  // Role & Presets Management
  // ==========================================================================

  function setRole(roleId) {
    if (!CAREER_DATA[roleId]) return;
    state.selectedRole = roleId;
    elements.navRoleDropdown.value = roleId;

    // Reset default skills to first 3 skills of this role to match demo state
    const roleData = CAREER_DATA[roleId];
    state.selectedSkills = new Set(roleData.requiredSkills.slice(0, 3).map(s => s.name));
    state.completedMilestones.clear();

    renderRoleCards();
    renderSkillChips();
    refreshCalculations();
    renderProjectsLab();
    renderWeeklyChart();
    showToast(`Switched track to ${roleData.title}`, '🚀');
  }

  function applyPreset(index) {
    if (!PRESET_PROFILES[index]) return;
    const p = PRESET_PROFILES[index];

    state.selectedRole = p.roleId;
    elements.navRoleDropdown.value = p.roleId;
    state.selectedLevel = p.level;
    state.hoursPerWeek = p.hours;
    state.timeline = p.timeline;
    state.selectedSkills = new Set(p.skills);

    // Sync form controls
    elements.profileHoursSlider.value = p.hours;
    elements.profileHoursText.innerHTML = `${p.hours} <span style="font-size:1.5rem; font-weight:700;">hours a week</span>`;
    
    document.querySelectorAll('.level-tab-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-level') === p.level);
    });

    document.querySelectorAll('.timeline-option-item').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-timeline') === p.timeline);
    });

    renderRoleCards();
    renderSkillChips();
    refreshCalculations();
    renderProjectsLab();
    renderWeeklyChart();
    showToast(`Loaded example: ${p.name}`, '⚡');
  }

  function renderRoleCards() {
    const container = elements.profileRoleCardsGrid;
    container.innerHTML = '';

    Object.keys(CAREER_DATA).forEach(roleKey => {
      const role = CAREER_DATA[roleKey];
      const isSelected = roleKey === state.selectedRole;

      const card = document.createElement('div');
      card.className = `role-card-item ${isSelected ? 'selected' : ''}`;
      card.setAttribute('data-role', roleKey);
      card.innerHTML = `
        <div class="role-card-info">
          <h4>${role.title}</h4>
          <div class="role-card-salary">${role.avgSalary} a year</div>
        </div>
        <div class="role-radio-circle">
          ${isSelected ? '✓' : ''}
        </div>
      `;

      card.addEventListener('click', () => {
        setRole(roleKey);
      });

      container.appendChild(card);
    });
  }

  function renderSkillChips() {
    const container = elements.profileSkillsChipsWrapper;
    container.innerHTML = '';

    const role = CAREER_DATA[state.selectedRole];
    if (!role) return;

    // Required skills
    role.requiredSkills.forEach(s => {
      const isSelected = state.selectedSkills.has(s.name);
      const pill = createSkillPill(s.name, s.category, isSelected);
      container.appendChild(pill);
    });

    // Custom skills
    state.customSkills.forEach(customName => {
      const isSelected = state.selectedSkills.has(customName);
      const pill = createSkillPill(customName, 'Custom', isSelected);
      container.appendChild(pill);
    });
  }

  function createSkillPill(name, category, isSelected) {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `skill-tag-pill ${isSelected ? 'selected' : ''}`;
    pill.innerHTML = `
      ${isSelected ? '✓ ' : ''}<span>${name}</span>
      <span class="skill-tag-category">${category}</span>
    `;

    pill.addEventListener('click', () => {
      if (state.selectedSkills.has(name)) {
        state.selectedSkills.delete(name);
      } else {
        state.selectedSkills.add(name);
      }
      renderSkillChips();
      refreshCalculations();
    });

    return pill;
  }

  function addCustomSkill() {
    const val = elements.profileCustomSkillInput.value.trim();
    if (!val) return;

    if (!state.customSkills.includes(val)) {
      state.customSkills.push(val);
      state.selectedSkills.add(val);
      elements.profileCustomSkillInput.value = '';
      renderSkillChips();
      refreshCalculations();
      showToast(`Added custom skill: ${val}`, '💡');
    }
  }

  // ==========================================================================
  // Core Calculations & Visual Synchronization
  // ==========================================================================

  function refreshCalculations() {
    const role = CAREER_DATA[state.selectedRole];
    if (!role) return;

    // 1. Math: Total Required vs Mastered
    const totalRequired = role.requiredSkills.length;
    const mastered = [];
    const missing = [];
    const bonus = [];

    role.requiredSkills.forEach(req => {
      if (state.selectedSkills.has(req.name)) {
        mastered.push(req);
      } else {
        if (req.priority === 'Bonus') {
          bonus.push(req);
        } else {
          missing.push(req);
        }
      }
    });

    state.customSkills.forEach(cs => {
      if (state.selectedSkills.has(cs)) {
        mastered.push({ name: cs, category: 'Custom', priority: 'Differentiator' });
      }
    });

    const matchPct = Math.min(100, Math.round((mastered.length / totalRequired) * 100));
    const gapsCount = missing.length;

    // 2. Duration / Weeks calculation (calibrated to 15h standard)
    const totalBaseWeeks = role.phases.reduce((sum, p) => sum + p.estimatedWeeks, 0);
    const paceMultiplier = 15 / state.hoursPerWeek;
    const estimatedWeeks = Math.max(4, Math.round(totalBaseWeeks * paceMultiplier));

    const today = new Date();
    const finishDate = new Date();
    finishDate.setDate(today.getDate() + estimatedWeeks * 7);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const finishDateStr = `${months[finishDate.getMonth()]} ${finishDate.getFullYear()}`;

    // 3. Update Start Hero Card (Tab 1)
    elements.startHeroScore.textContent = `${matchPct}%`;
    elements.startHeroDesc.textContent = `${mastered.length} of ${totalRequired} skills match. A clear path is mapped from here.`;
    elements.startStatSalary.textContent = role.avgSalary.replace(' - ', ' to ');
    elements.startStatTime.textContent = `${estimatedWeeks} weeks`;
    elements.startStatTimeSub.textContent = `at ${state.hoursPerWeek} hrs a week`;
    elements.startStatGaps.textContent = `${gapsCount} gaps`;

    // 4. Update Profile Live Preview Card (Tab 2)
    elements.previewRoleTitle.textContent = role.title;
    elements.previewScoreVal.textContent = `${matchPct}%`;
    elements.previewProgressBar.style.width = `${matchPct}%`;
    elements.previewMetricSkills.textContent = `${mastered.length} of ${totalRequired}`;
    elements.previewMetricGaps.textContent = `${gapsCount} skills`;
    elements.previewMetricPace.textContent = `${state.hoursPerWeek} hrs a week`;
    elements.previewMetricFinish.textContent = `${finishDateStr} (${estimatedWeeks} weeks)`;

    // 5. Update Results Page (Tab 3)
    elements.resultsPageTitle.textContent = `Your route to ${role.title}`;
    elements.resultsPageSubtitle.textContent = `You have ${mastered.length} of ${totalRequired} required skills. ${gapsCount} gaps stand between you and interview-ready.`;
    elements.resultsScoreNum.textContent = `${matchPct}%`;
    elements.routeTrackFill.style.width = `${matchPct}%`;
    elements.routeMarkerYou.style.left = `${matchPct}%`;

    elements.resultsSalaryVal.textContent = role.avgSalary.replace(' - ', ' to ');
    elements.resultsFinishVal.textContent = finishDateStr;
    elements.resultsFinishNote.textContent = `${estimatedWeeks} weeks at ${state.hoursPerWeek} hrs a week`;
    elements.resultsGapsVal.textContent = `${gapsCount} skills`;
    elements.resultsGapsNote.textContent = `${mastered.length} mastered, ${bonus.length} bonus skills`;

    // Tier Label
    if (matchPct >= 70) {
      elements.resultsScoreTier.textContent = 'Job-ready trajectory 🚀';
    } else if (matchPct >= 40) {
      elements.resultsScoreTier.textContent = 'Intermediate foundation ⚡';
    } else {
      elements.resultsScoreTier.textContent = 'Accelerated transition';
    }

    // Render Matrix Columns (Tab 3)
    renderMatrixColumns(mastered, missing, bonus);

    // 6. Update Roadmap Page (Tab 4)
    renderRoadmapPhases(role, paceMultiplier);

    // 7. Update Weekly Plan Tab (Tab 6)
    elements.weeklyPageTitle.textContent = `Your week, ${state.hoursPerWeek} hours`;

    // 8. Update Share Snippet Text
    const snippet = `pathforge.app/#role=${state.selectedRole}&level=${state.selectedLevel}&hours=${state.hoursPerWeek}`;
    elements.shareUrlSnippet.textContent = snippet;

    updateUrlHash();
  }

  function renderMatrixColumns(mastered, missing, bonus) {
    elements.matrixCountHave.textContent = mastered.length;
    elements.matrixCountMissing.textContent = missing.length;
    elements.matrixCountBonus.textContent = bonus.length;

    // Col 1: You have
    elements.matrixListHave.innerHTML = mastered.map(s => `
      <div class="matrix-item-row">
        <div class="matrix-item-title">&bull; ${s.name}</div>
        <span class="matrix-badge badge-black">${s.category || 'Skill'}</span>
      </div>
    `).join('') || '<div style="font-size:0.8rem; color:var(--text-dim);">No skills selected yet.</div>';

    // Col 2: Learn these first
    elements.matrixListMissing.innerHTML = missing.map(s => {
      const badgeClass = s.priority === 'Must-Have' ? 'badge-must-have' : 'badge-high';
      return `
        <div class="matrix-item-row">
          <div class="matrix-item-title" style="color: #b45309;">&bull; <span style="color: var(--text-main);">${s.name}</span></div>
          <span class="matrix-badge ${badgeClass}">${s.priority}</span>
        </div>
      `;
    }).join('') || '<div style="font-size:0.8rem; color:var(--text-dim);">All core skills covered! 🎉</div>';

    // Col 3: Set you apart
    elements.matrixListBonus.innerHTML = bonus.map(s => {
      const badgeClass = s.category === 'MLOps' ? 'badge-mlops' : 'badge-advanced';
      return `
        <div class="matrix-item-row">
          <div class="matrix-item-title" style="color: #059669;">&bull; <span style="color: var(--text-main);">${s.name}</span></div>
          <span class="matrix-badge ${badgeClass}">${s.category || 'Bonus'}</span>
        </div>
      `;
    }).join('') || '<div style="font-size:0.8rem; color:var(--text-dim);">Core requirements prioritized.</div>';
  }

  // ==========================================================================
  // Roadmap & Milestones Rendering (Tab 4) - Matching Picture 5
  // ==========================================================================

  function renderRoadmapPhases(role, paceMultiplier) {
    const listContainer = elements.roadmapPhasesList;
    const navContainer = elements.roadmapPhasesNav;
    listContainer.innerHTML = '';
    navContainer.innerHTML = '';

    let totalMilestones = 0;
    let completedCount = 0;

    role.phases.forEach((phase, idx) => {
      totalMilestones += phase.milestones.length;
      const phaseNum = `0${phase.phaseNumber}`;
      const scaledWeeks = Math.max(1, Math.round(phase.estimatedWeeks * paceMultiplier));

      // Calculate how many completed in this phase
      const phaseCompleted = phase.milestones.filter(m => state.completedMilestones.has(m.id)).length;
      completedCount += phaseCompleted;
      const isPhaseComplete = phaseCompleted === phase.milestones.length;
      const isPhaseInProgress = phaseCompleted > 0 && !isPhaseComplete;

      // Left Nav Link
      const navLink = document.createElement('div');
      navLink.className = `roadmap-phase-link ${idx === 1 ? 'active' : ''}`;
      navLink.innerHTML = `
        <span>${phase.title.split(' ')[0]}</span>
        <span>${scaledWeeks} wks</span>
      `;
      navLink.addEventListener('click', () => {
        document.querySelectorAll('.roadmap-phase-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
        const block = document.getElementById(`phase-block-${phase.phaseNumber}`);
        if (block) block.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      navContainer.appendChild(navLink);

      // Status Chip
      let statusChipHtml = '';
      if (isPhaseComplete) {
        statusChipHtml = `<span class="phase-chip chip-status-done">Complete</span>`;
      } else if (isPhaseInProgress) {
        statusChipHtml = `<span class="phase-chip chip-status-prog">In progress</span>`;
      }

      // Milestones Checklist HTML
      const milestonesHtml = phase.milestones.map(m => {
        const isDone = state.completedMilestones.has(m.id);
        return `
          <div class="milestone-check-row ${isDone ? 'completed' : ''}" data-mid="${m.id}">
            <div class="milestone-check-box">
              ${isDone ? '✓' : ''}
            </div>
            <div class="milestone-content-block">
              <div class="milestone-name">${m.title}</div>
              <div class="milestone-meta-row">
                <span>${m.tag}</span>
                <span class="milestone-resource-link">📖 ${m.resource}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Phase Project Box
      const projectCard = `
        <div class="phase-project-box">
          <div>
            <div class="phase-project-lead">&blacktriangleright; Phase project, ${phase.miniProject.difficulty}</div>
            <div class="phase-project-title">${phase.miniProject.title}</div>
            <div class="phase-project-desc">${phase.miniProject.specs}</div>
          </div>
          <button type="button" class="btn-forest copy-phase-prompt-btn" data-title="${phase.miniProject.title}" data-specs="${phase.miniProject.specs}">
            📋 Copy AI prompt
          </button>
        </div>
      `;

      // Phase Block Element
      const phaseBlock = document.createElement('div');
      phaseBlock.className = 'phase-block';
      phaseBlock.id = `phase-block-${phase.phaseNumber}`;
      phaseBlock.innerHTML = `
        <div class="phase-number-giant ${idx === 1 ? 'accent' : ''}">${phaseNum}</div>
        <div class="phase-content">
          <div class="phase-title-row">${phase.title}</div>
          <div class="phase-badges-bar">
            <span class="phase-chip chip-duration">⏱️ About ${scaledWeeks} weeks</span>
            ${statusChipHtml}
          </div>
          <p class="phase-desc-text">${phase.description}</p>
          <div class="milestones-checklist-container">
            ${milestonesHtml}
          </div>
          ${projectCard}
        </div>
      `;

      // Checklist Toggle Events
      phaseBlock.querySelectorAll('.milestone-check-row').forEach(row => {
        row.addEventListener('click', () => {
          const mid = row.getAttribute('data-mid');
          if (state.completedMilestones.has(mid)) {
            state.completedMilestones.delete(mid);
          } else {
            state.completedMilestones.add(mid);
            showToast('Milestone checked! Progress updated.', '🎯');
          }
          refreshCalculations();
        });
      });

      // Copy Prompt Event
      phaseBlock.querySelector('.copy-phase-prompt-btn').addEventListener('click', (e) => {
        const title = e.currentTarget.getAttribute('data-title');
        const specs = e.currentTarget.getAttribute('data-specs');
        copyProjectSpecificPrompt(title, specs);
      });

      listContainer.appendChild(phaseBlock);
    });

    // Update Left Sticky Roadmap Card
    const pct = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;
    elements.roadmapCompletedText.textContent = `${completedCount} of ${totalMilestones} milestones`;
    elements.roadmapCompletedBar.style.width = `${pct}%`;
    elements.roadmapCompletedPhaseStatus.textContent = `${pct}% complete &bull; Phase ${completedCount >= 3 ? '2 in progress' : '1'}`;
  }

  // ==========================================================================
  // Portfolio Project Lab (Tab 5) - Matching Picture 1
  // ==========================================================================

  function renderProjectsLab() {
    const role = CAREER_DATA[state.selectedRole];
    if (!role) return;

    const container = elements.projectsListContainer;
    container.innerHTML = '';

    // We feature 3 portfolio projects from the role's phases
    const projects = role.phases.slice(1).map((p, idx) => ({
      index: idx,
      title: p.miniProject.title,
      difficulty: p.miniProject.difficulty,
      specs: p.miniProject.specs,
      ordinal: idx + 1
    }));

    projects.forEach((proj, idx) => {
      const isSelected = idx === state.selectedProjectIndex;
      let diffBadgeClass = 'badge-diff-intermediate';
      if (proj.difficulty.toLowerCase().includes('advanced')) diffBadgeClass = 'badge-diff-advanced';
      if (proj.difficulty.toLowerCase().includes('cap-stone') || proj.difficulty.toLowerCase().includes('capstone')) diffBadgeClass = 'badge-diff-capstone';

      const card = document.createElement('div');
      card.className = `project-select-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="project-card-top-bar">
          <div class="project-meta-badges">
            <span class="${diffBadgeClass}">${proj.difficulty}</span>
            <span class="project-ordinal-label">Portfolio project ${proj.ordinal} of 3</span>
          </div>
          <button type="button" class="project-card-select-btn">
            ${isSelected ? 'Selected' : 'Select'}
          </button>
        </div>

        <h3 class="project-item-title">${proj.title}</h3>
        <p class="project-item-desc">${proj.specs}</p>

        <div class="project-card-tags">
          <span class="project-tag-chip">${role.title}</span>
          <span class="project-tag-chip">GitHub showcase</span>
        </div>
      `;

      card.addEventListener('click', () => {
        state.selectedProjectIndex = idx;
        renderProjectsLab();
      });

      container.appendChild(card);
    });

    // Update Right AI Prompt Box
    updateAiPromptBox(projects[state.selectedProjectIndex] || projects[0]);
  }

  function updateAiPromptBox(activeProject) {
    const role = CAREER_DATA[state.selectedRole];
    if (!role || !activeProject) return;

    const promptText = `I am preparing to land a role as a ${role.title}.
I want to build this portfolio project: "${activeProject.title}".
Project scope: ${activeProject.specs}

Act as a principal engineer and technical mentor. Help me build this in 4 steps:
1. System architecture and tech stack: schema, API structure, production stack.
2. Step-by-step plan: 5 coding milestones with best practices.
3. Edge cases and production concerns: mistakes juniors make here.
4. README and resume: 3 STAR-format resume bullets with metrics.

Start with Step 1.`;

    elements.aiPromptTextBox.textContent = promptText;
  }

  function copyAiPrompt() {
    const text = elements.aiPromptTextBox.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied AI prompt to clipboard! Ready to paste into ChatGPT/Claude', '📋');
    }).catch(() => {
      showToast('Prompt ready in text box.', '📋');
    });
  }

  function copyProjectSpecificPrompt(title, specs) {
    const role = CAREER_DATA[state.selectedRole].title;
    const promptText = `I am preparing to land a role as a ${role}.
I want to build this portfolio project: "${title}".
Project scope: ${specs}

Act as a principal engineer and technical mentor. Help me build this in 4 steps:
1. System architecture and tech stack: schema, API structure, production stack.
2. Step-by-step plan: 5 coding milestones with best practices.
3. Edge cases and production concerns: mistakes juniors make here.
4. README and resume: 3 STAR-format resume bullets with metrics.

Start with Step 1.`;

    navigator.clipboard.writeText(promptText).then(() => {
      showToast(`Copied AI Prompt for "${title}"!`, '📋');
    }).catch(() => {
      showToast('Copied prompt to clipboard', '📋');
    });
  }

  // ==========================================================================
  // Weekly Plan Chart (Tab 6) - Matching Picture 6
  // ==========================================================================

  function renderWeeklyChart() {
    const container = elements.weeklyChartContainer;
    container.innerHTML = '';

    const totalHours = state.hoursPerWeek;

    // Daily distribution: Mon-Fri even, Sat deep build (tall gold), Sun retro
    const scheduleDays = [
      { name: 'Monday', pct: 0.12, task: 'Theory and core concepts deep-dive', isHighlight: false },
      { name: 'Tuesday', pct: 0.12, task: 'Hands-on coding and documentation exercises', isHighlight: false },
      { name: 'Wednesday', pct: 0.12, task: 'Algorithm drills and debugging', isHighlight: false },
      { name: 'Thursday', pct: 0.12, task: 'Component and model refactoring', isHighlight: false },
      { name: 'Friday', pct: 0.12, task: 'Code review, notes, and technical synthesis', isHighlight: false },
      { name: 'Saturday', pct: 0.22, task: 'Deep build: portfolio project architecture', isHighlight: true },
      { name: 'Sunday', pct: 0.18, task: 'Weekly retrospective and next-week sprint plan', isHighlight: false }
    ];

    scheduleDays.forEach(day => {
      const hours = (totalHours * day.pct).toFixed(1);
      // Scale height between 100px and 240px
      const heightPx = Math.round(80 + (parseFloat(hours) / (totalHours * 0.25)) * 140);

      const col = document.createElement('div');
      col.className = 'weekday-bar-col';
      col.innerHTML = `
        <div class="weekday-bar-block ${day.isHighlight ? 'highlight' : ''}" style="height: ${heightPx}px;">
          <div class="bar-hours-val">${hours}</div>
          <div class="bar-hours-lbl">hours</div>
        </div>
        <div class="weekday-meta-info">
          <div class="weekday-name">${day.name}</div>
          <div class="weekday-task-desc">${day.task}</div>
        </div>
      `;

      container.appendChild(col);
    });
  }

  // ==========================================================================
  // Export & Share Functions
  // ==========================================================================

  function copyShareLink() {
    updateUrlHash();
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Copied share link to clipboard! Anyone can open your exact plan.', '🔗');
    }).catch(() => {
      showToast('Copied link to clipboard.', '🔗');
    });
  }

  function exportMarkdownPlan() {
    const role = CAREER_DATA[state.selectedRole];
    if (!role) return;

    let md = `# PathForge AI: Personalized Career Roadmap\n\n`;
    md += `**Target Role:** ${role.title}\n`;
    md += `**Pace:** ${state.hoursPerWeek} hrs/week (${state.timeline})\n`;
    md += `**Market US Pay (2026):** ${role.avgSalary}\n\n`;
    md += `---\n\n## 4-Phase Curriculum\n\n`;

    role.phases.forEach(p => {
      md += `### Phase ${p.phaseNumber}: ${p.title} (~${p.estimatedWeeks} Weeks)\n`;
      md += `${p.description}\n\n`;
      p.milestones.forEach(m => {
        const checked = state.completedMilestones.has(m.id) ? '[x]' : '[ ]';
        md += `- ${checked} **${m.title}** (Resource: ${m.resource})\n`;
      });
      md += `\n**Phase Project:** ${p.miniProject.title}\n`;
      md += `*Specs:* ${p.miniProject.specs}\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PathForge-${state.selectedRole}-Roadmap.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Downloaded Markdown Blueprint!', '💾');
  }

  function updateUrlHash() {
    const params = new URLSearchParams();
    params.set('tab', state.currentTab);
    params.set('role', state.selectedRole);
    params.set('level', state.selectedLevel);
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
      }
      if (params.has('level')) {
        state.selectedLevel = params.get('level');
      }
      if (params.has('hours')) {
        const h = parseInt(params.get('hours'), 10);
        if (!isNaN(h) && h >= 5 && h <= 40) state.hoursPerWeek = h;
      }
      if (params.has('skills')) {
        const skillsList = params.get('skills').split(',').map(s => s.trim()).filter(Boolean);
        state.selectedSkills = new Set(skillsList);
      }
    } catch (e) {
      console.warn('URL parsing error:', e);
    }
  }

  function showToast(message, icon = '✨') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  // Run on ready
  document.addEventListener('DOMContentLoaded', init);

})();
