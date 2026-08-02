function Footer() {
  return (
    <footer className="relative z-10 flex items-end px-6 pb-6 sm:px-10">
      <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-cyan-100/70">
        <span>Me siga</span>
        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full border border-cyan-300/60" />
          <span className="h-2 w-2 rounded-full border border-cyan-300/60" />
          <span className="h-2 w-2 rounded-full border border-cyan-300/60" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;