import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative z-10 flex items-end px-6 pb-6 sm:px-10">
      <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-cyan-100/70">
        <span>Me siga</span>
        <div className="flex gap-2">
          <a
            href="https://github.com/Naita1"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-300/60 p-2 transition hover:border-cyan-200 hover:text-cyan-200"
            aria-label="GitHub"
          >
            <FaGithub size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/taina-cl-ribeiro/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-300/60 p-2 transition hover:border-cyan-200 hover:text-cyan-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;