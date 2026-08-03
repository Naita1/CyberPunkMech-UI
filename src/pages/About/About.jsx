import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import fundo from "../../assets/images/backgroung-about.jpg";

const cardStyle = { backgroundColor: "rgba(16, 8, 20, 0.82)" };

function InfoCard({ label, children }) {
  return (
    <section className="rounded-2xl border border-white/10 backdrop-blur-sm p-5" style={cardStyle}>
      <p className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">{label}</p>
      {children}
    </section>
  );
}

function StackRow({ layer, tools }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-sm text-white/50 uppercase tracking-wide">{layer}</span>
      <span className="text-sm text-white">{tools}</span>
    </div>
  );
}

export default function Sobre() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fundo})` }} />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(19, 15, 42, 0.78)" }} />

      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        <main className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-6 py-4 gap-3">
          <h1 className="text-2xl font-serif tracking-[0.2em] uppercase text-white">Sobre</h1>

          <InfoCard label="O Projeto">
            <p className="text-sm text-white/70 leading-relaxed">
              Cyber Punk Mech é um projeto pessoal de RPG tático: o jogador monta e gerencia
              mechs customizados numa metrópole neon para enfrentá-los em combate. A proposta foi construir o front-end
              sem bibliotecas de componentes prontos — tudo estilizado à mão com Tailwind —
              e uma API própria focada em modelar bem os dados de jogadores e robôs.
            </p>
          </InfoCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard label="Quem fez">
              <p className="text-sm text-white/70 leading-relaxed">
                Feito por Tainá Cristina de Lima Ribeiro, estudante de ADS no IFSP e
                estagiária de desenvolvimento de software. Projeto usado pra praticar
                front-end em React e back-end em Java.
              </p>
            </InfoCard>

            <InfoCard label="Stack técnica">
              <StackRow layer="Front-end" tools="React + Tailwind CSS" />
              <StackRow layer="Back-end" tools="Java 23 + Spring Boot 3" />
              <StackRow layer="Banco de dados" tools="Google Firestore" />
            </InfoCard>
          </div>

          <InfoCard label="Código">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/Naita1/CyberPunkMech-API"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between flex-1 group"
              >
                <span className="flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                  <FaGithub size={16} className="text-cyan-400" />
                  CyberPunkMech-API
                </span>
                <ExternalLink size={14} className="text-white/40 group-hover:text-white transition-colors" />
              </a>
              <div className="hidden sm:block w-px bg-white/10" />
              <a
                href="https://github.com/Naita1/CyberPunkMech-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between flex-1 group"
              >
                <span className="flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                  <FaGithub size={16} className="text-cyan-400" />
                  CyberPunkMech-UI
                </span>
                <ExternalLink size={14} className="text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>
          </InfoCard>
        </main>

        <Footer />
      </div>
    </div>
  );
}