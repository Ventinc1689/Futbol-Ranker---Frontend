import React, { useState, useEffect } from 'react';

const FilterDropdown = ({ 
    onFiltersChange, 
    onClose, 
    currentFilters = {
        nation: '',
        club: '',
        position: '',
        retired: ''
    }, 
}) => {
    const [filters, setFilters] = useState(currentFilters);

    // Update local state when currentFilters prop changes
    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    const nations = ['Argentina', 'Brazil', 'England', 'France', 'Germany', 'Spain', 'Portugal', 'Netherlands', 'Italy', 'Belgium', 'Croatia', 'Uruguay', 'Colombia', 'Ivory Coast', 'Hungary', 'Poland', 'Sweden', 'Denmark', 'Russia', 'Nigeria', 'Serbia', 'Morocco', 'South Korea', 'Czech Republic', 'Canada', 'Egypt', 'Norway', 'Slovenia'];

    const clubs = ['Real Madrid', 'Barcelona', 'Manchester City', 'Manchester United', 'Liverpool', 'Bayern Munich', 'PSG', 'Juventus', 'Inter Milan', 'AC Milan', 'Chelsea', 'Arsenal', 'Tottenham Hotspur', 'Atletico Madrid', 'Dortmund', 'Ajax', 'Benfica', 'Porto', 'Napoli', 'West Ham', 'Santos', 'Flamengo', 'Aston Villa', 'Leverkusen', 'PSV Eindhoven'];

    const positions = ['ST', 'LW', 'RW', 'CM', 'CDM', 'CAM', 'LM', 'RM', 'CB', 'LB', 'RB', 'GK'];

    const retirementOptions = [
        { label: 'Active Players', value: false },
        { label: 'Retired Players', value: true }
    ];

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            nation: '',
            club: '',
            position: '',
            retired: ''
        };
        setFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border-3 border-amber-500 rounded-lg mt-1 p-4 z-60 w-80 md:w-100 lg:w-140">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-amber-400 font-semibold">Filter Player Search</h3>
                <button 
                    onClick={onClose}
                    className="text-white hover:text-amber-400"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-3">
                {/* Nation Filter */}
                <div>
                    <label className="block text-white text-sm mb-1">Nation</label>
                    <select
                        value={filters.nation}
                        onChange={(e) => handleFilterChange('nation', e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-amber-400"
                    >
                        <option value="">All Nations</option>
                        {nations.map(nation => (
                            <option key={nation} value={nation}>{nation}</option>
                        ))}
                    </select>
                </div>

                {/* Club Filter */}
                <div>
                    <label className="block text-white text-sm mb-1">Club</label>
                    <select
                        value={filters.club}
                        onChange={(e) => handleFilterChange('club', e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-amber-400"
                    >
                        <option value="">All Clubs</option>
                        {clubs.map(club => (
                            <option key={club} value={club}>{club}</option>
                        ))}
                    </select>
                </div>

                {/* Position Filter */}
                <div>
                    <label className="block text-white text-sm mb-1">Position</label>
                    <select
                        value={filters.position}
                        onChange={(e) => handleFilterChange('position', e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-amber-400"
                    >
                        <option value="">All Positions</option>
                        {positions.map(position => (
                            <option key={position} value={position}>{position}</option>
                        ))}
                    </select>
                </div>

                {/* Retirement Status Filter */}
                <div>
                    <label className="block text-white text-sm mb-1">Status</label>
                    <select
                        value={filters.retired}
                        onChange={(e) => handleFilterChange('retired', e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-amber-400"
                    >
                        <option value="">All Players</option>
                        {retirementOptions.map(option => (
                            <option key={option.label} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={clearFilters}
                    className="w-full mt-3 p-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-all"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterDropdown;