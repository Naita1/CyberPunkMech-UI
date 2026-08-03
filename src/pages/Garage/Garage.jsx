import { useState, useCallback, useEffect, useRef } from "react";
import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import backgroundGarage from "../../assets/images/background-garage.jpg";
import attackMechImg from "../../assets/mechs/AttackMech/Parado-Direita.png";
import defensiveMechImg from "../../assets/mechs/DefensiveMech/Parado-Direita.png";
const mockGarage = [
  {
    id: "1",
    model: "Raptor-X",
    type: "ATTACK",
    currentHealth: 72,
    maxHealth: 100,
    battery: 72,
    attackPower: 40,
    heatLevel: 40,
  },
  {
    id: "2",
    model: "Aegis-7",
    type: "DEFENSIVE",
    currentHealth: 95,
    maxHealth: 100,
    battery: 88,
    attackPower: 25,
    isShieldActive: true,
  },
  {
    id: "3",
    model: "Raptor-X",
    type: "ATTACK",
    currentHealth: 60,
    maxHealth: 100,
    battery: 45,
    attackPower: 40,
    heatLevel: 70,
  },
  {
    id: "4",
    model: "Aegis-7",
    type: "DEFENSIVE",
    currentHealth: 100,
    maxHealth: 100,
    battery: 100,
    attackPower: 25,
    isShieldActive: false,
  },
];
const mechImages = {
  ATTACK: attackMechImg,
  DEFENSIVE: defensiveMechImg,
};
function MechCard({ mech, distance }) {
  const isAttack = mech.type === "ATTACK";
  const isFocused = distance === 0;
  const highlightClass = isFocused
    ? "border-cyber-pink/60 ring-1 ring-cyber-pink/30 scale-110 shadow-[0_0_30px_rgba(236,72,153,0.24)] text-white"
    : distance === 1
    ? "border-white/15 bg-[#1A1122]/90 scale-95 text-white/80"
    : "border-white/10 bg-[#1A1122]/80 scale-90 text-white/70";
  return (
    <div
      className={`border rounded-3xl p-5 origin-bottom w-[280px] transition-all duration-300 ${highlightClass}`}
    >
      <div className="w-full h-30 flex items-center justify-center mb-4">
        <img
          src={mechImages[mech.type]}
          alt={mech.model}
          className="h-full object-contain"
        />
      </div>
      <p className="text-base font-serif text-white mb-4 text-center">{mech.model}</p>
      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/50 mb-1.5">
          <span>Vida</span>
          <span>{mech.currentHealth}/{mech.maxHealth}</span>
        </div>
        <div className="bg-black/40 rounded h-2">
          <div
            className="bg-cyber-pink h-full rounded"
            style={{ width: `${(mech.currentHealth / mech.maxHealth) * 100}%` }}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/50 mb-1.5">
          <span>Bateria</span>
          <span>{mech.battery}%</span>
        </div>
        <div className="bg-black/40 rounded h-2">
          <div
            className="bg-cyan-400 h-full rounded"
            style={{ width: `${mech.battery}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between text-xs text-white/50 mt-4 pt-3 border-t border-white/5">
        {isAttack ? (
          <span>Heat: {mech.heatLevel}%</span>
        ) : (
          <span className={mech.isShieldActive ? "text-cyan-300" : "text-white/45"}>
            {mech.isShieldActive ? "Escudo ativo" : "Escudo inativo"}
          </span>
        )}
        <span className="text-cyber-gold font-medium">ATK {mech.attackPower}</span>
      </div>
    </div>
  );
}
function MechSlot({ mech, offset, distance, skipEnterAnimation, onClick }) {

  const [entered, setEntered] = useState(skipEnterAnimation);

  useEffect(() => {
    if (entered) return;
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const direction = Math.sign(offset) || 1;
  const enterOffset = offset + direction; 
  const currentOffset = entered ? offset : enterOffset;

  const translateY = offset === 0 ? -16 : distance === 1 ? 10 : 26;
  const scale = offset === 0 ? 1.12 : distance === 1 ? 0.85 : 0.68;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      onClick={onClick}
      style={{
        transform: `translate(-50%, -50%) translateX(${currentOffset * 300}px) translateY(${translateY}px) scale(${scale})`,
        zIndex: 10 - distance,
        cursor: offset === 0 ? "grab" : "pointer",
        transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <MechCard mech={mech} distance={distance} />
    </div>
  );
}

function MechCarousel({ mechs }) {
  const n = mechs.length;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dragState = useRef({ startX: 0, dragging: false });
  const isInitialMountRef = useRef(true);
  useEffect(() => {
    isInitialMountRef.current = false;
  }, []);
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
  const maxVisibleDistance = Math.floor((n - 1) / 2);
  const onPointerDown = (e) => {
    dragState.current = { startX: e.clientX, dragging: true, moved: false };
  };
  const onPointerMoveStage = (e) => {
    if (!dragState.current.dragging) return;
    if (Math.abs(e.clientX - dragState.current.startX) > 8) {
      dragState.current.moved = true;
    }
  };
  const onPointerUp = (e) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.startX;
    if (delta < -60) scrollNext();
    else if (delta > 60) scrollPrev();
    dragState.current.dragging = false;
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
      <div
        className="relative py-10 px-4 md:px-16 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
      <div
        className="relative h-[440px] w-full select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMoveStage}
        onPointerUp={onPointerUp}
        onPointerLeave={() => (dragState.current.dragging = false)}
      >
        {mechs.map((mech, index) => {
          const offset = getOffset(index);
          const distance = Math.abs(offset);
          const isHidden = distance > maxVisibleDistance;

          if (isHidden) return null;

          return (
            <MechSlot
              key={mech.id}
              mech={mech}
              offset={offset}
              distance={distance}
              skipEnterAnimation={isInitialMountRef.current}
              onClick={() => {
                if (offset === 0) return;
                if (dragState.current.moved) return;
                setSelectedIndex(index);
              }}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 mt-6">
        {mechs.map((mech, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={mech.id}
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
      <button
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-[18px] bg-[#100814]/95 border border-cyan-400/20 text-cyan-200/80 shadow-[0_0_22px_rgba(56,189,248,0.25)] transition-all duration-300 hover:text-cyan-100 hover:border-cyan-300/70 hover:shadow-[0_0_32px_rgba(56,189,248,0.45)] flex items-center justify-center z-20"
        aria-label="Anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 6 8 12l9 6" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-[18px] bg-[#100814]/95 border border-cyan-400/20 text-cyan-200/80 shadow-[0_0_22px_rgba(56,189,248,0.25)] transition-all duration-300 hover:text-cyan-100 hover:border-cyan-300/70 hover:shadow-[0_0_32px_rgba(56,189,248,0.45)] flex items-center justify-center z-20"
        aria-label="Próximo"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6l9 6-9 6" />
        </svg>
      </button>
    </div>
  );
}
function Garage() {
  const [mechs] = useState(mockGarage);
  return (
    <div className="bg-cyber-dark">
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
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80 mb-2 pb-10">
             UNIDADES DISPONÍVEIS
            </p>
          </div>
          <div className="relative mt-8">
            <div className="pointer-events-none absolute inset-0 mx-auto w-full max-w-5xl">
              <div
                className="absolute inset-0 rounded-[2rem]"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(20, 15, 44, 0.42), rgba(13, 10, 31, 0.76) 55%, rgba(13,10,31,1) 100%)",
                }}
              />
            </div>
            <MechCarousel mechs={mechs} />
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