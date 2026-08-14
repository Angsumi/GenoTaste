/* ==========================================================================
   GenoTaste - Modern Genomic Wellness Landing Page Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar & Navbar Scroll State
  const progressBar = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // 3. Question Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const questionCards = document.querySelectorAll('.question-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      questionCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // 4. Question Drawer Modal Details Data & Modal Logic
  const questionData = {
    weight: {
      tag: "Body & Weight",
      quote: "“Eating well. Exercising. Still not seeing the change you expect?”",
      desc: "Individual biological variation strongly influences macronutrient response, metabolic efficiency, and fat utilization pathways. A single uniform diet plan fails because people process fats, carbs, and proteins differently.",
      insight: "Genomic wellness reports provide context on your individual tendencies regarding lipid metabolism, insulin sensitivity markers, and satiety signals. GenoTaste prioritizes which dietary adjustments make sense for your lifestyle.",
      action: "Identify personalized macronutrient ratios rather than following trend diets."
    },
    fatigue: {
      tag: "Fatigue & Energy",
      quote: "“Always tired—and wondering why despite sleeping 8 hours?”",
      desc: "Persistent fatigue is often blamed on stress, but cellular energy production, B-vitamin methylation pathways (such as MTHFR variants), and vitamin D absorption pathways play key biological roles.",
      insight: "GenoTaste helps map genetic nutrient transport associations to evaluate if your body requires specific active forms of nutrients or lifestyle pacing adjustments.",
      action: "Review targeted nutrient pathways with structured wellness recommendations."
    },
    fitness: {
      tag: "Fitness & Recovery",
      quote: "“Same workout. Different results. Why?”",
      desc: "Muscle fiber type ratios (endurance vs explosive power), lactate clearance capacity, and collagen turnover vary significantly from person to person based on genetic predisposition.",
      insight: "Training against your biological strengths leads to quick burnout or injury. GenoTaste helps connect exercise response findings with optimized recovery intervals.",
      action: "Tailor workout intensity and recovery windows to match your physiological speed."
    },
    caffeine: {
      tag: "Sleep & Rhythms",
      quote: "“Coffee at 10 PM? Some people can. You can't.”",
      desc: "Caffeine metabolism is largely governed by the CYP1A2 enzyme in the liver. Fast metabolizers process caffeine quickly, while slow metabolizers experience elevated heart rate and sleep disruption even from morning coffee.",
      insight: "Understanding your CYP1A2 and adenosine receptor response stops the guesswork around afternoon fatigue, sleep architecture, and caffeine cut-off times.",
      action: "Set personalized caffeine intake windows and optimize evening sleep routines."
    },
    skin: {
      tag: "Appearance & Traits",
      quote: "“Why does my skin or hair seem to age or react differently?”",
      desc: "Antioxidant defense mechanisms (SOD2, GPX1 enzymes) and collagen breakdown rates influence skin elasticity and environmental stress response.",
      insight: "Genomic insights highlight your intrinsic collagen synthetic pathways and oxidative stress buffering capacity, aiding smarter topical and dietary choices.",
      action: "Focus on specific dietary antioxidants and protective routines matched to your skin traits."
    },
    preventive: {
      tag: "Preventive Wellness",
      quote: "“Healthy today. How do I personalize my long-term lifestyle choices?”",
      desc: "Proactive health is about understanding your baseline biological tendencies before imbalance occurs. Small, personalized lifestyle shifts compound over decades.",
      insight: "GenoTaste creates a Personal Genomic Wellness Blueprint that identifies your top 3-5 high-leverage habits for lifelong vitality.",
      action: "Build an actionable, sustainable 5-year personal health blueprint."
    },
    confusion: {
      tag: "Report Confusion",
      quote: "“I spent money on a DNA test. What does any of this 80-page PDF mean?”",
      desc: "Raw reports list hundreds of technical SNP codes, risk variants, and contradictory findings, causing severe information overload or unnecessary alarm.",
      insight: "GenoTaste acts as your human interpreter, translating complex genetic data into plain English, filtering out noise, and highlighting what actually matters.",
      action: "Schedule a Report Clarity Session to convert your PDF into clear, prioritized action steps."
    }
  };

  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerContent = document.getElementById('drawerContent');
  const drawerClose = document.getElementById('drawerClose');
  const drawerTag = document.getElementById('drawerTag');
  const drawerQuote = document.getElementById('drawerQuote');
  const drawerDesc = document.getElementById('drawerDesc');
  const drawerInsight = document.getElementById('drawerInsight');
  const drawerAction = document.getElementById('drawerAction');

  questionCards.forEach(card => {
    card.addEventListener('click', () => {
      const qKey = card.getAttribute('data-question');
      const data = questionData[qKey];
      if (data && drawerOverlay && drawerContent) {
        drawerTag.textContent = data.tag;
        drawerQuote.textContent = data.quote;
        drawerDesc.textContent = data.desc;
        drawerInsight.textContent = data.insight;
        drawerAction.textContent = data.action;

        drawerOverlay.classList.add('active');
        drawerContent.classList.add('active');
      }
    });
  });

  if (drawerClose && drawerOverlay) {
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  function closeDrawer() {
    if (drawerOverlay && drawerContent) {
      drawerOverlay.classList.remove('active');
      drawerContent.classList.remove('active');
    }
  }

  // 5. Booking Action Logic (Redirects to WhatsApp Link)
  const bookBtns = document.querySelectorAll('.trigger-booking');

  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Direct navigation to WhatsApp link
      window.open('https://wa.link/51ls4u', '_blank');
    });
  });

  if (modalClose && bookingModal) {
    modalClose.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
      }
    });
  }

  // Form Submission simulation
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      bookingForm.style.display = 'none';
      if (bookingSuccess) {
        bookingSuccess.style.display = 'block';
      }
    });
  }

  // 6. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Quiz Recommender Modal Logic
  const quizModal = document.getElementById('quizModal');
  const quizTrigger = document.getElementById('quizTrigger');
  const quizClose = document.getElementById('quizClose');
  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');

  if (quizTrigger && quizModal) {
    quizTrigger.addEventListener('click', () => {
      quizModal.classList.add('active');
    });
  }

  if (quizClose && quizModal) {
    quizClose.addEventListener('click', () => {
      quizModal.classList.remove('active');
    });
  }

  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedGoal = document.querySelector('input[name="quizGoal"]:checked')?.value || 'clarity';
      
      quizForm.style.display = 'none';
      if (quizResult) {
        quizResult.style.display = 'block';
        const recText = document.getElementById('quizRecText');
        const recPkgBtn = document.getElementById('quizBookRecBtn');

        if (selectedGoal === 'clarity') {
          recText.textContent = "We recommend the GenoTaste Report Clarity Session. It focuses on breaking down your 80-page PDF into actionable priorities.";
          recPkgBtn.setAttribute('data-package', 'GenoTaste Report Clarity Session');
        } else if (selectedGoal === 'plan') {
          recText.textContent = "We recommend the GenoTaste Personal Wellness Blueprint. You will receive a structured 30-day nutrition and lifestyle plan based on your report.";
          recPkgBtn.setAttribute('data-package', 'GenoTaste Personal Wellness Blueprint');
        } else {
          recText.textContent = "We recommend the GenoTaste Complete Guidance & Follow-Up. This provides long-term accountability, review, and habit refinement.";
          recPkgBtn.setAttribute('data-package', 'GenoTaste Complete Guidance & Follow-Up');
        }
      }
    });
  }
});
