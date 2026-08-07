import api from "./api";

export const playerService = {
  getPlayerById: async (idPlayer) => {
    const response = await api.get(`/players/${idPlayer}`);
    return response.data;
  },

  savePlayer: async (playerData) => {
    const response = await api.post("/players", playerData);
    return response.data;
  },

  login: async (namePlayer, password) => {
    const response = await api.post("/players/login", { namePlayer, password });
    return response.data; 
  },

  deletePlayer: async (idPlayer) => {
    await api.delete(`/players/${idPlayer}`);
  },
};