# CSE3CWA Assessment 2 - Phoneme Activity Builder

This project is a full-stack phoneme activity builder developed for CSE3CWA Assessment 2.

The application is designed for teachers preparing phoneme-based classroom activities for Speech Pathology students. It extends the frontend created in Assessment 1 by adding a backend API, database storage, CRUD functionality, validation, health monitoring, and Docker support.

The application allows teachers to store phoneme-based words and activity configurations, preview playable Wordle and Word Search activities, and generate standalone HTML files.

## Main Features

- Phoneme-based Wordle activity
- Phoneme-based Word Search activity
- SQLite database storage
- Prisma ORM
- Backend API routes using Next.js
- Create, Read, Update and Delete functionality
- Stored Wordle and Word Search configurations
- Database-driven phoneme words
- Difficulty settings for Wordle
- Phoneme hover hints
- Input validation and error handling
- Health check API
- Light and dark themes
- Responsive navigation
- Keyboard-accessible controls
- Standalone HTML generation
- Docker container support

## Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- Docker

## Project Structure

- `app/` contains the main website pages and API routes
- `app/api/activities/` contains API routes for activity configurations
- `app/api/words/` contains API routes for phoneme words
- `app/api/health/` contains the application health check route
- `components/` contains reusable interface components
- `lib/prisma.ts` provides the reusable Prisma database connection
- `prisma/` contains the database schema and migrations
- `public/` contains static files such as the how-to-use video
- `Dockerfile` contains the Docker image configuration
- `.dockerignore` excludes unnecessary local files from the Docker image

## Database

The project uses SQLite as the database and Prisma as the ORM.

Two main models are used.

### Activity

An activity stores information about a Wordle or Word Search configuration, including:

- activity name
- activity type
- difficulty
- whether phoneme hints are enabled
- output settings
- associated words

### Word

A word stores:

- English spelling
- phoneme sequence
- the activity it belongs to
- creation and update timestamps

Each activity can contain multiple words.

## CRUD Functionality

The backend supports Create, Read, Update and Delete operations.

### Activities

`GET /api/activities`

Retrieves stored activities and their words.

`POST /api/activities`

Creates a new activity.

`PUT /api/activities/[id]`

Updates an existing activity.

`DELETE /api/activities/[id]`

Deletes an activity.

### Words

`GET /api/words`

Retrieves stored phoneme words.

`POST /api/words`

Creates a new word.

`PUT /api/words/[id]`

Updates an existing word.

`DELETE /api/words/[id]`

Deletes a word.

## Frontend and Backend Integration

The Wordle and Word Search builders retrieve their activity data from the backend.

For Wordle, the application loads a saved `WORDLE` activity and uses the stored English word, phonemes, difficulty and hint setting.

For Word Search, the application loads a saved `WORD_SEARCH` activity and uses the words and phoneme sequences stored in the database.

The standalone HTML files are also generated using the database-loaded values instead of only fixed examples.

## Validation and Error Handling

The API includes validation for invalid or incomplete requests.

Examples include:

- missing required fields return `400 Bad Request`
- invalid data types return `400 Bad Request`
- nonexistent activity IDs return `404 Not Found`
- unexpected database or server errors return `500 Internal Server Error`

This helps prevent invalid phoneme records from being stored.

## Health Check

The application includes a health endpoint:

`GET /api/health`

A successful request returns:

`{"status":"ok","message":"Application is healthy"}`

with a `200 OK` response.

## How to Run Locally

Install the project dependencies:

`npm install`

Generate the Prisma client:

`npx prisma generate`

Apply the database migrations:

`npx prisma migrate dev`

Start the development server:

`npm run dev`

Then open:

`http://localhost:3000`

If PowerShell blocks the standard npm command on Windows, use:

`npm.cmd install`

`npm.cmd run dev`

## Running with Docker

Docker Desktop must be installed and running.

Build the Docker image:

`docker build -t cse3cwa-assessment-2 .`

Run the container:

`docker run --name cse3cwa-app -p 3001:3000 cse3cwa-assessment-2`

Then open:

`http://localhost:3001`

The health endpoint can also be tested inside Docker:

`http://localhost:3001/api/health`

The Docker image uses Node.js 22 and includes the required build tools for the SQLite driver.

## Accessibility

The project includes several accessibility features:

- keyboard-accessible buttons and controls
- visible focus states
- ARIA labels for phoneme buttons
- phoneme hover hints
- responsive layouts
- live feedback messages
- readable contrast and spacing

## GitHub

Assessment 2 repository:

`https://github.com/adamzec1z/cse3cwa-assessment-2`

The repository includes commits showing the development of the backend, database integration, Wordle and Word Search integration, validation, health checking and Docker support.

## References

React. (n.d.). *Thinking in React*. React. https://react.dev/learn/thinking-in-react

Vercel. (2026). *Next.js documentation: App Router*. Next.js. https://nextjs.org/docs/app

Prisma. (2026). *Prisma ORM documentation*. Prisma. https://www.prisma.io/docs/orm

Docker. (2026). *Docker documentation*. Docker. https://docs.docker.com/

Tailwind Labs. (n.d.). *Responsive design*. Tailwind CSS. https://tailwindcss.com/docs/responsive-design

World Wide Web Consortium. (n.d.). *How to meet WCAG (Web Content Accessibility Guidelines): Quick reference*. Web Accessibility Initiative. https://www.w3.org/WAI/WCAG22/quickref/

World Wide Web Consortium. (n.d.). *Developing a keyboard interface*. Web Accessibility Initiative. https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/

## Generative AI Acknowledgement

Generative AI tools, including ChatGPT, were used during the development of this assessment to assist with troubleshooting, explaining programming concepts, suggesting code structures, debugging errors, and improving documentation.

All generated suggestions were reviewed, tested, modified where necessary, and integrated into the project by the student. The final application was tested locally and within Docker to confirm that the implemented functionality worked as intended.