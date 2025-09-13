## Technical Reconstruction Description

This portfolio page, originally built with React/Next.js and Tailwind CSS, can be visually reconstructed using plain HTML, CSS, and JavaScript, leveraging Tailwind CSS for utility-first styling. The overall structure follows a common web layout pattern: a header, multiple content sections, and a footer.

### Global Styles and Layout

The `html` and `body` elements should have `max-width: 100%` and `overflow-x: hidden` to prevent horizontal scrolling. Font smoothing should be applied with `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`. The main container `div` wrapping the entire page content should have `min-h-screen` and `bg-white` classes for a full-height white background.

### Header

The header is a `header` HTML element with `py-6` (padding-top and padding-bottom), `px-4` (padding-left and padding-right) for mobile, and `md:px-8` for larger screens. It has a `border-b` (border-bottom) and `border-gray-100`. Inside, a `div` with `max-w-7xl`, `mx-auto` (for centering), `flex`, `justify-between`, and `items-center` creates a responsive, spaced-out layout for the title and button. The title is an `h1` with `text-2xl`, `font-bold`, and `text-gray-900`. The button is an `a` tag styled with various Tailwind classes for its appearance, including `bg-brand-solid`, `text-white`, `shadow-xs-skeumorphic`, `rounded-lg`, and responsive padding/font sizes like `px-3.5 py-2.5 text-sm` and `in-data-input-wrapper:px-4 in-data-input-wrapper:text-md`.

### Hero Section

This section is a `section` element with `py-20` and responsive `px-4 md:px-8`. The content is contained within a `div` with `max-w-7xl mx-auto`. The core layout is a two-column grid on large screens, achieved with `grid grid-cols-1 lg:grid-cols-2`, `gap-12`, and `items-center`. The left column, a `div` with `space-y-6`, contains the main `h1` (`text-5xl md:text-6xl font-bold text-gray-900 leading-tight`) with `span` elements for branded italic text (`text-brand-600 italic`). A `p` tag follows with `text-xl text-gray-600 leading-relaxed`. The button is similar to the header's, wrapped in a `div` with `pt-4`. The right column, a `div` with `flex justify-center lg:justify-end`, holds the circular image. The image container is a `div` with `relative w-80 h-80 rounded-full overflow-hidden bg-gray-200`, and the `img` tag inside uses `object-cover` for proper scaling.

### Featured Work / Highlighted Projects Section

This section starts with a `div` having `border-t border-gray-200 pt-16`. The heading block is a `div` with `text-center mb-12`, containing a `div` for the sub-heading (`text-brand-600 font-medium mb-4`), an `h2` (`text-3xl font-bold text-gray-900 mb-4`), and a `p` (`text-lg text-gray-600 max-w-2xl mx-auto`). The projects are displayed in a responsive grid using `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. Each project card is an `a` tag with `group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300`. Inside, an image container `div` (`relative h-48 overflow-hidden`) holds the `img` (`object-cover group-hover:scale-105 transition-transform duration-300`) and an overlay `div` (`absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300`). Text content is in a `div` with `absolute bottom-4 left-4 right-4` for the title and category, and a `div` with `p-4` for the description (`text-gray-600 text-sm line-clamp-2`).

### Experience / Real Life Projects Section

Structurally very similar to the Featured Work section. It uses a `section` with `py-16 px-4 md:px-8`. The inner `div` has `max-w-7xl mx-auto`. The heading block is `text-center mb-12` with similar `div`, `h2`, and `p` elements. The project grid uses `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`. Each project card is a `div` with `bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200`. The image container `div` has `relative h-48 bg-gray-100 overflow-hidden` and contains the `img` (`object-cover`). Overlays for tags like date and category use `absolute` positioning with `px-2 py-1 rounded text-xs font-medium` and specific background/text colors like `bg-green-100 text-green-800` or `bg-black bg-opacity-70 text-white`. The text content is in a `div` with `p-6`, containing an `h3` (`text-xl font-semibold text-gray-900 mb-3`) and a `p` (`text-gray-600 text-sm leading-relaxed`).

### Certifications Section

This section is a `section` element with `py-16 px-4 md:px-8 bg-gray-50` for a light gray background. The content is within `max-w-7xl mx-auto`. The heading block is a `div` with `mb-12`, containing a `div` for the sub-heading (`text-brand-600 font-medium mb-4`), an `h2` (`text-4xl font-bold text-gray-900 mb-6`), and a `p` (`text-xl text-gray-600 max-w-lg`). The certifications are in a responsive grid `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center`. Each certification item is a `div` with `flex flex-col items-center`. The image container is a `div` with `relative w-32 h-32 mb-4`, and the `img` uses `object-contain`.

### Footer

The footer is a `footer` HTML element with `py-8 px-4 md:px-8 border-t border-gray-200`. The main content is in a `div` with `max-w-7xl mx-auto flex justify-between items-center`. The name is a `div` with `text-lg font-semibold text-gray-900`. Social icons are in a `div` with `flex gap-3`, where each icon is a `div` with `w-8 h-8 bg-blue-500 rounded text-white flex items-center justify-center text-sm font-semibold` (colors vary). Finally, a `div` with `text-center text-gray-500 text-sm mt-4` contains the copyright notice.

