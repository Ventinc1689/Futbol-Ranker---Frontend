import React, { useState, useEffect, useRef } from 'react';
import Search from '../../assets/Search.svg';
import Filter from '../../assets/Filter.svg';
import { rankingService } from '../../service/rankingService.jsx';
import RankingOptions from './RankingOptions.jsx';
import RankingModal from './RankingModal';
import FilterDropdown from './FilterDropDown';
import List from '../../assets/List.svg';

const SearchFilter = ({ searchTerm, setSearchTerm, onPlayerRanked, selectedRanking, setSelectedRanking }) => {
    const [playerResults, setPlayerResults] = useState([]);
    const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showRankingModal, setShowRankingModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showRankingOptions, setShowRankingOptions] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchFilter, setSearchFilter] = useState({
        nation: '',
        club: '',
        position: '',
        retired: ''
    });
    const dropdownRef = useRef(null);
    const filterDropdownRef = useRef(null);
    const rankingOptionsRef = useRef(null);

    const getAllowedPositions = (selectedRanking) => {
        switch (selectedRanking) {
            case 'Top Forwards':
                return ['ST', 'LW', 'RW'];
            case 'Top Midfielders':
                return ['CM', 'CAM', 'CDM', 'LM', 'RM'];
            case 'Top Defenders':
                return ['CB', 'LB', 'RB'];
            case 'Top Goalkeepers':
                return ['GK'];
            case 'Top Active':
            case 'Top 25':
            default:
                return null;
        }
    }

    const filterPlayersByTab = (players) => {
        const allowedPositions = getAllowedPositions(selectedRanking);

        if (!allowedPositions){
            return players;
        }

        return players.filter(player => {
            if (!player.position) return false;
            
            // Split comma-separated positions and trim whitespace
            const playerPositions = player.position.split(',').map(pos => pos.trim());
            
            // Check if ANY of the player's positions are in the allowed list
            return playerPositions.some(pos => allowedPositions.includes(pos));
        });
    }

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close player dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowPlayerDropdown(false);
                setPlayerResults([]);
                setIsFocused(false);
                setSearchTerm('');
            }
            
            // Close filter dropdown
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilterDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setSearchTerm]);

    //Apply filters to player results
    const applyFiltersToResults = (players) => {
        let filteredPlayers = players;

        filteredPlayers = filterPlayersByTab(filteredPlayers);

        if (selectedRanking === 'Top Active') {
            filteredPlayers = filteredPlayers.filter(player => !player.retired);
        }

        if (searchFilter.nation) {
            filteredPlayers = filteredPlayers.filter(player =>
                player.nation?.toLowerCase().includes(searchFilter.nation.toLowerCase())
            );
        }

        if (searchFilter.club) {
            filteredPlayers = filteredPlayers.filter(player =>
                player.club?.toLowerCase().includes(searchFilter.club.toLowerCase())
            );
        }

        if (searchFilter.position) {
            filteredPlayers = filteredPlayers.filter(player => 
                player.position?.toLowerCase().includes(searchFilter.position.toLowerCase())
            );
        }

        if (searchFilter.retired !== '') {
            const isRetired = searchFilter.retired === 'true';
            filteredPlayers = filteredPlayers.filter(player => 
                player.retired === isRetired
            );
        }

        return filteredPlayers;
    }

    // Search player names based on input 
    useEffect(() => {
        const searchPlayersForRanking = async () => {
            if (searchTerm.length >= 1 || isFocused) {
                setLoading(true);

                if (!showPlayerDropdown) {
                    setShowPlayerDropdown(true);
                }

                try {
                    let response;
                    
                    if (searchTerm.length >= 1) {
                        response = await rankingService.searchPlayers({ name: searchTerm });
                    } else {
                        response = await rankingService.fetchAllPlayers();
                    }

                    const filteredResults = applyFiltersToResults(response.data || []);
                    
                    setPlayerResults(filteredResults);
                    setShowPlayerDropdown(true);
                } catch (error) {
                    console.error('Error searching players:', error);
                    setPlayerResults([]);
                    setShowPlayerDropdown(true);
                } finally {
                    setLoading(false);
                }
            } else {
                setPlayerResults([]);
                setShowPlayerDropdown(false);
            }
        }

        const timer = setTimeout(searchPlayersForRanking, 150);
        return () => clearTimeout(timer);
    }, [searchTerm, searchFilter, isFocused, selectedRanking]);

    // Handle player selection
    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player);
        setShowRankingModal(true);
        setSearchTerm('');
        setShowPlayerDropdown(false);
        setPlayerResults([]);
        setIsFocused(false);
    };

    // Handle ranking success
    const handleRankingSuccess = () => {
        setSelectedPlayer(null);
        setShowRankingModal(false);
        onPlayerRanked();
    }

    // Handle modal close
    const handleCloseModal = () => {
        setSelectedPlayer(null);
        setShowRankingModal(false);
    }

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setShowPlayerDropdown(true);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 300);
    }

    const handleFilterClick = () => {
        setShowFilterDropdown(!showFilterDropdown);
        if (!showFilterDropdown) {
            setShowPlayerDropdown(false);
            setPlayerResults([]);
        }
    }

    const handleRankingOptionsClick = () => {
        setShowRankingOptions(!showRankingOptions);
        if (!showRankingOptions) {
            setShowPlayerDropdown(false);
        }
    }

    // Handle filter dropdown close
    const handleFilterClose = () => {
        setShowFilterDropdown(false);
    }

    const handleRankingOptionsClose = () => {
        setShowRankingOptions(false);
    }

    // Handle filters change from FilterDropdown
    const handleFiltersChange = (newFilters) => {
        setSearchFilter(newFilters);
    }

    // Count active filters
    const activeFiltersCount = Object.values(searchFilter).filter(value => 
        value !== '' && value !== false && value !== 'false'
    ).length;

    return (
        <>
            <div className="w-full flex items-center relative" ref={dropdownRef}>
                <div className="relative flex-1 mr-2">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search for a player..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 pl-14"
                    />
                    <img 
                        src={Search}
                        alt="search"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    />

                    {/* Player Search Results Dropdown */}
                    {showPlayerDropdown && (
                        <div className="absolute top-full left-0 w-full bg-gray-800 border-3 border-gray-600 rounded-lg mt-1 max-h-95 overflow-y-auto z-[60] shadow-lg">
                            {loading ? (
                                <div className="p-3 text-center text-gray-400">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-400"></div>
                                        <span>Loading players...</span>
                                    </div>
                                </div>
                            ) : playerResults.length > 0 ? (
                                <>
                                    {/* Header showing filter status */}
                                    <div className="p-2 bg-gray-900 border-b border-gray-600 sticky top-0">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-amber-400 font-medium">
                                                {searchTerm ? `Results for "${searchTerm}"` : 'All players '} 
                                                ({playerResults.length} found)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Player Results */}
                                    {playerResults.map((player) => (
                                        <div
                                            key={`${player.id}-${player.name}`}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => handlePlayerSelect(player)}
                                            className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-medium text-white">{player.name}</div>
                                                    <div className="text-sm text-gray-400">
                                                        {player.position} • {player.club} • {player.nation} 
                                                        {player.retired && ' • (Retired)'}
                                                    </div>
                                                </div>
                                                <div className="text-xs bg-amber-500 text-black px-2 py-1 rounded">
                                                    Add to Rank
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                                ) : (
                                <div className="p-3 text-center text-gray-400">
                                    {searchTerm || activeFiltersCount > 0 
                                        ? 'No players found matching your criteria' 
                                        : 'No players found'
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative" ref={rankingOptionsRef}>
                    <button 
                        onClick={handleRankingOptionsClick}
                        className="bg-gray-700 h-12 items-center p-3 flex pl-10 rounded-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer mr-2">
                    <img 
                        src={List}
                        alt="list"
                        className="absolute left-2 top-1/2 -translate-y-1/2 sm:w-8 sm:h-8 w-6 h-6 flex"
                    />
                </button>

                {showRankingOptions && (
                    <RankingOptions 
                        selectedRanking={selectedRanking}
                        setSelectedRanking={setSelectedRanking}
                        onClose={handleRankingOptionsClose}
                    /> 
                )}
                </div>

                {/* Filter Button with active indicator */}
                <div className="relative" ref={filterDropdownRef}>
                    <button 
                        onClick={handleFilterClick}
                        className={`bg-gray-700 h-12 items-center text-white p-3 flex pl-10 rounded-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer relative ${
                            showFilterDropdown ? 'bg-gray-600' : ''
                        } ${activeFiltersCount > 0 ? 'ring-2 ring-amber-400' : ''}`}
                    >
                        <span className="hidden md:block">Filters</span>
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {activeFiltersCount}
                            </span>
                        )}

                        <img 
                            src={Filter}
                            alt="filter"
                            className="absolute left-2 top-1/2 -translate-y-1/2 sm:w-8 sm:h-8 w-6 h-6 flex"
                        />
                    </button>

                    {/* Filter Dropdown for Player Search */}
                    {showFilterDropdown && (
                        <FilterDropdown
                            onFiltersChange={handleFiltersChange}
                            onClose={handleFilterClose}
                            currentFilters={searchFilter}
                            title="Filter Player Search"
                        />
                    )}
                </div>
            </div>

            {/* Ranking Modal */}
            <RankingModal 
                player={selectedPlayer}
                isOpen={showRankingModal}
                onClose={handleCloseModal}
                onSuccess={handleRankingSuccess}
                selectedRanking={selectedRanking}
            />
        </>
    )
}

export default SearchFilter;