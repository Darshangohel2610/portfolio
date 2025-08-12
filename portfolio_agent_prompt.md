# AI Agent Prompt Guide: Modern React + TypeScript Portfolio

## **Context & Goal**

You are an advanced coding agent (GPT-5) tasked with building a **modern, modular, and animated portfolio website** based on the provided specifications. Follow all instructions exactly, use clean, maintainable code, and ensure the project structure allows for easy modifications.

---

## **Tech Stack Requirements**

- **Framework:** React with TypeScript
- **UI Library:** MUI (Material UI)
- **Animations:** GSAP (bare minimum, smooth, non-intrusive scroll effects)
- **Routing:** TanStack Router (optional if SPA flow is straightforward)
- **Data Handling:** JSON-formatted files in `/data` folder, one file per section.
- **Styling:** Use MUI's theming system and styled components when needed.

---

## **Design Principles**

- Modern, minimal design with good whitespace.
- Lovely scroll animations that **enhance** but do not break usability.
- Responsive layout for all devices.
- Modular file structure — each section is self-contained and imports its own data.

---

## **Sections to Implement**

### **1. Hero / Landing**

- Displays:
  - Name
  - Tagline
  - Short intro
  - Call-to-action button (e.g., "View My Work")
  - Small animation or scroll hint
- Data: `/data/hero.json`

### **2. About Me**

- Displays:
  - Short personal story
  - Tech stack / skills (icons or grid)
  - Optional career timeline
- Data: `/data/about.json`

### **3. My Work (Combined Showcase)**

#### 3.1 Experience

- Roles, internships, freelance gigs.
- Data: `/data/experience.json`

#### 3.2 Projects

- 2–3 polished project cards with titles, descriptions, and links.
- Data: `/data/projects.json`

#### 3.3 Testimonials

- Display quotes + prompt "Want to write one?".
- Data: `/data/testimonials.json`

### **4. Contact / Say Hello**

- Social icons
- Email / contact form link
- Friendly sign-off message
- Data: `/data/contact.json`

### **5. Footer**

- Name + © year
- Data: `/data/footer.json`

---

## **File & Folder Structure**

```
/src
  /components
    /Hero
    /About
    /MyWork
      /Experience
      /Projects
      /Testimonials
    /Contact
    /Footer
  /data
    hero.json
    about.json
    experience.json
    projects.json
    testimonials.json
    contact.json
    footer.json
  /routes (if using TanStack Router)
  /styles
  /utils
```

---

## **Development Steps**

1. **Setup Project**

   - Create React + TypeScript app.
   - Install MUI, GSAP, TanStack Router (optional).
   - Create `/data` folder with JSON placeholders.

2. **Global Theme Setup**

   - Configure MUI theme with primary/secondary colors, typography.
   - Include dark/light mode toggle support.

3. **Build Sections** (in order)

   - Hero → About → My Work → Contact → Footer.
   - Import relevant JSON for each section.

4. **Add Animations**

   - Use GSAP for subtle scroll-based fades, slides, or parallax.
   - Avoid over-animation; maintain smooth UX.

5. **Optimize Responsiveness**

   - Test on mobile, tablet, and desktop.

6. **Refactor for Modularity**

   - Ensure each section/component only depends on its own data and styles.

7. **Final Polish**

   - Accessibility check.
   - Clean code formatting.
   - Ensure JSON changes instantly reflect in UI.

---

## **JSON Data Structure Examples**

**hero.json**

```json
{
  "name": "Darshan Gohel",
  "tagline": "Full-Stack Developer & Innovator",
  "intro": "I craft modern web experiences with a focus on performance and design.",
  "cta": "View My Work"
}
```

**projects.json**

```json
[
  {
    "title": "FlashFeed",
    "description": "A PWA real-time feed platform with Redis integration.",
    "link": "https://example.com"
  },
  {
    "title": "Habit Maker",
    "description": "A personal habit tracker PWA built with Next.js and MUI.",
    "link": "https://example.com"
  }
]
```

---

## **Special Notes**

- Never hardcode text into components; always source from `/data`.
- Do not couple unrelated components; changes in one section should not break others.
- Keep animations lightweight and performant.
- Follow best TypeScript practices and strict type definitions.

---

**End of Instructions — Follow this exactly when implementing the portfolio.**

