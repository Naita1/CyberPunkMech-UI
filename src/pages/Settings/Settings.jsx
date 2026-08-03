import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import settingsBg from "../../assets/images/background-settings.jpg";
import { playerService } from "../../services/playerService";

const LANGUAGES = ["Português (BR)", "English", "Español"];

const cardStyle = {
  backgroundColor: "rgba(16, 8, 20, 0.82)",
};

function LanguageDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-[#100814] border border-cyan-500/30 rounded-2xl px-4 py-3 text-sm text-white/90 hover:border-cyan-400/60 transition-colors focus:outline-none"
      >
        <span>{value}</span>
        <ChevronDown size={16} className={`text-cyan-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="absolute z-50 bottom-full mb-2 w-full rounded-2xl border border-cyan-500/30 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.15)]" style={{ backgroundColor: "#100814" }}>
          {LANGUAGES.map((lang) => (
            <li
              key={lang}
              onClick={() => { onChange(lang); setOpen(false); }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                lang === value
                  ? "text-cyan-300 bg-cyan-500/10"
                  : "text-white/70 hover:bg-cyan-500/10 hover:text-white"
              }`}
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NeonToggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-300 focus:outline-none ${
        checked ? "border-cyan-400 bg-cyan-500/20" : "border-white/20 bg-white/5"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 mt-[1px] rounded-full transition-all duration-300 shadow-sm ${
          checked
            ? "translate-x-5 bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            : "translate-x-0.5 bg-white/30"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("Português (BR)");
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const TEMP_ID = "player-001";
    playerService.getPlayerById(TEMP_ID)
      .then(setPlayer)
      .catch(() => setPlayer(null))
      .finally(() => setLoading(false));
  }, []);

  const pilotSince = player?.createdAt
    ? new Date(player.createdAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className="relative h-screen overflow-hidden text-white flex flex-col">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${settingsBg})` }} />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(19, 15, 42, 0.85)" }} />

      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-cyan-300 text-sm uppercase tracking-widest animate-pulse">Carregando...</p>
          </div>
        ) : (

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
            <h1 className="text-2xl font-serif uppercase tracking-[0.2em] text-white">Configurações</h1>

            <section className="rounded-2xl border border-white/10 backdrop-blur-sm p-5" style={cardStyle}>
              <p className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">Perfil</p>
              <div className="flex items-stretch gap-0 divide-x divide-white/10">
                <div className="flex-1 pr-5">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Nome</p>
                  <p className="text-base text-white/80 font-medium truncate">{player?.namePlayer ?? "—"}</p>
                </div>
                <div className="flex-1 pl-5">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Piloto desde</p>
                  <p className="text-base text-white/80 font-medium">{pilotSince}</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 backdrop-blur-sm p-5" style={cardStyle}>
              <p className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">Preferências</p>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/90">Idioma</p>
                    <p className="text-xs text-white/40 mt-0.5">Idioma da interface</p>
                  </div>
                  <div className="w-48 shrink-0">
                    <LanguageDropdown value={language} onChange={setLanguage} />
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/90">Notificações</p>
                    <p className="text-xs text-white/40 mt-0.5">Alertas e atualizações do jogo</p>
                  </div>
                  <NeonToggle checked={notifications} onChange={setNotifications} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-rose-500/20 backdrop-blur-sm p-5" style={cardStyle}>
              <p className="text-xs text-rose-400/70 uppercase tracking-widest mb-4">Zona de Perigo</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/90">Encerrar Sessão</p>
                  <p className="text-xs text-white/40 mt-0.5">Você será desconectado da conta</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="cursor-pointer rounded-full border border-rose-500/50 px-5 py-2 text-xs font-display uppercase tracking-[0.2em] text-rose-400 hover:bg-rose-500/10 transition-all duration-300"
                >
                  Sair
                </button>
              </div>
            </section>
          </div>
        </main>

        )}
        <Footer />
      </div>
    </div>
  );
}