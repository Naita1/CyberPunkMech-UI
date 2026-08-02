function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 sm:px-10">
      <a href="#home" className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300/90 transition-opacity hover:text-cyan-200">
        C.P.M.
      </a>

      <div className="flex items-center gap-4 sm:gap-8">
        <a href="#perfil" className="text-sm text-white/85 transition-opacity hover:text-white">Perfil</a>
        <a href="#configuracoes" className="text-sm text-white/85 transition-opacity hover:text-white">Configurações</a>
        <a href="#garagem" className="text-sm text-white/85 transition-opacity hover:text-white">Garagem</a>
        <a href="#sobre" className="text-sm text-white/85 transition-opacity hover:text-white">Sobre</a>
      </div>
    </nav>
  );
}

export default Navbar;