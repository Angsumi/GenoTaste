/* ==========================================================================
   GenoTaste - Interactive Genomic Wellness Tools Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCaffeineCalculator();
  initGenotypeDietMatcher();
  initGeneDecoderHub();
});

/* --------------------------------------------------------------------------
   1. CYP1A2 Caffeine Clearance & Bedtime Cut-Off Calculator
   -------------------------------------------------------------------------- */
function initCaffeineCalculator() {
  const caffeineForm = document.getElementById('caffeineCalcForm');
  if (!caffeineForm) return;

  const intakeInput = document.getElementById('caffeineIntake');
  const intakeVal = document.getElementById('caffeineIntakeVal');
  const timeInput = document.getElementById('intakeTime');
  const sleepInput = document.getElementById('sleepTime');
  const genotypeSelect = document.getElementById('genotypeSelect');

  const halfLifeEl = document.getElementById('calcHalfLife');
  const remainingEl = document.getElementById('calcRemaining');
  const cutoffEl = document.getElementById('calcCutoff');
  const sleepImpactScoreEl = document.getElementById('calcSleepScore');
  const sleepImpactStatusEl = document.getElementById('calcSleepStatus');
  const adviceEl = document.getElementById('calcAdvice');

  function calculateCaffeine() {
    const intake = parseFloat(intakeInput.value) || 150;
    intakeVal.textContent = `${intake} mg`;

    const genotype = genotypeSelect.value; // 'fast', 'intermediate', 'slow'
    let halfLife = 4.0; // hours default for fast

    if (genotype === 'slow') {
      halfLife = 9.0;
    } else if (genotype === 'intermediate') {
      halfLife = 6.0;
    } else {
      halfLife = 3.5;
    }

    // Time calculations
    const intakeHour = parseFloat(timeInput.value) || 9.0; // 9 AM
    const sleepHour = parseFloat(sleepInput.value) || 22.5; // 10:30 PM

    let hoursElapsed = sleepHour - intakeHour;
    if (hoursElapsed < 0) hoursElapsed += 24;

    // Remaining caffeine formula: N(t) = N0 * (0.5 ^ (t / t_half))
    const remaining = intake * Math.pow(0.5, hoursElapsed / halfLife);

    // Bedtime Cutoff calculation (Aim for <25mg caffeine at bedtime)
    // 25 = intake * (0.5 ^ (hoursNeeded / halfLife))
    // hoursNeeded = halfLife * log2(intake / 25)
    let hoursNeededBeforeSleep = 0;
    if (intake > 25) {
      hoursNeededBeforeSleep = halfLife * (Math.log(intake / 25) / Math.log(2));
    }

    let cutoffHour = sleepHour - hoursNeededBeforeSleep;
    if (cutoffHour < 0) cutoffHour += 24;

    // Format times into hh:mm AM/PM
    function formatTime(decimalHour) {
      let h = Math.floor(decimalHour);
      let m = Math.round((decimalHour - h) * 60);
      if (m === 60) { h += 1; m = 0; }
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      if (h === 0) h = 12;
      const mStr = m < 10 ? `0${m}` : `${m}`;
      return `${h}:${mStr} ${ampm}`;
    }

    halfLifeEl.textContent = `${halfLife.toFixed(1)} hrs`;
    remainingEl.textContent = `${remaining.toFixed(1)} mg`;
    cutoffEl.textContent = formatTime(cutoffHour);

    // Sleep Impact Score (0-100)
    // < 15mg remaining = Excellent (Score 90-100)
    // 15-35mg = Mild Disruption (Score 65-85)
    // 35-70mg = Moderate Disruption (Score 40-60)
    // > 70mg = High Sleep Risk (Score <40)
    let score = Math.max(10, Math.min(100, Math.round(100 - (remaining * 0.9))));
    sleepImpactScoreEl.textContent = `${score}/100`;

    if (remaining < 20) {
      sleepImpactStatusEl.textContent = "Optimal Sleep Clearance";
      sleepImpactStatusEl.className = "calc-status-badge status-good";
      adviceEl.textContent = `Your caffeine level at bedtime will be ~${remaining.toFixed(1)}mg, which is low enough to preserve restorative Stage N3 slow-wave deep sleep.`;
    } else if (remaining < 45) {
      sleepImpactStatusEl.textContent = "Mild Sleep Risk";
      sleepImpactStatusEl.className = "calc-status-badge status-warn";
      adviceEl.textContent = `You will have ~${remaining.toFixed(1)}mg caffeine in your blood at bedtime. For your ${genotype.toUpperCase()} CYP1A2 profile, consider shifting your last coffee to ${formatTime(cutoffHour)}.`;
    } else {
      sleepImpactStatusEl.textContent = "High Deep-Sleep Disruption Risk";
      sleepImpactStatusEl.className = "calc-status-badge status-danger";
      adviceEl.textContent = `Significant caffeine (~${remaining.toFixed(1)}mg) will linger in your systemic circulation at bedtime. This can block adenosine receptors, delaying sleep onset and reducing slow-wave sleep depth. Cut off caffeine by ${formatTime(cutoffHour)} or switch to L-theanine green tea.`;
    }
  }

  intakeInput.addEventListener('input', calculateCaffeine);
  timeInput.addEventListener('change', calculateCaffeine);
  sleepInput.addEventListener('change', calculateCaffeine);
  genotypeSelect.addEventListener('change', calculateCaffeine);

  calculateCaffeine();
}

