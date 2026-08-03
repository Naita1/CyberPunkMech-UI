import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import backgroundProfile from "../../assets/images/background-profile.jpg";
import { playerService } from "../../services/playerService";
import { mechService } from "../../services/mechService";

function formatDate(createdAt) {
  if (!createdAt) return "—";
    const date = createdAt.seconds 
    ? new Date(createdAt.seconds * 1000) 
    : new Date(createdAt);

  return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

function Profile() {
  const [player, setPlayer] = useState(null);
  const [mechs, setMechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const TEMP_ID = "player-001";
    Promise.all([
      playerService.getPlayerById(TEMP_ID),
      mechService.getMechsByPlayer(TEMP_ID),
    ])
      .then(([playerData, mechsData]) => {
        setPlayer(playerData);
        setMechs(mechsData);
      })
      .catch(() => setError("Não foi possível carregar o perfil."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#0d0a1f]">
      <p className="text-cyan-300 text-sm uppercase tracking-widest animate-pulse">Carregando...</p>
    </div>
  );

  if (error) return (
    <div className="h-screen flex items-center justify-center bg-[#0d0a1f]">
      <p className="text-rose-400 text-sm">{error}</p>
    </div>
  );

  return (
    <div className="h-screen overflow-hidden bg-cyber-dark">
      <div
        className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundProfile})` }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(13, 10, 31, 0.80)" }}
        />

        <div className="relative z-10 flex h-full flex-col overflow-hidden">
          <Navbar />

          <div className="flex flex-col items-center pt-12 pb-6">
            <div className="h-32 w-32 rounded-full bg-[#D9D9D9] shadow-lg" />

            <p className="mt-5 text-3xl font-serif text-white tracking-wide">{player.namePlayer}</p>
            <p className="text-base text-white/70 mt-1 font-light">
              Piloto desde {formatDate(player.createdAt)}
            </p>

            <div className="mt-8 flex gap-5">
              <button className="rounded-full border border-pink-500/60 bg-pink-600/90 px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white shadow-[0_0_18px_rgba(236,72,153,0.35)] transition hover:bg-pink-500 hover:shadow-[0_0_24px_rgba(236,72,153,0.7)]">
                Editar Perfil
              </button>
              <button className="rounded-full border border-cyan-400/40 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-400/10">
                Garagem
              </button>
            </div>
          </div>

          <div
            className="w-full flex-1 px-6 pb-8 pt-6"
            style={{ backgroundColor: "rgba(13, 10, 31, 0.80)" }}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-xl bg-[#1A1122]/80 p-6 shadow-2xl">
                <p className="mb-3 text-lg font-serif tracking-wider text-white">Coins</p>
                <p className="text-3xl font-bold text-cyber-gold">{player.coins}</p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-[#1A1122]/80 p-6 shadow-2xl">
                <p className="mb-3 text-lg font-serif tracking-wider text-white">Mechs</p>
                <p className="text-3xl font-bold text-cyber-pink">{mechs.length}</p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-[#1A1122]/80 p-6 shadow-2xl">
                <p className="mb-3 text-lg font-serif tracking-wider text-white">Vitórias</p>
                <p className="text-3xl font-bold text-cyan-300">{player.wins ?? "—"}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#140f24]/80 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Preview da Garagem</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Mechs recentes</h3>
                </div>
                <button
                  onClick={() => navigate("/garagem")}
                  className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm uppercase tracking-[0.2em] text-cyan-300 transition hover:bg-cyan-400/10">
                  Ver garagem
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {mechs.slice(0, 2).map((mech) => (
                  <div key={mech.idMech} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">{mech.model}</p>
                    <div className="mt-2 flex justify-between text-xs text-white/50">
                      <span>HP {mech.currentHealth}/{mech.maxHealth}</span>
                      <span>ATK {mech.attackPower}</span>
                    </div>
                  </div>
                ))}
                {mechs.length === 0 && (
                  <p className="text-sm text-white/30 col-span-2">Nenhum mech na garagem.</p>
                )}
              </div>
            </div>

            <div className="mt-auto pt-4">
              <Footer />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Profile;