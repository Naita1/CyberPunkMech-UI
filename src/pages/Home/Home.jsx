import ParallaxBackground from '../../components/layout/ParallaxBackground/ParallaxBackground';
import Navbar from '../../components/common/Navbar/Navbar';
import Button from '../../components/common/Button/Button';
import Footer from '../../components/layout/Footer/Footer';

function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden text-cyber-light">
      <ParallaxBackground />
      <Navbar />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-10 text-center sm:px-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-semibold uppercase tracking-[0.3em] text-white [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)] sm:text-6xl lg:text-7xl">
            Cyber Punk Mech
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm uppercase tracking-[0.28em] text-cyan-100/90 sm:text-base"
             style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' }}>
            Nas ruas sombrias da metrópole neon, assuma o controle de Mechs customizados em combates táticos.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="primary">Iniciar</Button>
            <Button variant="secondary">Como jogar</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;