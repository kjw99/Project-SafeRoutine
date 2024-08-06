import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Service from './pages/Service';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Service" element={<Service />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;