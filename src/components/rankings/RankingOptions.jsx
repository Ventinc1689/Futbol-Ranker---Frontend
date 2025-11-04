import React from 'react'

const RankingOptions = ({ selectedRanking, setSelectedRanking, onClose}) => {

    const rankings = ['Top 25', 'Top Forwards', 'Top Midfielders', 'Top Defenders', 'Top Goalkeepers', 'Top Active'];

    const handleRankingClick = (ranking) => {
        setSelectedRanking(ranking);
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border-3 border-amber-500 rounded-lg mt-1 p-4 z-60 w-60">
            <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-amber-400">Choose Rankings</p>
                <button
                    className="text-white hover:text-amber-400 text-xl font-semibold"
                    onClick={onClose}
                >
                    x
                </button>
            </div>

            <hr className="my-3 " />

            <div className="flex flex-col">
                <ul className="flex flex-col space-y-2">
                    {rankings.map((ranking) => (
                        <li key={ranking}>
                            <input 
                                type="radio"
                                name="ranking"
                                checked={selectedRanking === ranking}
                                onChange={() => handleRankingClick(ranking)}
                                className={`mr-2 form-radio ${
                                    selectedRanking === ranking 
                                        ? 'accent-amber-400' 
                                        : ''
                                }`}
                            />
                            <span>{ranking}</span>
                        </li>
                    ))}
                </ul>
            </div>
        
        </div>
    )
}

export default RankingOptions