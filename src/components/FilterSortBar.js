import React, { useState } from 'react';

const FilterSortBar = ({ onSearch, onSort }) => {
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    const handleSortChange = (event) => {
        const sortBy = event.target.value;
        if (sortBy === 'ratings') {
            onSort('ratings');
        } else if (sortBy === 'year') {
            onSort('year');
        } else {
            onSort('episode');
        }
    };

    return (
        <div style={{ margin: "20px 5px 5px 20px", border: "1px solid grey", background: "#f2f0f0" }}>
            <select onChange={handleSortChange} style={{ padding: '5px' }}>
                <option value="episode">Sort by Episode</option>
                <option value="year">Sort by Year</option>
                <option value="ratings">Sort by Ratings</option>
            </select>
            <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ padding: "5px", width: "88" }}
            />

        </div>
    );
};

export default FilterSortBar;
