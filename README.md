🎬 Movie Explorer
Movie Explorer is a responsive, dynamic web application built with React and Tailwind CSS. It allows users to browse a vast collection of movies/TV shows, search for specific titles in real-time, and view detailed information in an interactive, accessible modal. The application uses the free TVMaze API for its data.

🌟 Features
Responsive Home Page: Engaging hero banner, intuitive navigation, and footer.
Dynamic Search: Real-time search functionality with a custom debounce hook to prevent API spam.
Movie Listings: Responsive CSS Grid layout displaying movie posters, titles, ratings, and release years.
Interactive Details Modal: -Displays in-depth movie info (summary, genres, backdrop image).-Closes via the Escape key, close button, or clicking the backdrop.-Body scroll lock when the modal is active.
Production-Ready Safety: -Graceful fallback for missing movie posters or ratings (Null safety).-Safe HTML rendering for API summaries.-Loading states (Skeletons/Spinners) and Error handling.

🛠️ Tech Stack
Frontend Library: React (Vite)
Routing: React Router DOM
Styling: Tailwind CSS
Icons: Lucide React

API: TVMaze API


🚀 Getting Started
Follow these instructions to set up and run the project locally.

Prerequisites
Ensure you have the following installed on your machine:

Node.js (v16 or higher )
npm or yarn

Installation & Setup
Clone the repository
git clone https://github.com/pollobkhalil/movieExplorer.git
bash

npm install
Start the development server
bash

npm run dev
Open your browser and navigate to http://localhost:5173 (or the port displayed in your terminal).


📁 Project Structure
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── Footer.jsx         # Bottom footer
│   ├── MovieCard.jsx      # Reusable card for movie grid
│   └── MovieModal.jsx     # Detailed movie popup modal
├── pages/
│   ├── Home.jsx           # Landing page with Hero banner
│   └── Movies.jsx         # Movie listing & search page
├── hooks/
│   └── useDebounce.js     # Custom hook for search input delay
├── App.jsx                # Main app component & Routing
└── main.jsx               # React entry point


🔌 API Endpoints Used
This project utilizes the following TVMaze API endpoints:

Get all shows:
GET https://api.tvmaze.com/shows 

Search shows by query:
GET https://api.tvmaze.com/search/shows?q=:query 
Note: The search endpoint returns an array of objects containing a show property. We normalize this data upon fetching to match the standard show object structure.

📱 Responsive Design
The application is fully responsive and optimized for various devices:
