import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 sm:px-10">
      <div className="flex items-center gap-4 sm:gap-8">
     
        <Link to="/" className="text-sm text-white/85 transition-opacity hover:text-white">Inicio</Link>
        <Link to="/perfil" className="text-sm text-white/85 transition-opacity hover:text-white">Perfil</Link>
        <Link to="/garagem" className="text-sm text-white/85 transition-opacity hover:text-white">Garagem</Link>
      </div>

      <div className="flex items-center gap-4 sm:gap-8">
        <Link to="/configuracoes" className="text-sm text-white/85 transition-opacity hover:text-white">Configurações</Link>
        <a href="/sobre" className="text-sm text-white/85 transition-opacity hover:text-white">Sobre</a>
      </div>
    </nav>
  );
}

export default Navbar;