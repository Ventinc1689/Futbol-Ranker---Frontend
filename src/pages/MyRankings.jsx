import React, { useState, useEffect } from 'react'
import SearchFilter from '../components/rankings/SearchFilter.jsx';
import RankingTable from '../components/rankings/RankingTable.jsx';
import { rankingService } from '../service/rankingService.jsx';

const MyRankings = () => {
    const [selectedRanking, setSelectedRanking] = useState('Top 25');
    const [searchTerm, setSearchTerm] = useState('');
    const [rankings, setRankings] = useState([]);
    const [filteredRankings, setFilteredRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState({
        nation: '',
        club: '',
        position: '',
        retired: ''
    });

    const getCategory = (selectedRanking) => {
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
    };

    useEffect(() => {
        fetchRankings();
    }, [selectedRanking]);

    useEffect(() => {
        filterRankings();
    }, [rankings, selectedRanking, appliedFilters]);

    const fetchRankings = async () => {
        try {
            setLoading(true);
            setError(null);
            const category = getCategory(selectedRanking);
            const response = await rankingService.getMyRankings(category);
            setRankings(response.data || []);
        } catch (error) {
            console.log('Error fetching rankings:', error);
            setError('Failed to fetch rankings. Please try again later.');
            setRankings([]);
        } finally {
            setLoading(false);
        }
    }

    const filterRankings = () => {
        let filtered = rankings;

        

        if (appliedFilters.nation) {
            filtered = filtered.filter(ranking =>
                ranking.playerNation.toLowerCase().includes(appliedFilters.nation.toLowerCase())
            );
        }

        if (appliedFilters.club) {
            filtered = filtered.filter(ranking =>
                ranking.playerClub.toLowerCase().includes(appliedFilters.club.toLowerCase())
            );
        }

        if (appliedFilters.position) {
            filtered = filtered.filter(ranking =>
                ranking.playerPosition.toLowerCase().includes(appliedFilters.position.toLowerCase())
            );
        }

        if (appliedFilters.retired !== '') {
            filtered = filtered.filter(ranking =>
                ranking.playerRetired === (appliedFilters.retired === 'true')
            );
        }

        // Sort by ranking (1 should be first)
        filtered.sort((a, b) => a.ranking - b.ranking);

        setFilteredRankings(filtered);
    };

    const handleDeleteRanking = async (playerId) => {
        if (window.confirm('Are you sure you want to delete this ranking?')) {
            try {
                const category = getCategory(selectedRanking);
                await rankingService.deleteRanking(playerId, category);
                setRankings(rankings.filter(r => r.playerId !== playerId));
            } catch (error) {
                console.error('Error deleting ranking:', error);
                setError('Failed to delete ranking');
            }
        }
    };

    const handlePlayerRanked = () => {
        fetchRankings(); 
    };

    return (
        <div className="pt-10 md:pt-16 px-0 md:ml-[60px] md:px-8 min-h-screen text-white mt-10">
            <div className="flex flex-col w-full p-6 rounded-lg shadow-lg">
                <div className="">
                    <h1 className="font-semibold text-[30px] md:text-[35px]">Your Rankings</h1>
                    <p className="mt-2 text-[18px] mb-8">View all your rankings here</p>
                </div>
                
                <SearchFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onPlayerRanked={handlePlayerRanked}
                    selectedRanking={selectedRanking}
                    setSelectedRanking={setSelectedRanking}
                />
                
                <RankingTable 
                    rankings={filteredRankings}
                    loading={loading}
                    error={error}
                    onDeleteRanking={handleDeleteRanking}
                    selectedRanking={selectedRanking}
                />
            </div> 
        </div>
    )
}

export default MyRankings

 //<RankingTabs selectedRanking={selectedRanking} setSelectedRanking={setSelectedRanking}/>