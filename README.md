# CSE3CWA Assessment 1 - Phoneme Activity Builder

This project is a frontend activity builder created for CSE3CWA Assessment 1.

The application is designed for teachers preparing phoneme-based activities for Speech Pathology students. It allows users to preview and generate Wordle and Word Search activities as standalone HTML files.

## Main Features

- Phoneme-based Wordle activity
- Phoneme-based Word Search activity
- Difficulty settings for Wordle
- Phoneme hover hints
- Light and dark themes
- Responsive navigation
- Keyboard-accessible controls
- Standalone HTML generation

## Technology

- Next.js
- React
- TypeScript
- Tailwind CSS

## Project Structure

- `app/` contains the main website pages
- `components/` contains reusable interface components
- `public/` contains static files such as the how-to-use video
- Wordle and Word Search logic is separated into reusable builder components

## How to Run the Project

1. Install the project dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the website in a browser:

```text
http://localhost:3000
```

If PowerShell blocks the standard npm command on Windows, use:

```bash
npm.cmd install
npm.cmd run dev
```


## References

React. (n.d.). *Thinking in React*. React.

Vercel. (2026). *Next.js documentation: App Router*. Next.js.

Tailwind Labs. (n.d.). *Responsive design*. Tailwind CSS.

World Wide Web Consortium. (n.d.). *How to meet WCAG (Web Content Accessibility Guidelines): Quick reference*. Web Accessibility Initiative.

World Wide Web Consortium. (n.d.). *Developing a keyboard interface*. Web Accessibility Initiative.