import React from 'react'
import Remove from '../../assets/Remove.svg';

const RankingTable = ({ rankings, loading, error, onDeleteRanking }) => {
    if (loading) {
        return (
            <div className="mt-5 w-full text-white rounded-lg border-3 border-amber-500 p-8 text-center">
                <div className="text-amber-400">Loading your rankings...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-5 w-full text-white rounded-lg border-3 border-amber-500 p-8 text-center">
                <div className="text-amber-400">Please login or start your rankings.</div>
            </div>
        );
    }

    if (rankings.length === 0) {
        return (
            <div className="mt-5 w-full text-white rounded-lg border-3 border-amber-500 p-8 text-center">
                <div className="text-amber-400">No rankings found.</div>
            </div>
        );
    }

    return (
        <div className="mt-5 w-full text-white rounded-lg">
            <div>
                {/* Table Header
                <ul className="flex items-center flex-row p-5 bg-gray-900 text-amber-400 font-semibold">
                    <li className="w-3/14">Player</li>
                    <li className="w-2/14">Nation</li>
                    <li className="w-2/14">Position</li>
                    <li className="w-3/14">Clubs</li>
                    <li className="w-2/14">Status</li>
                    <li className="w-1/14">Rank</li>
                    <li className="w-1/14 justify-end flex">Delete</li>
                </ul> */}

                {/* Table Body */}
                <div className=" overflow-y-auto">
                    {rankings.map((ranking, index) => (
                        <ul 
                            key={ranking.rankId} 
                            className={`flex items-center flex-row p-4 border-2 border-gray-600 mb-1 rounded-lg hover:bg-gray-500 transition-all duration-200 ${
                                index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                            }`}
                        >
                            <li className="w-3/14 font-medium">{ranking.playerName}</li>
                            <li className="w-2/14">{ranking.playerNation || 'N/A'}</li>
                            <li className="w-2/14">{ranking.playerPosition || 'N/A'}</li>
                            <li className="w-3/14 flex mr-3">{ranking.playerClub || 'N/A'}</li>
                            <li className="w-2/14">{ranking.playerRetired ? 'Retired' : 'Active'}</li>
                            <li className="w-1/14 flex">
                                <span className="bg-amber-500 text-black px-3 py-1 rounded-full font-bold">
                                    #{ranking.ranking}
                                </span>
                                
                            </li>
                            <button
                                onClick={() => onDeleteRanking(ranking.playerId)}
                                className="cursor-pointer w-1/14 flex justify-end pr-4"
                                title="Delete ranking"
                            >
                                <img src={Remove} alt="Remove" className="w-5 h-5" />
                            </button>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RankingTable
