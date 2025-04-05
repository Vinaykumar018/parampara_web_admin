import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { AppContext } from '../../../context/AppContext';
const PoojaListFilter = ({ data, onFilter }) => {






   const { globalContextPoojaCategoryData} = useContext(AppContext);

   const categoryMap = globalContextPoojaCategoryData.reduce((acc, item) => {
    acc[item._id] = item.category;
    return acc;
  }, {});
  
  
  ///replace the pooja_category of data prop if the _id is matching or equalt to it then set the categry to the category of globalcontextdata 


  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCustomRange, setShowCustomRange] = useState(false);

  // Extract unique categories and statuses from the data

  
  const categories = [...new Set(data.map(item => item.pooja_category))].filter(Boolean);

  const statuses = [...new Set(data.map(item => item.status))].filter(Boolean);



  const categoryNames = categories.map(catId => {
    const match = globalContextPoojaCategoryData.find(item => item._id === catId);
    return match ? match.category : null;
  }).filter(Boolean);
  
  
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
        );

      // Date filtering using created_at or updated_at
      const itemDate = item.created_at ? new Date(item.created_at) : new Date(item.updated_at);
      const matchesDate = (
        (!startDateFilter || itemDate >= new Date(startDateFilter.setHours(0, 0, 0, 0))) &&
        (!endDateFilter || itemDate <= new Date(endDateFilter.setHours(23, 59, 59, 999)))
      );

      // Category filtering

     
      const matchesCategory = categoryFilter === '' || categoryMap[item.pooja_category]=== categoryFilter;

      // Status filtering
      const matchesStatus = statusFilter === '' || item.status === statusFilter;

      return matchesSearch && matchesDate && matchesCategory && matchesStatus;
    });
    
    onFilter(filteredData);
  }, [data, searchTerm, dateRange, customStartDate, customEndDate, categoryFilter, statusFilter, onFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setDateRange('');
    setCustomStartDate('');
    setCustomEndDate('');
    setCategoryFilter('');
    setStatusFilter('');
    setShowCustomRange(false);
    onFilter(data); // Reset to original data
  };

  return (
    <div className="row g-2">
      {/* Search Input */}
      

      {/* Date Range Filter */}
      <div className="col-md-3">
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
      <div className="col-md-3">
        <select
          className="form-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categoryNames.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className="col-md-3">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <div className="col-md-3">
        <button 
          className="btn btn-secondary w-100"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default PoojaListFilter;