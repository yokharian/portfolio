## Conceptual Map of Blog Page UI Blocks

This page is composed of modular UI blocks that facilitate the presentation of dynamic content from a blog post.

2.  **Post Banner/Hero Section (Dynamic Content)**

- Background Image (from `post.banner` in JSON)

- Dark Overlay Layer

- Tags (from `post.tags` in JSON, with dynamic colors)

  - Post Title (from `post.title` in JSON)

- Employer (from `post.employer` in JSON)

- Date Range (from `post.startDate` and `post.endDate` in JSON)

- _Purpose_: Impactful visual presentation and key metadata of the post.

3.  **Post Content Area (Markdown Rendered)**

- **Description Block**:

- Title: ‘Description’

- Description Paragraph (from `post.description` in JSON)

  - **Language Toggle Button**:

- Button: ‘🇺🇸 English / 🇪🇸 Spanish’

- _Purpose_: Allow the user to change the language of the post content (requires JS to toggle between `post.content` and `postEs.content`).

  - **Main Markdown Content Block**:

- Markdown content (from `post.content` or `postEs.content` in JSON)

- _Purpose_: Render the main body of the post in Markdown format, applying readability styles (`prose prose-lg`).

4.  **Technologies Used Section (Dynamic Tags)**

- Title: ‘Technologies Used’

- List of Tags/Badges (from `post.tags` in JSON, with dynamic names and background colors)

- _Purpose_: Highlight technologies relevant to the post.

5.  **Footer (Simple with Social Icons)**

    - Name: ‘Sofia Escobedo’

    - Social Media Icons (group of 4 icons)

    - Copyright Notice

    - _Purpose_: Consistent contact and copyright information.

      - **Lucidchart Diagram Embedding**: (Conditional, if `post.lucidchartUrl` in JSON exists)

- _Purpose_: Display interactive Lucidchart diagrams directly in the post.
