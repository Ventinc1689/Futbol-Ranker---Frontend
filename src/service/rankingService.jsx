import api from '../api/config.js'

export const rankingService = {
    searchPlayers: async (searchTerm) => {
        const params = new URLSearchParams();
        if (searchTerm.name) params.append('name', searchTerm.name);
        return await api.get(`/player/search?${params}`); 
    },

    fetchAllPlayers: async () => {
        return await api.get('/player');
    },

    getMyRankings: async (category = 'TOP_25') => {
        return await api.get(`/rankings/my-rankings?category=${category}`);
    },

    getPlayerRankings: async (playerId, category = "TOP_25") => {
        return await api.get(`/rankings/player/${playerId}?category=${category}`);
    },

    getPlayerById: async (playerId) => {
        return await api.get(`/player/${playerId}`);
    },

    rankPlayer: async (rankingData) => {
        return await api.post('/rankings', {
            playerId: rankingData.playerId,
            ranking: rankingData.ranking,
            category: rankingData.category 
        });
    },

    getOverallRankings: async (category = 'TOP_25', minVotes = 3) => {
        return await api.get(`/rankings/overall?category=${category}&minVotes=${minVotes}`);
    },

    deleteRanking: async (playerId, category = 'TOP_25') => {
        return await api.delete(`/rankings/player/${playerId}?category=${category}`);
    },

    getMyCategories: async () => {
        return await api.get('/rankings/my-categories');
    },

    getAllCategories: async () => {
        return await api.get('/rankings/categories');
    }
};