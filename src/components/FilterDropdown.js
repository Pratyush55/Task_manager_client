
import React from 'react';
import './style.css'; 

const FilterDropdown = ({ statuses, onSelectStatus }) => {
  return (
    <select className="filter-dropdown" onChange={(e) => onSelectStatus(e.target.value)}>
      <option value="All">All</option>
      {statuses.map(status => (
        <option key={status} value={status}>{status}</option>
      ))}
    </select>
  );
};

export default FilterDropdown;
