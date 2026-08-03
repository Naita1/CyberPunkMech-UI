import { useState, useEffect } from "react";
import background from "../../assets/images/background.jpg";
import Footer from "../../components/layout/Footer/Footer";

const inputClass =
  "w-full bg-[#100814] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors";

const labelClass = "block text-xs text-white/40 uppercase tracking-widest mb-2";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [textIsLogin, setTextIsLogin] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const [form, setForm] = useState({ name: "", password: "", confirm: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); };

  const toggle = () => {
    setTextVisible(false);
    setIsLogin((v) => !v);
    setTimeout(() => {
      setTextIsLogin((v) => !v);
      setTextVisible(true);
    }, 320);
  };

  return (
    <div className="relative h-screen overflow-hidden flex flex-col text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }} />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(19, 15, 42, 0.78)" }} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-center pt-8">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Cyber Punk Mech</p>
        </div>

        <main className="flex-1 flex items-center justify-center px-4">

          <div
            className="relative w-full overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm"
            style={{
              maxWidth: "800px",
              height: "480px",
              backgroundColor: "rgba(16, 8, 20, 0.82)",
            }}
          >
            <div className="flex h-full">

              <div className="flex flex-col justify-center px-10" style={{ width: "400px", minWidth: "400px" }}>
                <h2 className="text-lg font-serif uppercase tracking-[0.2em] text-white mb-6">Entrar</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>Nome do Piloto</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="seu_nome" autoComplete="username" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Senha</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange}
                      placeholder="••••••••" autoComplete="current-password" className={inputClass} />
                  </div>
                  <button type="submit"
                    className="mt-2 w-full cursor-pointer rounded-full border border-pink-500/40 bg-pink-600/70 py-3 text-sm uppercase tracking-[0.25em] text-white shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:bg-pink-600/85 hover:shadow-[0_0_16px_rgba(236,72,153,0.3)] transition-all duration-300">
                    Entrar
                  </button>
                </form>
              </div>

              <div className="flex flex-col justify-center px-10" style={{ width: "400px", minWidth: "400px" }}>
                <h2 className="text-lg font-serif uppercase tracking-[0.2em] text-white mb-6">Criar Conta</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>Nome do Piloto</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="seu_nome" autoComplete="username" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Senha</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange}
                      placeholder="••••••••" autoComplete="new-password" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Confirmar Senha</label>
                    <input name="confirm" type="password" value={form.confirm} onChange={handleChange}
                      placeholder="••••••••" autoComplete="new-password" className={inputClass} />
                  </div>
                  <button type="submit"
                    className="mt-1 w-full cursor-pointer rounded-full border border-pink-500/40 bg-pink-600/70 py-3 text-sm uppercase tracking-[0.25em] text-white shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:bg-pink-600/85 hover:shadow-[0_0_16px_rgba(236,72,153,0.3)] transition-all duration-300">
                    Criar Conta
                  </button>
                </form>
              </div>
            </div>

            <div
              className="absolute inset-y-0 w-1/2 rounded-3xl flex flex-col items-center justify-center gap-6 px-10 text-center border border-pink-500/20"
              style={{
                backgroundColor: "rgba(26, 8, 32, 0.96)",
                boxShadow: "inset 0 0 60px rgba(236,72,153,0.08), 0 0 40px rgba(236,72,153,0.15)",
                backdropFilter: "blur(16px)",
                transform: isLogin ? "translateX(100%)" : "translateX(0%)",
                transition: "transform 650ms cubic-bezier(0.34, 1.2, 0.64, 1)",
              }}
            >
              <div
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? "translateY(0px)" : "translateY(8px)",
                  transition: "opacity 220ms ease, transform 220ms ease",
                }}
                className="flex flex-col items-center gap-6 text-center"
              >
              {textIsLogin ? (
                <>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">Novo por aqui?</p>
                  <h3 className="text-2xl font-serif uppercase tracking-[0.15em] text-white">Crie sua conta</h3>
                  <p className="text-sm text-white/70 leading-relaxed">Registre-se e comande seus Mechs nas ruas da metrópole neon.</p>
                  <button type="button" onClick={toggle}
                    className="cursor-pointer rounded-full border border-white/25 px-8 py-2.5 text-xs uppercase tracking-widest text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                    Registrar
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">Já tem conta?</p>
                  <h3 className="text-2xl font-serif uppercase tracking-[0.15em] text-white">Bem-vindo de volta</h3>
                  <p className="text-sm text-white/70 leading-relaxed">Entre com suas credenciais e volte ao campo de batalha.</p>
                  <button type="button" onClick={toggle}
                    className="cursor-pointer rounded-full border border-white/25 px-8 py-2.5 text-xs uppercase tracking-widest text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                    Entrar
                  </button>
                </>
              )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
