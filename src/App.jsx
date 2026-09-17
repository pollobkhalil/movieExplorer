import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Movies from './pages/movies';
import Home from './pages/home';


function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-6 text-center text-white">
      <p className="mb-2 text-sm font-medium text-amber-400">404</p>
      <h1 className="mb-4 text-3xl font-bold">This page doesn't exist</h1>
      <a href="/" className="text-amber-400 underline hover:text-amber-300">
        Back to home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
