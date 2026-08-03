import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 sm:px-10">
      <div className="flex items-center gap-4 sm:gap-8">
        <Link to="/" className="text-sm text-white/85 transition-opacity hover:text-white">Home</Link>
        <a href="#configuracoes" className="text-sm text-white/85 transition-opacity hover:text-white">Configurações</a>
      </div>

      <div className="flex items-center gap-4 sm:gap-8">
        <a href="#garagem" className="text-sm text-white/85 transition-opacity hover:text-white">Garagem</a>
        <a href="#sobre" className="text-sm text-white/85 transition-opacity hover:text-white">Sobre</a>
      </div>
    </nav>
  );
}

export default Navbar;