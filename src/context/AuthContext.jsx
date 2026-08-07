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
    let data;
    try {
      data = await playerService.login(name, password);
    } catch (err) {
      throw new Error("Piloto ou senha inválidos.");
    }
    localStorage.setItem("player", JSON.stringify(data));
    setPlayer(data);
    return data;
  };

  const register = async (name, password) => {
    let data;
    try {
      data = await playerService.savePlayer({ namePlayer: name, password });
    } catch (err) {
      if (err.response?.status === 409) {
        throw new Error("Nome já está em uso.");
      }
      throw new Error("Não foi possível criar o piloto.");
    }
    localStorage.setItem("player", JSON.stringify(data));
    setPlayer(data);
    return data;
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