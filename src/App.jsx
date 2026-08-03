import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Garage from './pages/Garage/Garage';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeEnter');

  useEffect(() => {
    setTransitionStage('fadeExit');

    const timeout = setTimeout(() => {
      setDisplayLocation(location);
      setTransitionStage('fadeEnter');
    }, 180);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className={`route-transition ${transitionStage}`}>
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/garagem" element={<Garage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;