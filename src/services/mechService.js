import api from "./api";

export const mechService = {
  getMechsByPlayer: async (playerId) => {
    const response = await api.get("/mechs", { params: { playerId } });
    return response.data;
  },

  deleteMech: async (idMech) => {
    await api.delete(`/mechs/${idMech}`);
  },
};
