import { createContext, useContext, useState, useEffect } from "react";
import { playerService } from "../services/playerService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("player");
    if (!saved) { setChecking(false); return; }
    const parsed = JSON.parse(saved);
    playerService.getPlayerById(parsed.idPlayer)
      .then((data) => { if (data) setPlayer(data); else localStorage.removeItem("player"); })
      .catch(() => localStorage.removeItem("player"))
      .finally(() => setChecking(false));
  }, []);

  const login = async (name, password) => {
  
    const data = await playerService.getPlayerById(name);
    if (!data) throw new Error("Piloto não encontrado.");
    localStorage.setItem("player", JSON.stringify(data));
    setPlayer(data);
    return data;
  };

  const register = async (name, password) => {
    const existing = await playerService.getPlayerById(name).catch(() => null);
    if (existing) throw new Error("Nome já está em uso.");
    const newPlayer = { idPlayer: name, namePlayer: name};
    await playerService.savePlayer(newPlayer);
    localStorage.setItem("player", JSON.stringify(newPlayer));
    setPlayer(newPlayer);
    return newPlayer;
  };

  const logout = () => {
    localStorage.removeItem("player");
    setPlayer(null);
  };

  return (
    <AuthContext.Provider value={{ player, login, register, logout, checking }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
