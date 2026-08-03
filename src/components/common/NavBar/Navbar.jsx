import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isProfilePage = location.pathname === '/perfil';

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 sm:px-10">
      <div className="flex items-center gap-4 sm:gap-8">
        <Link to={isProfilePage ? '/' : '/perfil'} className="text-sm text-white/85 transition-opacity hover:text-white">
          {isProfilePage ? 'Home' : 'Profile'}
        </Link>
        <Link to="/garagem" className="text-sm text-white/85 transition-opacity hover:text-white">Garagem</Link>
      </div>

      <div className="flex items-center gap-4 sm:gap-8">
        <a href="#configuracoes" className="text-sm text-white/85 transition-opacity hover:text-white">Configurações</a>
        <a href="#sobre" className="text-sm text-white/85 transition-opacity hover:text-white">Sobre</a>
      </div>
    </nav>
  );
}

export default Navbar;