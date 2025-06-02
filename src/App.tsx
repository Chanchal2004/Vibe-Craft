import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Home } from './components/Home';
import { MemeGenerator } from './components/MemeGenerator/MemeGenerator';
import { VibeCheck } from './components/VibeCheck/VibeCheck';
import { Favorites } from './components/Favorites/Favorites';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meme-generator" element={<MemeGenerator />} />
            <Route path="/vibe-check" element={<VibeCheck />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;