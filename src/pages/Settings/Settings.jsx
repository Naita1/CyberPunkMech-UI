import { useState } from "react";
import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Button from "../../components/common/Button/Button";
import settingsBg from "../../assets/images/settings.jpg";

export default function Settings({ player = { name: "Nome do Usuário", coins: 30, createdAt: "2026-01-01" } }) {
  const [name, setName] = useState(player.name);
  const [language, setLanguage] = useState("Português (BR)");
  const [dirty, setDirty] = useState(false);

  const pilotSince = new Date(player.createdAt).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative min-h-screen overflow-hidden text-cyber-light">
     <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${settingsBg})` }}
          />
      <div className="relative z-10" style={{ backgroundColor: 'rgba(19, 15, 42, 0.80)' }}
>
        <Navbar />

        <main className="max-w-3xl mx-auto px-6 pt-10 pb-24">
          <h1 className="text-4xl font-serif uppercase tracking-[0.2em] text-white mb-8">Configurações</h1>

          <div className="flex flex-col gap-6">
            <section
              className="rounded-3xl border border-white/10 backdrop-blur-sm p-8 shadow-2xl"
              style={{ backgroundColor: 'rgba(19, 15, 42, 0.70)' }}
            >
              <div className="md:grid md:grid-cols-[minmax(180px,_1fr)_minmax(320px,_2fr)] md:items-center md:gap-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-white">Conta</h2>
                  <p className="text-sm text-white/60">Informações do piloto</p>
                </div>
                <div className="mt-6 md:mt-0">
                  <label className="block text-sm text-white/60 mb-2">Nome</label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setDirty(true);
                    }}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-300"
                  />
                </div>
              </div>
            </section>

            <section
              className="rounded-3xl border border-white/10 backdrop-blur-sm p-8"
              style={{ backgroundColor: 'rgba(19, 15, 42, 0.70)' }}
            >
              <div className="md:grid md:grid-cols-[minmax(180px,_1fr)_minmax(240px,_1.5fr)] md:items-center md:gap-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-white">Idioma</h2>
                  <p className="text-sm text-white/60">Idioma da interface</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      setDirty(true);
                    }}
                    className="w-full bg-[#1c0f24]/90 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-300 cursor-pointer"
                  >
                    <option>Português (BR)</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
              </div>
            </section>

            <section
              className="rounded-3xl border border-white/10 backdrop-blur-sm p-8"
              style={{ backgroundColor: 'rgba(19, 15, 42, 0.70)' }}
            >
              <div className="md:grid md:grid-cols-[minmax(180px,_1fr)_minmax(240px,_1.5fr)] md:items-center md:gap-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-white">Sessão</h2>
                  <p className="text-sm text-white/60">Sair da conta</p>
                </div>
                <div className="mt-4 md:mt-0 flex justify-start md:justify-end">
                  <Button variant="secondary">
                    Sair
                  </Button>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-4 mt-8 md:flex-row md:items-center md:justify-between">
            <span className={`text-xs text-cyan-400 transition-opacity ${dirty ? "opacity-100" : "opacity-0"}`}>
              Alterações não salvas
            </span>
            <Button variant="primary" onClick={() => setDirty(false)}>
              Salvar alterações
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}