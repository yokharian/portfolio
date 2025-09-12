## Visual Description of the Blog Page

This page is designed to display a single blog post, with a focus on readability and clear presentation of content. The structure is linear and centers on the post itself, with well-defined navigation and metadata elements.

**Hero/Banner Section (Post-Specific)**: Immediately below the header, there is a large, visually striking banner section. This section features a background image relevant to the post (`banner` from the JSON) with a dark overlay to improve text readability. Above the image, the post title (`title` in JSON), employer (`employer` in JSON), and start and end dates (`startDate`, `endDate` in JSON) are displayed. There are also tags (`tags` in JSON) in the upper left corner, indicating the technologies or topics of the post, with dynamic background colors.

- **Post Content Section**: This is the main section of the page, where the blog content is rendered. It is centered and has a limited width for optimal reading. It is divided into several subsections:

- **Description**: A brief description of the post (`description` from JSON) with a clear title.

  - **Language Toggle**: A button (`🇺🇸 English / 🇪🇸 Spanish`) that allows the user to change the language of the post content. This suggests that the main content will be dynamically loaded in the selected language.

  - **Main Content Area**: This is where the Markdown content of the post (`content` in JSON) is rendered in HTML. It uses typography styles (`prose prose-lg max-w-none`) to ensure that text, headings, lists, and other Markdown elements are well-formatted and readable.

- **Technologies Used Section**: At the end of the post content, there is a section that lists the technologies mentioned in the post (`tags` in JSON). Each technology is presented as a tag or ‘badge’ with a name and background color that matches that of the banner section, providing a consistent visual reference.

- **Footer**: A simple footer, identical to the one on the portfolio page, containing the person's name, social media icons, and copyright notice. This reinforces the site's identity and provides consistent links.

  - **Lucidchart Diagram Embedding**: If the `lucidchartUrl` property in the JSON contains a URL, a Lucidchart diagram can be embedded directly into the post content, allowing for the display of technical or conceptual diagrams.
