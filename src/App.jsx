import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Garage from './pages/Garage/Garage';
import Settings from './pages/Settings/Settings';
import About from './pages/About/About';
import Store from './pages/Store/Store';
import Login from './pages/Login/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function ProtectedRoute({ children }) {
  const { player, checking } = useAuth();
  if (checking) return null;
  return player ? children : <Navigate to="/login" replace />;
}

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
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/garagem" element={<ProtectedRoute><Garage /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/loja" element={<ProtectedRoute><Store /></ProtectedRoute>} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;