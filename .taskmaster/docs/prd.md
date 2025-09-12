# PRD: Professional Portfolio for Python Developer

## 1. Introduction and Overview

This document defines the requirements for the development of a professional portfolio website for Sofia Escobedo, a Python developer with 4 years of experience specializing in AWS. The site will be built using HTML, CSS, JavaScript, and Tailwind CSS.

The primary purpose of this portfolio is to serve as a personal and professional marketing tool. It is specifically designed to attract and convince hiring managers and IT recruiters by demonstrating not only technical competence through real-world projects but also by communicating a strong professional narrative.

**Primary Goal**: To generate qualified employment opportunities as a Python developer, positioning Sofia as an expert in the AWS ecosystem.

## 2. Goals

- **G1**: **Capture Professional Interest**: Actively attract hiring managers and recruiters seeking Python development talent with cloud experience.
- **G2**: **Demonstrate Practical Experience**: Showcase a portfolio of real-world projects that validate technical expertise and past business impact.
- **G3**: **Facilitate Contact**: Simplify the process for a recruiter or hiring manager to schedule an interview or initiate a conversation.
- **G4**: **Search Engine Optimization (SEO)**: Position the site on search engines for key terms like "Python AWS developer".
- **G5**: **Premium User Experience**: Offers a fast, intuitive, and professional browsing experience, primarily on desktop devices (desktop-first).

## 3. User Stories

### As a Hiring Manager:
- **US1**: I want to quickly identify the candidate's technical specialization (Python, AWS) to assess if their profile fits the open role.
- **US2**: I want to explore the details of past projects to understand the scope of their experience and the types of problems they have solved.
- **US3**: I want a direct and frictionless way to schedule a call if their profile seems interesting.

### As an IT Recruiter (HR):
- **US4**: I want to easily verify the candidate's certifications and credentials to validate their technical skills.
- **US5**: I want to understand their professional career path and years of experience clearly and concisely.
- **US6**: I want to access their professional profiles (LinkedIn, GitHub) to get a more complete picture.

### As a Technical Visitor (e.g., a team lead):
- **US7**: I want to be able to read technical descriptions of the projects, including the technologies used and the architecture, to evaluate the quality of their work.
- **US8**: I want to be able to switch the content language (English/Spanish) to read the information in my preferred language.

## 4. Functional Requirements

### 4.1 General Structure and Content
1.  **FR1**: The site must have a main landing page that serves as the entry point and profile summary.
2.  **FR2**: The main header must be visible on all pages and contain the name "Sofia Escobedo" and a primary call-to-action (CTA) button.
3.  **FR3**: The primary CTA button in the header will be "Book a 30-min call" and must link directly to the **Calendly** profile.
4.  **FR4**: The footer must include direct links to **GitHub**, **LinkedIn**, the **Calendly** link, and a contact email address (`mailto:`).
5.  **FR5**: The system must allow for language switching (English/Spanish) on all pages containing text content.

### 4.2 Home Page
1. **FR6**: It must display a "hero" section with a headline highlighting the specialization in Python and AWS, along with a professional profile picture.
2. **FR7**: It must include a "Featured Work" section that showcases the most important projects in a visual card format.
3. **FR8**: It must have a "Certifications" section that displays the official AWS badges obtained.
4. **FR9**: Project cards must have a `hover` effect to indicate interactivity and **subtle text animations**.

### 4.3 Projects System (Blog)
1. **FR10**: Each portfolio project will be managed via an individual Markdown file.
2. **FR11**: The system must be able to process Markdown files and generate a static HTML page for each one.
3. **FR12**: The system must extract metadata from the `frontmatter` of each Markdown file, including: `title`, `description`, `employer`, `startDate`, `endDate`, `tags` (technologies), `heroImage`, and `language`.
4. **FR13**: Each project page must display a top banner with its hero image and key metadata.
5. **FR14**: The Markdown content (the body of the post) must be rendered with a prose format optimized for readability (typography, spacing, etc.).
6. **FR15**: Each project page must display a "Technologies Used" section generated dynamically from the metadata `tags`.

