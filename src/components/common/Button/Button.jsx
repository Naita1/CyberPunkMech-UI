function Button({ children, variant = 'primary', onClick, disabled }) {
  const base = "cursor-pointer rounded-full border px-7 py-3 font-display text-sm uppercase tracking-[0.25em] transition-all duration-300";

  const variants = {
    primary: "border-pink-500/60 bg-pink-600/90 text-white shadow-[0_0_18px_rgba(236,72,153,0.35)] hover:bg-pink-500 hover:shadow-[0_0_24px_rgba(236,72,153,0.7)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none",
    secondary: "border-cyan-400/40 bg-transparent text-cyan-300 hover:border-cyan-300 hover:bg-cyan-400/10",
    danger: "border-orange-500/60 bg-transparent text-orange-400 hover:border-orange-400 hover:bg-orange-500/10",
  };

  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;