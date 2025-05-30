import React, { useState, useEffect } from 'react';

const BhajanMandaliFilter = ({ data, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showCustomRange, setShowCustomRange] = useState(false);

  // Extract unique categories, cities, etc. from the data
  const categories = [...new Set(data.map(item => item.bhajan_category))].filter(Boolean);
  const cities = [...new Set(data.map(item => item.mandali_address?.city).filter(Boolean))];

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
      // Search term filtering
      const matchesSearch = searchTerm === '' || 
        Object.values(item).some(val => 
          val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (item.bhajan_owner && (
          item.bhajan_owner.owner_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.bhajan_owner.owner_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.bhajan_owner.owner_phone?.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (item.mandali_address && (
          item.mandali_address.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.mandali_address.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.mandali_address.state?.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      // Date filtering (assuming there's a created_at or similar date field)
      const itemDate = new Date(item.created_at || item.updated_at);
      const matchesStartDate = !startDateFilter || itemDate >= new Date(startDateFilter.setHours(0, 0, 0, 0));
      const matchesEndDate = !endDateFilter || itemDate <= new Date(endDateFilter.setHours(23, 59, 59, 999));

      // City filtering
      const matchesCity = cityFilter === '' || 
        (item.mandali_address && item.mandali_address.city === cityFilter);

      // Category filtering
      const matchesCategory = categoryFilter === '' || item.bhajan_category === categoryFilter;

      return matchesSearch && matchesStartDate && matchesEndDate && matchesCity && matchesCategory;
    });
    
    onFilter(filteredData);
  }, [data, searchTerm, dateRange, customStartDate, customEndDate, cityFilter, categoryFilter, onFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setDateRange('');
    setCustomStartDate('');
    setCustomEndDate('');
    setCityFilter('');
    setCategoryFilter('');
    setShowCustomRange(false);
  };

  return (
    <div className="row mb-3">
      {/* Search Input */}
      

      {/* Date Range Filter */}
      <div className="col-md-3 ">
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

      {/* Category Filter */}
      <div className="col-md-3 mb-2">
        <select
          className="form-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* City Filter */}
      <div className="col-md-3 mb-2">
        <select
          className="form-select"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <div className="col-md-3">
        <button 
          className="btn btn-secondary w-100"
          onClick={handleClearFilters}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default BhajanMandaliFilter;