import React, { useState, useEffect } from 'react'


const CommunityRankings = () => {
    const [selectedRanking, setSelectedRanking] = useState('Top 25');

    return (
        <div className="text-white min-h-screen pt-20 lg:pt-10 px-8 lg:px-10 ml-20">
            <div className="flex flex-col mt-20">
                <div className="">
                    <h1 className="font-semibold text-[35px]">Community Ranking</h1>
                    <p className="mt-2 text-[18px] mb-8">View the top players ranked by all futbol fans</p>
                </div>
            </div>
        </div>
    )
}

export default CommunityRankings