/* --------------------------------------------------------------------------
   2. Genomic Macronutrient & Diet Matcher Tool
   -------------------------------------------------------------------------- */
function initGenotypeDietMatcher() {
  const matcherForm = document.getElementById('genotypeMatcherForm');
  if (!matcherForm) return;

  const ftoSelect = document.getElementById('ftoSelect');
  const apoeSelect = document.getElementById('apoeSelect');
  const ppargSelect = document.getElementById('ppargSelect');
  const actn3Select = document.getElementById('actn3Select');

  const carbBar = document.getElementById('barCarbs');
  const fatBar = document.getElementById('barFats');
  const proteinBar = document.getElementById('barProtein');

  const carbPctEl = document.getElementById('pctCarbs');
  const fatPctEl = document.getElementById('pctFats');
  const proteinPctEl = document.getElementById('pctProtein');

  const dietTitleEl = document.getElementById('matcherDietTitle');
  const dietBadgeEl = document.getElementById('matcherDietBadge');
  const dietSummaryEl = document.getElementById('matcherSummary');
  const warningsListEl = document.getElementById('matcherWarnings');

  function calculateMacros() {
    const fto = ftoSelect.value; // 'TT' (normal) or 'AA' (high appetite)
    const apoe = apoeSelect.value; // 'E3E3' or 'E4' (sat fat risk)
    const pparg = ppargSelect.value; // 'ProPro' or 'Ala' (insulin sensitive)
    const actn3 = actn3Select.value; // 'RR' (power) or 'XX' (endurance)

    let carbs = 40;
    let fats = 30;
    let protein = 30;
    let dietTitle = "Balanced Genomic Mediterranean Pattern";
    let dietBadge = "Optimal Baseline";
    let warnings = [];

    // FTO adjustment
    if (fto === 'AA') {
      protein += 5;
      carbs -= 5;
      warnings.push("FTO Appetite Variant: Higher protein (35%+) recommended to stimulate post-prandial ghrelin suppression and central satiety.");
    }

    // APOE adjustment
    if (apoe === 'E4') {
      fats -= 5;
      carbs += 5;
      dietTitle = "Low-Saturated-Fat Mediterranean Genomic Pattern";
      warnings.push("APOE4 Saturated Fat Hyper-Responder: Keep saturated fats <7% of total energy. Derived fats MUST come from EVOO, avocados, and omega-3 fish.");
    }

    // PPARG adjustment
    if (pparg === 'Ala') {
      carbs += 5;
      fats -= 5;
      warnings.push("PPARG Ala Variant: Superior peripheral insulin sensitivity; thrives on unrefined Mediterranean complex carbohydrates (legumes, oats, tubers).");
    }

    // ACTN3 adjustment
    if (actn3 === 'RR') {
      protein += 5;
      carbs += 5;
      fats -= 10;
      warnings.push("ACTN3 R/R Power Genotype: Higher muscular mechanical stress; ensure steady 30-40g protein distribution every 3-4 hours.");
    } else if (actn3 === 'XX') {
      warnings.push("ACTN3 X/X Endurance Profile: High metabolic endurance efficiency; pair workouts with post-exercise collagen and antioxidant polyphenols.");
    }

    // Normalize to 100%
    const total = carbs + fats + protein;
    carbs = Math.round((carbs / total) * 100);
    fats = Math.round((fats / total) * 100);
    protein = 100 - carbs - fats;

    carbPctEl.textContent = `${carbs}%`;
    fatPctEl.textContent = `${fats}%`;
    proteinPctEl.textContent = `${protein}%`;

    carbBar.style.width = `${carbs}%`;
    fatBar.style.width = `${fats}%`;
    proteinBar.style.width = `${protein}%`;

    dietTitleEl.textContent = dietTitle;
    dietBadgeEl.textContent = dietBadge;
    dietSummaryEl.textContent = `Based on your genomic profile (${fto}, ${apoe}, ${pparg}, ${actn3}), your calculated macronutrient split optimizes metabolic clearance, insulin response, and appetite signaling.`;

    warningsListEl.innerHTML = '';
    warnings.forEach(warn => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>•</strong> ${warn}`;
      warningsListEl.appendChild(li);
    });
  }

  ftoSelect.addEventListener('change', calculateMacros);
  apoeSelect.addEventListener('change', calculateMacros);
  ppargSelect.addEventListener('change', calculateMacros);
  actn3Select.addEventListener('change', calculateMacros);

  calculateMacros();
}

/* --------------------------------------------------------------------------
   3. Interactive Gene & Trait Decoder Hub
   -------------------------------------------------------------------------- */
function initGeneDecoderHub() {
  const searchInput = document.getElementById('hubSearchInput');
  const categoryBtns = document.querySelectorAll('.hub-filter-btn');
  const cards = document.querySelectorAll('.hub-item-card');

  if (!cards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function filterHub() {
    cards.forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const category = card.getAttribute('data-category') || '';

      const matchesSearch = title.includes(searchQuery) || tags.includes(searchQuery);
      const matchesCategory = currentCategory === 'all' || category === currentCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterHub();
    });
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      filterHub();
    });
  });
}