### 4.4 Responsive Design
1. **FR16**: The design must be "desktop-first," prioritizing the experience on large screens.
2. **FR17**: The layout must be fully responsive to function correctly on tablets and mobile devices.
3. **FR18**: The project grid must display 3 columns on desktop, 2 on tablet, and 1 on mobile.

### 4.5 Performance and SEO
1. **FR19**: All images on the site must use `lazy loading` to optimize initial page load time.
2. **FR20**: The system must automatically generate `meta tags` (title, description) for each page to improve SEO.

## 5. Out of Scope (Non-Goals)

- **NG1**: A user authentication or account system will not be implemented.
- **NG2**: An admin panel (CMS) will not be created. Content will be managed directly through Markdown files in the Git repository.
- **NG3**: There will be no comments section on the project pages.
- **NG4**: **A contact form will not be included**. Contact will be channeled through the Calendly button and the email in the footer.
- **NG5**: Testimonial management is not part of the development scope. If desired, they will be added as static text within the corresponding Markdown files (content management).
- **NG6**: An internal site search system will not be developed.

## 6. Design Considerations (UI/UX)

- **Color Palette**: A primary color (`brand-600`) will be used for CTAs and highlighted elements. Neutrals will be a range of grays (`gray-100` to `gray-900`) on a white background (`bg-white`).
- **Typography**: Large, legible fonts will be used. Main titles will be `font-bold`, and body text will have generous line spacing to facilitate reading. Project content will use the Tailwind `prose` class.
- **Animations**: **Subtle text animations** and smooth transitions will be implemented on interactive elements (buttons, cards) to convey a sense of quality and professionalism.

## 7. Technical Considerations

- **Tech Stack**: HTML5, CSS3, JavaScript (ES6+), Tailwind CSS.
- **Build Process**: A static site generator (like 11ty, Astro, or a custom script) will be used to process Markdown files and optimize assets.
- **Hosting and Domain**: The site will be hosted on **AWS Amplify** (or a similar solution like S3 + CloudFront) and served under the domain `sofia.escobedo.mx`.
- **Version Control**: The source code and all content (`.md` files) will be versioned with Git and hosted in the public repository: `github.com/yokharian/portfolio`.
- **Analytics**: **AWS CloudWatch RUM (Real User Monitoring)** will be integrated to measure client-side performance and traffic metrics.

## 8. Success Metrics

Since this is the first effort in collecting metrics, the initial goal is to establish a baseline during the first 3 months and then set growth targets.

- **Conversion Metrics (Primary Goal)**:
    - **SM1**: Measure the Click-Through Rate (CTR) of the "Book a 30-min call" button. **Initial Target**: Achieve a CTR > 3% of unique visitors.
    - **SM2**: Generate an average of at least **2 qualified contacts** (scheduled calls) per month through the website.

- **Engagement Metrics**:
    - **SM3**: Establish the average session duration. **Initial Target**: Keep it above 1 minute and 30 seconds.
    - **SM4**: Establish the bounce rate. **Initial Target**: Keep it below 50%.

- **Technical Metrics**:
    - **SM5**: Achieve a Performance score in Google Lighthouse > 90 in the first audit.
    - **SM6**: Achieve an SEO score in Google Lighthouse > 90 in the first audit.

## 9. Key Decisions (Summary)

This section summarizes the decisions made from the initial open questions to prevent ambiguity:

1.  **Scheduling Platform**: **Calendly** will be used.
2.  **Testimonials**: Will not be a dynamic feature. They will be managed as static content if needed.
3.  **Social Links**: **GitHub**, **LinkedIn**, **Calendly**, and an **email** will be linked.
4.  **Analytics Tool**: **AWS CloudWatch RUM** will be implemented.
5.  **Contact Form**: Will not be included.
6.  **Web Domain**: `sofia.escobedo.mx`.
7.  **Content Versioning**: Will be managed via **Git** in the project repository.
8.  **Animations**: **Subtle text animations** will be included.

---

**Document created**: [Current Date]
**Version**: 1.1 (Refined)
**Author**: AI Assistant
**Approved by**: Sofia Escobedo
