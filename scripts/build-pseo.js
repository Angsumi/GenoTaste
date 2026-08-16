const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');

// Load Data
const genes = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'genes.json'), 'utf8'));
const traits = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'traits.json'), 'utf8'));
const diets = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'diets.json'), 'utf8'));
const tools = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'tools.json'), 'utf8'));

// Helper to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Common Header Generator
function renderHeader(title, description, canonicalUrl, depth = 1) {
  const relPath = depth === 1 ? '../' : './';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | GenoTaste Genomic Wellness</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- OpenGraph / Social -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${relPath}Logo_GenoTaste.png">

  <!-- CSS Stylesheets -->
  <link rel="stylesheet" href="${relPath}styles.css">
</head>
<body>
  <!-- Scroll Progress -->
  <div class="scroll-progress-container"><div class="scroll-progress-bar" id="scrollProgress"></div></div>

  <!-- Navigation Bar -->
  <header class="navbar" id="navbar">
    <div class="container navbar-container">
      <a href="${relPath}index.html" class="brand-logo">
        <img src="${relPath}Logo_GenoTaste.png" alt="GenoTaste Logo" class="logo-img-nav">
        <div class="brand-text-group">
          <span class="brand-name">GenoTaste</span>
          <span class="brand-tagline-sm">NATURE • NURTURE • KNOWLEDGE</span>
        </div>
      </a>
      <nav>
        <ul class="nav-links">
          <li><a href="${relPath}index.html#process" class="nav-link">Our Process</a></li>
          <li><a href="${relPath}genes/index.html" class="nav-link">Gene Library</a></li>
          <li><a href="${relPath}traits/index.html" class="nav-link">Wellness Traits</a></li>
          <li><a href="${relPath}diets/index.html" class="nav-link">Diet Matcher</a></li>
          <li><a href="${relPath}tools/index.html" class="nav-link" style="color:var(--primary-gold); font-weight:700;">Interactive Tools</a></li>
          <li><a href="${relPath}index.html#packages" class="nav-link">Packages</a></li>
        </ul>
      </nav>
      <div class="nav-actions">
        <a href="https://wa.link/51ls4u" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Book a Consultation</a>
        <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </header>`;
}

// Common Footer Generator
function renderFooter(depth = 1) {
  const relPath = depth === 1 ? '../' : './';
  return `
  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand-title">GenoTaste</div>
          <p style="margin-bottom:1.5rem; max-width:320px;">Translating complex genomic reports into actionable, personalized lifestyle, nutrition, and wellness blueprints.</p>
          <p style="font-size:0.85rem; color:var(--primary-gold);">NATURE • NURTURE • KNOWLEDGE</p>
        </div>
        <div>
          <h4 style="color:#FFF; margin-bottom:1rem;">Programmatic SEO</h4>
          <ul class="footer-links">
            <li><a href="${relPath}genes/index.html">Gene Directory (12+)</a></li>
            <li><a href="${relPath}traits/index.html">Wellness Traits</a></li>
            <li><a href="${relPath}diets/index.html">Diet & Genotype Matchers</a></li>
            <li><a href="${relPath}tools/index.html">Interactive Tools Suite</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#FFF; margin-bottom:1rem;">Interactive Tools</h4>
          <ul class="footer-links">
            <li><a href="${relPath}tools/caffeine-calculator.html">Caffeine Cut-Off Calculator</a></li>
            <li><a href="${relPath}tools/genotype-diet-matcher.html">Genotype Diet Matcher</a></li>
            <li><a href="${relPath}tools/gene-decoder-hub.html">Gene Decoder Search Hub</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#FFF; margin-bottom:1rem;">GenoTaste Consults</h4>
          <p style="font-size:0.85rem; margin-bottom:1rem;">Have an 80-page DNA report from 23andMe or Ancestry? Let our genomic specialists decode it for you.</p>
          <a href="${relPath}index.html#packages" class="btn btn-primary" style="width:100%; text-align:center;">View Consultation Packages</a>
        </div>
      </div>
      <div class="footer-disclaimer">
        <p><strong>Non-Medical Disclaimer:</strong> GenoTaste provides educational genomic consulting and lifestyle prioritization. GenoTaste does not diagnose, treat, or cure medical conditions. Always consult a qualified medical physician before altering prescribed medications or therapeutic regimens.</p>
        <p style="margin-top:0.75rem;">© ${new Date().getFullYear()} GenoTaste Wellness Consulting. All Rights Reserved.</p>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="${relPath}app.js"></script>
  <script src="${relPath}tools.js"></script>
</body>
</html>`;
}

// Build Gene HTML Pages
function buildGenePages() {
  const genesDir = path.join(ROOT_DIR, 'genes');
  ensureDir(genesDir);

  // 1. Gene Directory Index Page
  let indexHtml = renderHeader(
    "Gene & Variant Directory | Genomic Wellness Guides",
    "Explore GenoTaste's comprehensive genomic guides for CYP1A2, MTHFR, APOE, ACTN3, FTO, SOD2, FUT2, VDR, COMT, LCT, PPARG, and ADORA2A.",
    "https://genotaste.com/genes/index.html",
    1
  );

  indexHtml += `
  <section class="pseo-header">
    <div class="container">
      <div class="breadcrumb-container">
        <ul class="breadcrumbs">
          <li><a href="../index.html">Home</a></li>
          <li class="separator">/</li>
          <li>Gene Directory</li>
        </ul>
      </div>
      <span class="pseo-badge">Genomic Library</span>
      <h1 class="pseo-title">Genomic Wellness Gene Directory</h1>
      <p class="pseo-summary">Evidence-based biological explanations, variant impacts, and personalized nutrition strategies for key health and performance genes.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container">
      <div class="hub-grid">
        ${genes.map(g => `
          <div class="hub-item-card">
            <div>
              <span class="pseo-badge" style="margin-bottom:0.5rem;">${g.category}</span>
              <div class="hub-item-symbol">${g.symbol}</div>
              <div class="hub-item-name">${g.name}</div>
              <p class="hub-item-summary">${g.summary}</p>
            </div>
            <a href="${g.id}.html" class="hub-item-link">Read Full Gene Guide →</a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  indexHtml += renderFooter(1);
  fs.writeFileSync(path.join(genesDir, 'index.html'), indexHtml);

  // 2. Individual Gene Pages
  genes.forEach(gene => {
    let html = renderHeader(
      `${gene.symbol} Gene Guide (${gene.tag})`,
      `${gene.summary.slice(0, 155)}...`,
      `https://genotaste.com/genes/${gene.id}.html`,
      1
    );

    // Schema Markup JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": gene.symbol,
      "description": gene.summary,
      "inDefinedTermSet": "Genomic Wellness Database",
      "url": `https://genotaste.com/genes/${gene.id}.html`
    };

    html += `
    <script type="application/ld+json">
    ${JSON.stringify(jsonLd, null, 2)}
    </script>

    <section class="pseo-header">
      <div class="container">
        <div class="breadcrumb-container">
          <ul class="breadcrumbs">
            <li><a href="../index.html">Home</a></li>
            <li class="separator">/</li>
            <li><a href="index.html">Gene Directory</a></li>
            <li class="separator">/</li>
            <li>${gene.symbol}</li>
          </ul>
        </div>
        <span class="pseo-badge">${gene.category} • ${gene.tag}</span>
        <h1 class="pseo-title">${gene.symbol}: ${gene.name}</h1>
        <p class="pseo-summary">${gene.summary}</p>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="pseo-grid">
          <div>
            <!-- Biological Mechanism -->
            <div class="pseo-card">
              <h2 class="pseo-card-title">🧬 Biological Mechanism & Pathways</h2>
              <p style="font-size:1rem; line-height:1.7; color:var(--navy-slate);">${gene.biologicalMechanism}</p>
            </div>

            <!-- Variants Breakdown -->
            <div class="pseo-card">
              <h2 class="pseo-card-title">📊 Genotype Variants & Health Impact</h2>
              <div class="variant-grid">
                ${gene.variants.map(v => `
                  <div class="variant-box">
                    <div class="variant-genotype">
                      <span>${v.genotype}</span>
                      <span class="variant-freq">${v.frequency}</span>
                    </div>
                    <p class="variant-impact">${v.impact}</p>
                    <div class="variant-action">GenoTaste Recommendation: ${v.action}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Dietary Recommendations -->
            <div class="pseo-card">
              <h2 class="pseo-card-title">🥗 Key Dietary Adjustments</h2>
              <ul class="pseo-list">
                ${gene.dietaryRecommendations.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>

            <!-- Lifestyle Actions -->
            <div class="pseo-card">
              <h2 class="pseo-card-title">⚡ High-Leverage Lifestyle Actions</h2>
              <ul class="pseo-list">
                ${gene.lifestyleActions.map(l => `<li>${l}</li>`).join('')}
              </ul>
            </div>

            <!-- FAQs Accordion -->
            <div class="pseo-card">
              <h2 class="pseo-card-title">❓ Frequently Asked Questions</h2>
              <div class="faq-accordion">
                ${gene.faqs.map(f => `
                  <div style="margin-bottom:1.25rem;">
                    <h3 style="font-size:1.05rem; color:var(--deep-charcoal); margin-bottom:0.35rem;">${f.question}</h3>
                    <p style="font-size:0.95rem; color:var(--navy-slate); line-height:1.6;">${f.answer}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div>
            <div class="sidebar-box">
              <h3 class="sidebar-title">Interactive Tool</h3>
              <p style="font-size:0.85rem; color:var(--navy-slate); margin-bottom:1rem;">Calculate your personal response to ${gene.symbol} using our interactive tool.</p>
              <a href="../tools/index.html" class="btn btn-primary" style="width:100%; text-align:center; font-size:0.85rem;">Open Tools Suite</a>
            </div>

            <div class="sidebar-box">
              <h3 class="sidebar-title">Related Genes</h3>
              <ul class="sidebar-links">
                ${gene.relatedGenes.map(rgId => {
                  const rg = genes.find(g => g.id === rgId);
                  return rg ? `<li><a href="${rg.id}.html">${rg.symbol} (${rg.tag})</a></li>` : '';
                }).join('')}
              </ul>
            </div>

            <div class="sidebar-box">
              <h3 class="sidebar-title">Consultation</h3>
              <p style="font-size:0.85rem; color:var(--navy-slate); margin-bottom:1rem;">Translating your raw DNA data into prioritized actions.</p>
              <a href="../index.html#packages" class="btn btn-secondary" style="width:100%; text-align:center; font-size:0.85rem;">Book GenoTaste Consultation</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

    html += renderFooter(1);
    fs.writeFileSync(path.join(genesDir, `${gene.id}.html`), html);
  });
}

// Build Trait HTML Pages
function buildTraitPages() {
  const traitsDir = path.join(ROOT_DIR, 'traits');
  ensureDir(traitsDir);

  // 1. Directory Index
  let indexHtml = renderHeader(
    "Wellness Traits & Symptoms Guide",
    "Evidence-based wellness guides covering caffeine clearance, B-vitamin methylation, saturated fat response, muscle recovery, and sleep.",
    "https://genotaste.com/traits/index.html",
    1
  );

  indexHtml += `
  <section class="pseo-header">
    <div class="container">
      <div class="breadcrumb-container">
        <ul class="breadcrumbs">
          <li><a href="../index.html">Home</a></li>
          <li class="separator">/</li>
          <li>Wellness Traits</li>
        </ul>
      </div>
      <span class="pseo-badge">Trait Guides</span>
      <h1 class="pseo-title">Genomic Wellness Trait Library</h1>
      <p class="pseo-summary">Explore physiological traits and health goals governed by complex gene-environment interactions.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container">
      <div class="hub-grid">
        ${traits.map(t => `
          <div class="hub-item-card">
            <div>
              <span class="pseo-badge" style="margin-bottom:0.5rem;">${t.category}</span>
              <div class="hub-item-symbol">${t.tag}</div>
              <div class="hub-item-name">${t.title}</div>
              <p class="hub-item-summary">${t.summary}</p>
            </div>
            <a href="${t.id}.html" class="hub-item-link">Read Trait Guide →</a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  indexHtml += renderFooter(1);
  fs.writeFileSync(path.join(traitsDir, 'index.html'), indexHtml);

  // 2. Individual Trait Pages
  traits.forEach(trait => {
    let html = renderHeader(
      `${trait.title} | Genomic Trait Guide`,
      trait.summary,
      `https://genotaste.com/traits/${trait.id}.html`,
      1
    );

    html += `
    <section class="pseo-header">
      <div class="container">
        <div class="breadcrumb-container">
          <ul class="breadcrumbs">
            <li><a href="../index.html">Home</a></li>
            <li class="separator">/</li>
            <li><a href="index.html">Wellness Traits</a></li>
            <li class="separator">/</li>
            <li>${trait.tag}</li>
          </ul>
        </div>
        <span class="pseo-badge">${trait.category}</span>
        <h1 class="pseo-title">${trait.title}</h1>
        <p class="pseo-summary">${trait.summary}</p>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="pseo-grid">
          <div>
            <div class="pseo-card">
              <h2 class="pseo-card-title">💡 Core Key Takeaways</h2>
              <ul class="pseo-list">
                ${trait.keyTakeaways.map(k => `<li>${k}</li>`).join('')}
              </ul>
            </div>

            <div class="pseo-card">
              <h2 class="pseo-card-title">🧬 Biological Mechanism & Pathways</h2>
              <p style="font-size:1rem; line-height:1.7; color:var(--navy-slate);">${trait.biologicalOverview}</p>
            </div>

            <div class="pseo-card">
              <h2 class="pseo-card-title">🎯 Actionable Action Steps</h2>
              <ul class="pseo-list">
                ${trait.actionSteps.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div>
            <div class="sidebar-box">
              <h3 class="sidebar-title">Associated Genes</h3>
              <ul class="sidebar-links">
                ${trait.associatedGenes.map(gId => {
                  const g = genes.find(x => x.id === gId);
                  return g ? `<li><a href="../genes/${g.id}.html">${g.symbol} (${g.tag})</a></li>` : '';
                }).join('')}
              </ul>
            </div>

            <div class="sidebar-box">
              <h3 class="sidebar-title">Interactive Tool</h3>
              <a href="../tools/index.html" class="btn btn-primary" style="width:100%; text-align:center; font-size:0.85rem;">Open Interactive Tools</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

    html += renderFooter(1);
    fs.writeFileSync(path.join(traitsDir, `${trait.id}.html`), html);
  });
}

// Build Diet HTML Pages
function buildDietPages() {
  const dietsDir = path.join(ROOT_DIR, 'diets');
  ensureDir(dietsDir);

  // 1. Directory Index
  let indexHtml = renderHeader(
    "Genotype & Diet Matcher Library",
    "Evaluate Keto, Mediterranean, Intermittent Fasting, and High-Protein diets against your specific DNA variants.",
    "https://genotaste.com/diets/index.html",
    1
  );

  indexHtml += `
  <section class="pseo-header">
    <div class="container">
      <div class="breadcrumb-container">
        <ul class="breadcrumbs">
          <li><a href="../index.html">Home</a></li>
          <li class="separator">/</li>
          <li>Diet Matcher</li>
        </ul>
      </div>
      <span class="pseo-badge">Diet & Genotype Matchers</span>
      <h1 class="pseo-title">Genotype-to-Diet Matching Library</h1>
      <p class="pseo-summary">Discover how popular dietary protocols interact with specific gene variants like APOE4, FTO, PPARG, and ACTN3.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container">
      <div class="hub-grid">
        ${diets.map(d => `
          <div class="hub-item-card">
            <div>
              <span class="pseo-badge" style="margin-bottom:0.5rem;">${d.tag}</span>
              <div class="hub-item-symbol" style="font-size:1.2rem;">${d.title}</div>
              <p class="hub-item-summary" style="margin-top:0.75rem;">${d.summary}</p>
            </div>
            <a href="${d.id}.html" class="hub-item-link">View Matcher Details →</a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  indexHtml += renderFooter(1);
  fs.writeFileSync(path.join(dietsDir, 'index.html'), indexHtml);

  // 2. Individual Diet Pages
  diets.forEach(diet => {
    let html = renderHeader(
      `${diet.title} | Genotype Diet Guide`,
      diet.summary,
      `https://genotaste.com/diets/${diet.id}.html`,
      1
    );

    html += `
    <section class="pseo-header">
      <div class="container">
        <div class="breadcrumb-container">
          <ul class="breadcrumbs">
            <li><a href="../index.html">Home</a></li>
            <li class="separator">/</li>
            <li><a href="index.html">Diet Matcher</a></li>
            <li class="separator">/</li>
            <li>${diet.tag}</li>
          </ul>
        </div>
        <span class="pseo-badge">${diet.category}</span>
        <h1 class="pseo-title">${diet.title}</h1>
        <p class="pseo-summary">${diet.summary}</p>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="pseo-grid">
          <div>
            <div class="pseo-card" style="border-left: 5px solid var(--primary-gold);">
              <h2 class="pseo-card-title">⚖️ GenoTaste Verdict</h2>
              <p style="font-size:1.15rem; font-weight:700; color:var(--deep-charcoal);">${diet.verdict}</p>
            </div>

            <div class="pseo-card">
              <h2 class="pseo-card-title">📊 Calculated Target Macro Distribution</h2>
              <div style="display:flex; gap:2rem; justify-content:space-around; text-align:center; padding:1rem 0;">
                <div>
                  <div style="font-size:0.8rem; color:var(--text-muted);">CARBOHYDRATES</div>
                  <div style="font-size:1.8rem; font-weight:700; color:var(--primary-gold);">${diet.macroSplit.carbs}</div>
                </div>
                <div>
                  <div style="font-size:0.8rem; color:var(--text-muted);">HEALTHY FATS</div>
                  <div style="font-size:1.8rem; font-weight:700; color:var(--natural-green);">${diet.macroSplit.fats}</div>
                </div>
                <div>
                  <div style="font-size:0.8rem; color:var(--text-muted);">PROTEIN</div>
                  <div style="font-size:1.8rem; font-weight:700; color:#38BDF8;">${diet.macroSplit.protein}</div>
                </div>
              </div>
            </div>

            <div class="pseo-card">
              <h2 class="pseo-card-title">💡 Key Biological Insights</h2>
              <ul class="pseo-list">
                ${diet.keyInsights.map(k => `<li>${k}</li>`).join('')}
              </ul>
            </div>

            <div class="pseo-card">
              <h2 class="pseo-card-title">🥗 Practical Dietary Guidelines</h2>
              <ul class="pseo-list">
                ${diet.dietGuidelines.map(g => `<li>${g}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div>
            <div class="sidebar-box">
              <h3 class="sidebar-title">Associated Genes</h3>
              <ul class="sidebar-links">
                ${diet.associatedGenes.map(gId => {
                  const g = genes.find(x => x.id === gId);
                  return g ? `<li><a href="../genes/${g.id}.html">${g.symbol} (${g.tag})</a></li>` : '';
                }).join('')}
              </ul>
            </div>

            <div class="sidebar-box">
              <h3 class="sidebar-title">Interactive Tool</h3>
              <a href="../tools/genotype-diet-matcher.html" class="btn btn-primary" style="width:100%; text-align:center; font-size:0.85rem;">Open Genotype Diet Matcher</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

    html += renderFooter(1);
    fs.writeFileSync(path.join(dietsDir, `${diet.id}.html`), html);
  });
}

// Build Interactive Tools HTML Pages
function buildToolPages() {
  const toolsDir = path.join(ROOT_DIR, 'tools');
  ensureDir(toolsDir);

  // 1. Directory Index
  let indexHtml = renderHeader(
    "Interactive Genomic Wellness Tools Suite",
    "Calculators and tools: CYP1A2 Caffeine Cut-Off, Genomic Macronutrient Matcher, and Gene Decoder Search Hub.",
    "https://genotaste.com/tools/index.html",
    1
  );

  indexHtml += `
  <section class="pseo-header">
    <div class="container">
      <div class="breadcrumb-container">
        <ul class="breadcrumbs">
          <li><a href="../index.html">Home</a></li>
          <li class="separator">/</li>
          <li>Tools</li>
        </ul>
      </div>
      <span class="pseo-badge">Interactive Software</span>
      <h1 class="pseo-title">Interactive Genomic Wellness Tools</h1>
      <p class="pseo-summary">Calculate personalized caffeine half-life, generate genotype-matched macro ratios, and search our genomic database.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container">
      <div class="hub-grid">
        ${tools.map(t => `
          <div class="hub-item-card">
            <div>
              <span class="pseo-badge" style="margin-bottom:0.5rem;">${t.tag}</span>
              <div class="hub-item-symbol" style="font-size:2rem; margin-bottom:0.5rem;">${t.icon}</div>
              <div class="hub-item-name" style="font-size:1.15rem; font-weight:700; color:var(--deep-charcoal);">${t.name}</div>
              <p class="hub-item-summary">${t.summary}</p>
            </div>
            <a href="${t.url.replace('/tools/', '')}" class="btn btn-primary" style="text-align:center; width:100%; font-size:0.85rem; margin-top:1rem;">Launch Tool →</a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  indexHtml += renderFooter(1);
  fs.writeFileSync(path.join(toolsDir, 'index.html'), indexHtml);

  // 2. Caffeine Calculator Page
  let caffHtml = renderHeader(
    "CYP1A2 Caffeine Cut-Off & Clearance Calculator",
    "Calculate your blood caffeine half-life, evening caffeine levels, and personalized last-cup cut-off time based on your CYP1A2 genotype.",
    "https://genotaste.com/tools/caffeine-calculator.html",
    1
  );

  caffHtml += `
  <section class="pseo-header">
    <div class="container">
      <div class="breadcrumb-container">
        <ul class="breadcrumbs">
          <li><a href="../index.html">Home</a></li>
          <li class="separator">/</li>
          <li><a href="index.html">Tools</a></li>
          <li class="separator">/</li>
          <li>Caffeine Calculator</li>
        </ul>
      </div>
      <span class="pseo-badge">Interactive Calculator</span>
      <h1 class="pseo-title">CYP1A2 Caffeine Cut-Off & Clearance Calculator</h1>
      <p class="pseo-summary">Estimate your blood caffeine clearance curve, bedtime residual mg, and optimal last-cup cutoff time.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container" style="max-width:900px;">
      <div class="tool-card-box">
        <form id="caffeineCalcForm" onsubmit="return false;">
          <div class="tool-form-grid">
            <div class="form-group">
              <label>CYP1A2 Genotype Speed</label>
              <select id="genotypeSelect" class="form-control">
                <option value="fast">Fast Metabolizer (CYP1A2 *1A/*1A - A/A)</option>
                <option value="intermediate" selected>Intermediate Metabolizer (CYP1A2 A/C)</option>
                <option value="slow">Slow Metabolizer (CYP1A2 *1F - C/C)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Caffeine Dose (mg)</label>
              <div class="range-container">
                <input type="range" id="caffeineIntake" class="range-slider" min="30" max="400" value="150" step="10">
                <span id="caffeineIntakeVal" class="range-val">150 mg</span>
              </div>
            </div>
            <div class="form-group">
              <label>Time of Caffeine Intake</label>
              <select id="intakeTime" class="form-control">
                <option value="7">7:00 AM</option>
                <option value="8">8:00 AM</option>
                <option value="9" selected>9:00 AM</option>
                <option value="10">10:00 AM</option>
                <option value="12">12:00 PM (Noon)</option>
                <option value="14">2:00 PM</option>
                <option value="16">4:00 PM</option>
              </select>
            </div>
            <div class="form-group">
              <label>Target Bedtime</label>
              <select id="sleepTime" class="form-control">
                <option value="21.5">9:30 PM</option>
                <option value="22">10:00 PM</option>
                <option value="22.5" selected>10:30 PM</option>
                <option value="23">11:00 PM</option>
                <option value="24">12:00 AM (Midnight)</option>
              </select>
            </div>
          </div>

          <div class="calc-results-box">
            <div class="calc-results-grid">
              <div>
                <div class="calc-metric-label">Estimated Half-Life</div>
                <div class="calc-metric-val" id="calcHalfLife">6.0 hrs</div>
              </div>
              <div>
                <div class="calc-metric-label">Bedtime Residual</div>
                <div class="calc-metric-val" id="calcRemaining">31.2 mg</div>
              </div>
              <div>
                <div class="calc-metric-label">Recommended Cut-Off</div>
                <div class="calc-metric-val" id="calcCutoff">11:30 AM</div>
              </div>
              <div>
                <div class="calc-metric-label">Sleep Impact Score</div>
                <div class="calc-metric-val" id="calcSleepScore">78/100</div>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
              <span id="calcSleepStatus" class="calc-status-badge status-warn">Mild Sleep Risk</span>
              <p id="calcAdvice" style="font-size:0.95rem; color:#E2E8F0; line-height:1.6; margin:0; flex:1; min-width:280px;"></p>
            </div>
          </div>
        </form>
      </div>

      <div class="pseo-card">
        <h2 class="pseo-card-title">☕ Biological Mechanism Behind the Calculator</h2>
        <p style="line-height:1.7; color:var(--navy-slate);">Caffeine clearance is mediated in the liver by Cytochrome P450 1A2 (CYP1A2). Fast metabolizers (*1A/*1A) break down 50% of ingested caffeine in 3 to 4 hours. Slow metabolizers (*1F C/C) retain active caffeine for up to 9 to 10 hours. Even small residual amounts (>20mg) at bedtime bind brain ADORA2A adenosine receptors, suppressing Stage N3 slow-wave deep sleep without necessarily causing insomnia.</p>
        <p style="line-height:1.7; color:var(--navy-slate); margin-top:1rem;">Read our full <a href="../genes/cyp1a2.html" style="color:var(--primary-gold-dark); font-weight:600;">CYP1A2 Gene Guide</a> or explore <a href="../traits/caffeine-metabolism.html" style="color:var(--primary-gold-dark); font-weight:600;">Caffeine Clearance & Sleep Latency</a>.</p>
      </div>
    </div>
  </section>`;

  caffHtml += renderFooter(1);
  fs.writeFileSync(path.join(toolsDir, 'caffeine-calculator.html'), caffHtml);

  // 3. Genotype Diet Matcher Page
  let dietToolHtml = renderHeader(
    "Genomic Macronutrient & Diet Matcher Tool",
    "Calculate your baseline carb/fat/protein ratio and personalized nutrition guidelines based on FTO, APOE, PPARG, and ACTN3 variants.",
    "https://genotaste.com/tools/genotype-diet-matcher.html",
    1
  );

  dietToolHtml += `
  <section class="pseo-header">
    <div class="container">
      <div class="breadcrumb-container">
        <ul class="breadcrumbs">
          <li><a href="../index.html">Home</a></li>
          <li class="separator">/</li>
          <li><a href="index.html">Tools</a></li>
          <li class="separator">/</li>
          <li>Genotype Diet Matcher</li>
        </ul>
      </div>
      <span class="pseo-badge">Interactive Calculator</span>
      <h1 class="pseo-title">Genomic Macronutrient & Diet Matcher Tool</h1>
      <p class="pseo-summary">Input your genetic variants to calculate your custom macronutrient target breakdown and high-leverage habits.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container" style="max-width:900px;">
      <div class="tool-card-box">
        <form id="genotypeMatcherForm" onsubmit="return false;">
          <div class="tool-form-grid">
            <div class="form-group">
              <label>FTO Appetite & Satiety Variant</label>
              <select id="ftoSelect" class="form-control">
                <option value="TT">FTO T/T (Normal Satiety)</option>
                <option value="AA" selected>FTO A/A or A/T (Elevated Appetite / High Ghrelin)</option>
              </select>
            </div>

            <div class="form-group">
              <label>APOE Saturated Fat Variant</label>
              <select id="apoeSelect" class="form-control">
                <option value="E3E3">APOE e3/e3 (Baseline Lipid Clearance)</option>
                <option value="E4" selected>APOE e4 Carrier (Sat Fat Hyper-Responder)</option>
              </select>
            </div>

            <div class="form-group">
              <label>PPARG Insulin Sensitivity Variant</label>
              <select id="ppargSelect" class="form-control">
                <option value="ProPro">PPARG Pro/Pro (Standard Insulin Signaling)</option>
                <option value="Ala" selected>PPARG Pro/Ala or Ala/Ala (Insulin Sensitive)</option>
              </select>
            </div>

            <div class="form-group">
              <label>ACTN3 Muscle Fiber Variant</label>
              <select id="actn3Select" class="form-control">
                <option value="RR" selected>ACTN3 R/R (Power & Sprint Fiber)</option>
                <option value="XX">ACTN3 X/X (Endurance & High Fiber)</option>
              </select>
            </div>
          </div>

          <div class="calc-results-box">
            <div style="text-align:center; margin-bottom:1rem;">
              <span id="matcherDietBadge" class="pseo-badge" style="margin-bottom:0.35rem;">Optimal Baseline</span>
              <h3 id="matcherDietTitle" style="font-family:'Outfit',sans-serif; color:#FFF; font-size:1.35rem;">Calculated Pattern</h3>
              <p id="matcherSummary" style="font-size:0.9rem; color:#94A3B8; margin-top:0.35rem;"></p>
            </div>

            <div class="macro-bar-container">
              <div class="macro-segment segment-carbs" id="barCarbs" style="width:40%;"></div>
              <div class="macro-segment segment-fats" id="barFats" style="width:30%;"></div>
              <div class="macro-segment segment-protein" id="barProtein" style="width:30%;"></div>
            </div>

            <div class="macro-legend">
              <div class="legend-item"><span class="dot-carbs"></span> Carbs: <strong id="pctCarbs" style="color:#FFF;">40%</strong></div>
              <div class="legend-item"><span class="dot-fats"></span> Healthy Fats: <strong id="pctFats" style="color:#FFF;">30%</strong></div>
              <div class="legend-item"><span class="dot-protein"></span> Protein: <strong id="pctProtein" style="color:#FFF;">30%</strong></div>
            </div>

            <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1);">
              <h4 style="color:var(--primary-gold); font-size:0.95rem; margin-bottom:0.75rem;">Calculated Genotype Warnings & Guidelines:</h4>
              <ul id="matcherWarnings" style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; font-size:0.85rem; color:#E2E8F0;"></ul>
            </div>
          </div>
        </form>
      </div>

      <div class="pseo-card">
        <h2 class="pseo-card-title">🥗 Explore Genotype Diet Matcher Guides</h2>
        <p style="line-height:1.7; color:var(--navy-slate);">Learn more about how specific diets match your genomic profile:</p>
        <ul class="pseo-list" style="margin-top:1rem;">
          <li><a href="../diets/keto-apoe4.html" style="color:var(--primary-gold-dark); font-weight:600;">Is Keto Safe for APOE4 Carriers?</a></li>
          <li><a href="../diets/intermittent-fasting-fto.html" style="color:var(--primary-gold-dark); font-weight:600;">Intermittent Fasting & FTO Satiety Variants</a></li>
          <li><a href="../diets/mediterranean-diet-pparg.html" style="color:var(--primary-gold-dark); font-weight:600;">Mediterranean Diet & PPARG Insulin Sensitivity</a></li>
        </ul>
      </div>
    </div>
  </section>`;

  dietToolHtml += renderFooter(1);
  fs.writeFileSync(path.join(toolsDir, 'genotype-diet-matcher.html'), dietToolHtml);

  // 4. Gene Decoder Hub Page
  let hubHtml = renderHeader(
    "Interactive Gene & Trait Decoder Hub",
    "Live search and filter across all 12+ wellness genes, physiological trait guides, and genotype-matched diets.",
    "https://genotaste.com/tools/gene-decoder-hub.html",
    1
  );

  hubHtml += `
  <section class="pseo-header">
    <div class="container">
      <div class="breadcrumb-container">
        <ul class="breadcrumbs">
          <li><a href="../index.html">Home</a></li>
          <li class="separator">/</li>
          <li><a href="index.html">Tools</a></li>
          <li class="separator">/</li>
          <li>Decoder Hub</li>
        </ul>
      </div>
      <span class="pseo-badge">Live Search Hub</span>
      <h1 class="pseo-title">Interactive Gene & Trait Decoder Hub</h1>
      <p class="pseo-summary">Search any gene symbol (CYP1A2, MTHFR, APOE, ACTN3), trait keyword, or diet strategy in real time.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0;">
    <div class="container">
      <!-- Search & Filters -->
      <div class="hub-search-bar">
        <input type="text" id="hubSearchInput" class="hub-search-input" placeholder="🔍 Search by gene symbol (e.g. MTHFR), trait (caffeine, sleep, fat), or diet...">
      </div>

      <div class="hub-filter-pills">
        <button class="hub-filter-btn active" data-category="all">All Topics</button>
        <button class="hub-filter-btn" data-category="Sleep & Rhythms">Sleep & Rhythms</button>
        <button class="hub-filter-btn" data-category="Fatigue & Energy">Fatigue & Energy</button>
        <button class="hub-filter-btn" data-category="Body & Weight">Body & Weight</button>
        <button class="hub-filter-btn" data-category="Fitness & Recovery">Fitness & Recovery</button>
        <button class="hub-filter-btn" data-category="Appearance & Traits">Appearance & Skin</button>
        <button class="hub-filter-btn" data-category="Preventive Wellness">Preventive Wellness</button>
      </div>

      <!-- Hub Cards Grid -->
      <div class="hub-grid">
        ${genes.map(g => `
          <div class="hub-item-card" data-title="${g.symbol} ${g.name}" data-tags="${g.tag} ${g.category}" data-category="${g.category}">
            <div>
              <span class="pseo-badge" style="margin-bottom:0.5rem;">Gene Guide</span>
              <div class="hub-item-symbol">${g.symbol}</div>
              <div class="hub-item-name">${g.name}</div>
              <p class="hub-item-summary">${g.summary}</p>
            </div>
            <a href="../genes/${g.id}.html" class="hub-item-link">Explore Gene Guide →</a>
          </div>
        `).join('')}

        ${traits.map(t => `
          <div class="hub-item-card" data-title="${t.title} ${t.tag}" data-tags="${t.summary}" data-category="${t.category}">
            <div>
              <span class="pseo-badge" style="margin-bottom:0.5rem;">Trait Guide</span>
              <div class="hub-item-symbol" style="font-size:1.25rem;">${t.tag}</div>
              <div class="hub-item-name">${t.title}</div>
              <p class="hub-item-summary">${t.summary}</p>
            </div>
            <a href="../traits/${t.id}.html" class="hub-item-link">Explore Trait Guide →</a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  hubHtml += renderFooter(1);
  fs.writeFileSync(path.join(toolsDir, 'gene-decoder-hub.html'), hubHtml);
}

// Generate Sitemap.xml & Robots.txt
function generateSitemapAndRobots() {
  const urls = [
    'https://genotaste.com/index.html',
    'https://genotaste.com/genes/index.html',
    'https://genotaste.com/traits/index.html',
    'https://genotaste.com/diets/index.html',
    'https://genotaste.com/tools/index.html',
    'https://genotaste.com/tools/caffeine-calculator.html',
    'https://genotaste.com/tools/genotype-diet-matcher.html',
    'https://genotaste.com/tools/gene-decoder-hub.html'
  ];

  genes.forEach(g => urls.push(`https://genotaste.com/genes/${g.id}.html`));
  traits.forEach(t => urls.push(`https://genotaste.com/traits/${t.id}.html`));
  diets.forEach(d => urls.push(`https://genotaste.com/diets/${d.id}.html`));

  const lastmod = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.endsWith('index.html') ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://genotaste.com/sitemap.xml`;

  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt);
}

// Execute All Builders
console.log('🚀 Generating GenoTaste Programmatic SEO (pSEO) & Interactive Tools pages...');
buildGenePages();
buildTraitPages();
buildDietPages();
buildToolPages();
generateSitemapAndRobots();
console.log('✅ pSEO build completed successfully!');
