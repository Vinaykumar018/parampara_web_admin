import React, { useState, useEffect } from 'react';

const PanditListFilter = ({ data, onFilter }) => {
  const [dateRange, setDateRange] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  
  // Extract unique cities from the data
  const cities = [...new Set(data
    .map(item => item.city)
    .filter(city => city && city.trim() !== '')
  )].sort();

  // Apply filters whenever any filter criteria changes
  useEffect(() => {
    let startDateFilter, endDateFilter;
    
    // Calculate date range based on selection
    const today = new Date();
    switch(dateRange) {
      case 'today':
        startDateFilter = today;
        endDateFilter = today;
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        startDateFilter = yesterday;
        endDateFilter = yesterday;
        break;
      case 'this-week':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        startDateFilter = startOfWeek;
        endDateFilter = today;
        break;
      case 'last-15-days':
        const fifteenDaysAgo = new Date(today);
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
        startDateFilter = fifteenDaysAgo;
        endDateFilter = today;
        break;
      case 'this-month':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        startDateFilter = startOfMonth;
        endDateFilter = today;
        break;
      case 'custom-range':
        startDateFilter = customStartDate ? new Date(customStartDate) : null;
        endDateFilter = customEndDate ? new Date(customEndDate) : null;
        break;
      default:
        startDateFilter = null;
        endDateFilter = null;
    }

    const filteredData = data.filter((item) => {
      // Date filtering
      const itemDate = new Date(item.created_at || item.updated_at);
      const matchesStartDate = !startDateFilter || itemDate >= new Date(startDateFilter.setHours(0, 0, 0, 0));
      const matchesEndDate = !endDateFilter || itemDate <= new Date(endDateFilter.setHours(23, 59, 59, 999));

      // Status filtering
      const matchesStatus = statusFilter === '' || 
        (statusFilter === 'active' && item.status === 'active') || 
        (statusFilter === 'inactive' && item.status === 'inactive');

      // City filtering
      const matchesCity = cityFilter === '' || 
        (item.city && item.city.toLowerCase().includes(cityFilter.toLowerCase()));

      return matchesStartDate && matchesEndDate && matchesStatus && matchesCity;
    });
    
    onFilter(filteredData);
  }, [data, dateRange, customStartDate, customEndDate, statusFilter, cityFilter, onFilter]);

  const handleClearFilters = () => {
    setDateRange('');
    setCustomStartDate('');
    setCustomEndDate('');
    setStatusFilter('');
    setCityFilter('');
    setShowCustomRange(false);
  };

  return (
    <div className="row mb-3">
      {/* City Filter */}
      <div className="col-md-3 mb-2">
        <select
          className="form-select"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="col-md-3 mb-2">
        <select
          className="form-select"
          value={dateRange}
          onChange={(e) => {
            setDateRange(e.target.value);
            setShowCustomRange(e.target.value === 'custom-range');
          }}
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="this-week">This Week</option>
          <option value="last-15-days">Last 15 Days</option>
          <option value="this-month">This Month</option>
          <option value="custom-range">Custom Range</option>
        </select>
        
        {showCustomRange && (
          <div className="row mt-2 g-2">
            <div className="col-6">
              <input
                type="date"
                className="form-control"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                placeholder="Start Date"
              />
            </div>
            <div className="col-6">
              <input
                type="date"
                className="form-control"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                placeholder="End Date"
              />
            </div>
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div className="col-md-3 mb-2">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <div className="col-md-3 mb-2">
        <button 
          className="btn btn-secondary w-100"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default PanditListFilter;