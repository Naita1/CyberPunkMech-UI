import { useState } from 'react';
import background from '../../assets/images/background.jpg';
import Navbar from '../../components/common/Navbar/Navbar';
import Button from '../../components/common/Button/Button';
import Footer from '../../components/layout/Footer/Footer';


const MECHS = [
  {
    id: 'ronin-mk1',
    nome: 'Ronin Mk1',
    descricao: 'Unidade leve de reconhecimento, alta mobilidade em terreno urbano.',
    preco: 20,
    raridade: 'Comum',
  },
  {
    id: 'sombra-v2',
    nome: 'Sombra V2',
    descricao: 'Unidade furtiva com sistema de camuflagem ótica ativa.',
    preco: 35,
    raridade: 'Raro',
  },
  {
    id: 'vandal-x',
    nome: 'Vandal X',
    descricao: 'Unidade de assalto pesado, blindagem reforçada e canhão duplo.',
    preco: 60,
    raridade: 'Épico',
  },
  {
    id: 'corvo-3',
    nome: 'Corvo III',
    descricao: 'Unidade de suporte aéreo com propulsores de curto alcance.',
    preco: 45,
    raridade: 'Raro',
  },
];

const RARITY_STYLES = {
  Comum: 'border-white/20 text-cyber-light/70',
  Raro: 'border-cyan-300/50 text-cyan-200',
  Épico: 'border-fuchsia-400/50 text-fuchsia-200',
};

function MechIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-16 w-16 text-cyan-200/80"
      stroke="currentColor"
    >
      <rect x="24" y="6" width="16" height="14" rx="2" strokeWidth="2" />
      <rect x="16" y="22" width="32" height="22" rx="3" strokeWidth="2" />
      <line x1="12" y1="26" x2="16" y2="30" strokeWidth="2" />
      <line x1="52" y1="26" x2="48" y2="30" strokeWidth="2" />
      <rect x="20" y="46" width="8" height="14" rx="2" strokeWidth="2" />
      <rect x="36" y="46" width="8" height="14" rx="2" strokeWidth="2" />
      <circle cx="32" cy="30" r="4" strokeWidth="2" />
    </svg>
  );
}

function Shop() {
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [owned, setOwned] = useState(() => new Set());

  const handleBuy = (mech) => {
    if (owned.has(mech.id) || coins < mech.preco) return;
    setCoins((prev) => prev - mech.preco);
    setOwned((prev) => new Set(prev).add(mech.id));

  };

  const hasUnaffordable = MECHS.some(
    (m) => !owned.has(m.id) && coins < m.preco
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden text-cyber-light">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(19, 15, 42, 0.70)' }}
      />

      <Navbar />

      <main className="relative z-10 flex flex-1 flex-col px-6 pb-16 pt-10 sm:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-3xl font-semibold uppercase tracking-[0.3em] text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)] sm:text-4xl"
            >
              Loja de Mechs
            </h1>
            <p
              className="mt-2 text-xs uppercase tracking-[0.28em] text-cyan-100/80 sm:text-sm"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
            >
              Equipe sua garagem com novas unidades
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-amber-300/40 bg-amber-400/10 px-5 py-2 sm:self-auto">
            <span className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.7)]" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
              {coins} coins
            </span>
          </div>
        </div>

        {hasUnaffordable && (
          <div className="mx-auto mt-6 w-full max-w-6xl rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/10 px-5 py-3 text-xs uppercase tracking-[0.15em] text-fuchsia-200 sm:text-sm">
            Saldo insuficiente para uma ou mais unidades abaixo.
          </div>
        )}

        <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MECHS.map((mech) => {
            const isOwned = owned.has(mech.id);
            const canAfford = coins >= mech.preco;

            return (
              <div
                key={mech.id}
                className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-cyber-dark/40 backdrop-blur-sm transition hover:border-cyan-300/40"
              >
                <div className="relative flex h-36 items-center justify-center border-b border-white/10 bg-black/20">
                  <span
                    className={`absolute left-3 top-3 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${RARITY_STYLES[mech.raridade]}`}
                  >
                    {mech.raridade}
                  </span>
                  <MechIcon />
                </div>

                <div className="flex flex-1 flex-col gap-1 p-4 text-left">
                  <h3 className="text-base font-semibold uppercase tracking-wide text-white">
                    {mech.nome}
                  </h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-cyber-light/60">
                    {mech.descricao}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-300">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                      {mech.preco}
                    </span>

                    <Button
                      variant={isOwned ? 'secondary' : 'primary'}
                      disabled={isOwned || !canAfford}
                      onClick={() => handleBuy(mech)}
                    >
                      {isOwned ? 'Adquirido' : 'Comprar'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Shop;