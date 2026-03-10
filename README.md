# SooJi Dano | Cloud Architect Portfolio
**2026 Copyright. All Rights Reserved**
[Privacy Policy](#privacy-policy) | [Terms of Service](#terms-of-service)
> **🌐 Live Site:** [soojidano.vercel.app](https://soojidano.vercel.app)
> *This README reflects the current state of the live portfolio and includes a UI/UX audit with actionable improvements.*
---
## 📋 Table of Contents
- [About the Project](#about-the-project)
- [Deployment](#deployment)
- [UI/UX Audit & Improvements](#uiux-audit--improvements)
- [Accessibility (A11Y)](#accessibility-a11y)
- [Visual Design](#visual-design)
- [Responsiveness & Performance](#responsiveness--performance)
- [Recommended Fixes Summary](#recommended-fixes-summary)
- [License](#license)
---
## About the Project
**SooJi Dano's Portfolio** is a personal website designed to showcase my work as a **Cloud Architect & Digital Solutions Expert**. The site serves as a central hub for potential employers, clients, and collaborators to view my enterprise projects, learn about my technical expertise, and get in touch.
### Purpose
- Present a curated selection of cloud architecture and AI integration projects with detailed case studies.
- Communicate professional experience (8+ years), technical skills, and a clear value proposition.
- Provide easy ways to contact me for consulting opportunities.
### Target Audience
- Enterprise clients seeking cloud migration or AI integration experts.
- Recruiters and hiring managers in tech.
- Fellow architects and developers interested in collaboration.
### Core Features (Live)
- **Hero Section:** Clear branding with tagline and call-to-action.
- **Experience Metrics:** 8+ years, 50+ projects, 25+ clients.
- **About Section:** Professional bio with quick facts (location, email, status).
- **Featured Projects:** Four detailed projects with status labels (Ongoing, Live Production, Beta Testing) and key highlights.
- **Technical Expertise:** Comprehensive grid of skills with icons and descriptions.
- **Contact Section:** Invitation to connect with email displayed.
---
## Deployment
The site is deployed on **Vercel** and is live at [soojidano.vercel.app](https://soojidano.vercel.app). If you encounter any issues (e.g., blank page), check the following:
- **Framework:** Built with [Next.js / React]. Ensure proper redirect rules in `vercel.json` for client-side routing:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Build Logs:** Verify builds complete without errors in the Vercel dashboard.
- **Environment Variables:** No sensitive keys are currently required, but if added later, confirm they are set in Vercel.
---
## UI/UX Audit & Improvements
Based on the live site content, here is an analysis of strengths and areas for improvement.
| Area | Current Strengths | Issues & Recommendations |
|------|-------------------|--------------------------|
| **Content** | Professional copy with specific metrics (e.g., "reducing costs by 40%"). Clear project highlights. | **Duplicate "Get In Touch" section** – consolidate into one final call-to-action after Technical Expertise. |
| **Navigation** | Simple one-page scroll works well. Logical flow: Intro → About → Projects → Tech → Contact. | **Add sticky header navigation** with anchor links (e.g., `#projects`, `#expertise`) to improve usability, especially on mobile. |
| **Visual Hierarchy** | Clean layout, effective use of cards and icons. Quick Facts provide useful at-a-glance info. | **Strengthen visual hierarchy** – make main headline larger/bolder, differentiate section titles more clearly. Fix minor typo (extra `:` after "Status"). |
| **Accessibility** | Text is legible; semantic HTML structure likely present. | Add descriptive `alt` text to all icon images. Check color contrast for links (e.g., blue text on white). |
| **Responsiveness** | Assumed functional, but needs manual testing. | Test on small screens; ensure icon grids stack cleanly and touch targets are ≥44×44px. |
| **Performance** | Lightweight content, fast loading. | Optimize any future images; consider lazy loading. Run Lighthouse for specific scores. |
### Unique Strengths
- **Experience metrics** (8+ years, 50+ projects) are powerful social proof – consider displaying them more prominently (e.g., stats bar near hero).
- **Project status labels** (Ongoing, Live Production, Beta) add real-world context and credibility.
- **Email displayed openly** – good for accessibility, but a contact form could be added later to reduce spam.
---
## Accessibility (A11Y)
Current accessibility considerations and recommended actions based on WCAG 2.1 AA standards:
| Principle | Current State | Recommendations |
|-----------|---------------|-----------------|
| **Perceivable** | Text/background contrast appears sufficient. Icons used. | Add `alt` attributes to all icon images (e.g., Kubernetes, Docker icons). Verify color contrast with tools. |
| **Operable** | Keyboard navigation likely works, but focus indicators may be missing. | Ensure visible focus styles for all interactive elements. Test navigation without a mouse. |
| **Understandable** | Language is clear and professional. Error messages not applicable. | Maintain simple language in any future forms. |
| **Robust** | Semantic HTML (headings, lists) appears used. | Ensure ARIA labels are added where necessary (e.g., for icon-only buttons if any). |
---
## Visual Design
The site uses a clean, professional aesthetic consistent with a tech portfolio. Recommendations to enhance visual impact:
- **Typography:** Use a stronger contrast between heading levels (e.g., larger `<h1>`, distinct `<h2>`). Consider a refined font pairing.
- **Color Palette:** The current palette (likely dark text on light background) is safe. Introduce an accent color for CTAs and key highlights to guide attention.
- **Whitespace:** Generous spacing is good. Ensure consistent padding/margins across sections.
- **Icon Consistency:** Icons are clear; ensure they are all vector-based for sharpness on all screens.
---
## Responsiveness & Performance
### Responsiveness
- **Desktop:** Layout works well with multi-column grids.
- **Mobile/Tablet:** The Technical Expertise grid may need adjustment to avoid horizontal scroll. Test and implement a stacked or reflowed layout.
### Performance
- **Current:** Fast loading due to minimal assets.
- **Optimizations:**
  - Use next-gen image formats (WebP) if adding project screenshots.
  - Lazy load sections below the fold.
  - Minify CSS/JS.
  - Run Lighthouse and address any flagged issues.
---
## Recommended Fixes Summary
| Area | Issue | Solution |
|------|-------|----------|
| **Content** | Duplicate "Get In Touch" section | Consolidate into one final CTA after Technical Expertise. |
| **Navigation** | No sticky header / anchor links | Add a sticky nav with links to sections. |
| **Visual Hierarchy** | Weak differentiation of headings | Increase size/weight of main headline and section titles. |
| **Accessibility** | Icons missing alt text | Add descriptive `alt` attributes to all icon images. |
| **Responsiveness** | Technical grid may break on mobile | Test and implement a mobile-friendly stack. |
| **Performance** | Untested with Lighthouse | Run audit and optimize as needed. |
---
## License
This project is © 2026 Soo Ji Dano. All rights reserved.
The code is open-sourced under the [MIT License](LICENSE) – feel free to use it as a reference for your own portfolio.
*Note: Privacy Policy and Terms of Service pages are placeholders and should be customized if you collect user data.*
