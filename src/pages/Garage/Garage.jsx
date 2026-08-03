import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import backgroundGarage from "../../assets/images/background-garage.jpg";
import attackMechImg from "../../assets/mechs/AttackMech/Parado-Direita.png";
import defensiveMechImg from "../../assets/mechs/DefensiveMech/Parado-Direita.png";
import { mechService } from "../../services/mechService";

const mechImages = {
  AttackMech: attackMechImg,
  DefensiveMech: defensiveMechImg,
};

const slideVariants = {
  enter: (direction) => ({
    x: direction === "right" ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction) => ({
    x: direction === "right" ? "-100%" : "100%",
    opacity: 0,
    scale: 0.9,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

const cardVariants = {
  animate: (offset) => ({
    x: offset * 320,
    scale: offset === 0 ? 1.05 : 0.85, 
    opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.5,
    zIndex: offset === 0 ? 10 : 5 - Math.abs(offset),
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 28,
    },
  }),
};

function MechCarousel({ mechs }) {
  const n = mechs.length;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => setSelectedIndex((i) => (i - 1 + n) % n),
    [n]
  );
  
  const scrollNext = useCallback(
    () => setSelectedIndex((i) => (i + 1) % n),
    [n]
  );

  const getOffset = (index) => {
    let raw = index - selectedIndex;
    if (raw > n / 2) raw -= n;
    if (raw < -n / 2) raw += n;
    return raw;
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  return (
    <div className="relative py-8 px-4 md:px-16 overflow-hidden">
      <div className="relative h-[480px] w-full flex items-center justify-center overflow-hidden">
        {mechs.map((mech, index) => {
          const offset = getOffset(index);

          return (
            <motion.div
              key={mech.idMech ?? index}
              custom={offset}
              variants={cardVariants}
              animate="animate"
              onClick={() => setSelectedIndex(index)}
              className="absolute cursor-pointer"
            >
              <MechCard mech={mech} isFocused={offset === 0} />
            </motion.div>
          );
        })}

        <button
          onClick={scrollPrev}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-14 h-14 rounded-[18px] bg-[#100814]/90 border border-cyan-400/30 text-cyan-200 hover:text-white hover:border-cyan-300 shadow-[0_0_22px_rgba(56,189,248,0.25)] transition-all z-30 flex items-center justify-center"
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 6 8 12l9 6" />
          </svg>
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-14 h-14 rounded-[18px] bg-[#100814]/90 border border-cyan-400/30 text-cyan-200 hover:text-white hover:border-cyan-300 shadow-[0_0_22px_rgba(56,189,248,0.25)] transition-all z-30 flex items-center justify-center"
          aria-label="Próximo"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6l9 6-9 6" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 z-30 relative">
        {mechs.map((mech, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={mech.idMech ?? index}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Ir para ${mech.model}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                isActive
                  ? "w-10 bg-gradient-to-r from-cyber-pink to-fuchsia-400 shadow-[0_0_12px_2px_rgba(255,45,130,0.65)]"
                  : "w-5 bg-white/15 hover:bg-white/35"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

function MechCard({ mech, isFocused }) {
  const isAttack = mech.model === "AttackMech";

  return (
    <div
      className={`w-[300px] md:w-[320px] border rounded-3xl p-6 transition-colors duration-300 ${
        isFocused
          ? "border-cyber-pink/80 bg-[#1A1122]/95 shadow-[0_0_30px_rgba(236,72,153,0.3)] text-white"
          : "border-white/10 bg-[#1A1122]/60 text-white/60"
      }`}
    >
      <div className="w-full h-36 flex items-center justify-center mb-4">
        <img
          src={mechImages[mech.model] ?? attackMechImg}
          alt={mech.model}
          className="h-full object-contain pointer-events-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
        />
      </div>
      <p className="text-lg font-serif text-white mb-4 text-center tracking-wide">
        {mech.model}
      </p>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>Vida</span>
          <span>
            {mech.currentHealth}/{mech.maxHealth}
          </span>
        </div>
        <div className="overflow-hidden rounded-full bg-black/50 h-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-400"
            style={{
              width: `${Math.min(
                100,
                Math.max(0, (mech.currentHealth / mech.maxHealth) * 100)
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>Bateria</span>
          <span>{mech.battery}%</span>
        </div>
        <div className="overflow-hidden rounded-full bg-black/50 h-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500"
            style={{ width: `${Math.min(100, Math.max(0, mech.battery))}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-xs text-white/60 mt-4 pt-3 border-t border-white/10">
        {isAttack ? (
          <span>Heat: {mech.heatLevel}%</span>
        ) : (
          <span className={mech.shieldActive ? "text-cyan-300" : "text-white/45"}>
            {mech.shieldActive ? "Escudo ativo" : "Escudo inativo"}
          </span>
        )}
        <span className="text-cyber-gold font-semibold">ATK {mech.attackPower}</span>
      </div>
    </div>
  );
}

function Garage() {
  const [mechs, setMechs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const TEMP_ID = "player-001";
    mechService.getMechsByPlayer(TEMP_ID)
      .then(setMechs)
      .catch((err) => { console.error("Erro ao carregar mechs:", err); setMechs([]); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-cyber-dark min-h-screen">
      <div
        className="relative w-full min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundGarage})` }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(13, 10, 31, 0.70)" }}
        />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <div className="max-w-5xl mx-auto px-6 md:px-10 pt-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80 mb-2 pb-2">
              UNIDADES DISPONÍVEIS
            </p>
          </div>

          <div className="relative mt-2">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-cyan-300 text-sm uppercase tracking-widest animate-pulse">Carregando...</p>
              </div>
            ) : mechs.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-white/40 text-sm">Nenhum mech encontrado.</p>
              </div>
            ) : (
              <MechCarousel mechs={mechs} />
            )}
          </div>

          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Garage;