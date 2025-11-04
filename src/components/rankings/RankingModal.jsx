import React, { useState } from 'react';
import { rankingService } from '../../service/rankingService.jsx';

const RankingModal = ({ player, isOpen, onClose, onSuccess, selectedRanking }) => {
  const [ranking, setRanking] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const category = checkCategory(selectedRanking);
        const rankingValue = parseInt(ranking);
        const maxLimit = getRankingLimit(selectedRanking);

        // Add validation before submitting
        if (rankingValue < 1 || rankingValue > maxLimit) {
            setError(`Ranking must be between 1 and ${maxLimit}`);
            setLoading(false);
            return;
        }

        try {
            await rankingService.rankPlayer({
                playerId: player.id,
                ranking: rankingValue,
                category: category
            });
            onSuccess();
            onClose();
            setRanking('');
        } catch (error) {
            console.error('Error ranking player:', error);
            setError(error.response?.data?.message || 'Failed to rank player');
        } finally {
            setLoading(false);
        }
    };

    const checkCategory = (selectedRanking) => {
        switch (selectedRanking) {
            case 'Top 25':
                return 'TOP_25';
            case 'Top Forwards':
                return 'TOP_FORWARDS';
            case 'Top Midfielders':
                return 'TOP_MIDFIELDERS';
            case 'Top Defenders':
                return 'TOP_DEFENDERS';
            case 'Top Goalkeepers':
                return 'TOP_GOALKEEPERS';
            case 'Top Active':
                return 'TOP_ACTIVE';
            default:
                return 'TOP_25';
        }
    }

    const getRankingLimit = (selectedRanking) => {
        switch (selectedRanking) {
            case 'Top 25':
                return 25;
            case 'Top Active':
                return 25; 
            case 'Top Forwards':
            case 'Top Midfielders':
            case 'Top Defenders':
            case 'Top Goalkeepers':
                return 15; 
            default:
                return 25;
        }
    }

    const getCategoryDisplayName = (selectedRanking) => {
        return selectedRanking || 'Top 25';
    }

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gradient-to-bl from-black to-gray-700 bg-opacity-50 flex items-center justify-center z-50 w-full h-full">
            <div className="bg-gray-600 rounded-lg p-6 w-156 max-w-90vw m-8">
                <h2 className="text-[30px] font-bold text-amber-400 mb-6">
                    Rank Player - {getCategoryDisplayName(selectedRanking)}
                </h2>
                
                <label className="block text-white text-[20px] font-semibold mb-3">
                    Player Info
                </label>
                <div className="mb-8 p-5 bg-gray-700 rounded-lg">
                    <h3 className="font-semibold text-[19px] text-white mb-3">{player.name}</h3>
                    <p className="text-[16px] text-gray-300">
                        {player.position} • {player.club} • {player.nation} {player.retired && ' • Retired'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-white text-[20px] font-semibold mb-3">
                            Ranking (1-{getRankingLimit(selectedRanking)})
                        </label>
                        <input
                            type="number"
                            min="1"
                            max={getRankingLimit(selectedRanking)}
                            value={ranking}
                            onChange={(e) => setRanking(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-600 rounded-lg">
                            <p className="text-white text-md font-semibold">{error}</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-colors"
                            disabled={loading || error}
                        >
                            {loading ? 'Loading...' : 'Rank Player'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RankingModal
