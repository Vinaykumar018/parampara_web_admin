import React, { useState, useEffect } from 'react';

const BrahmanBhojFilter = ({ data, onFilter }) => {
  const [dateRange, setDateRange] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCustomRange, setShowCustomRange] = useState(false);

  // Apply filters whenever any filter criteria changes
  useEffect(() => {
    const filteredData = data.filter((item) => {
      if (!item.date) return false;
      
      const bookingDate = new Date(item.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Date filtering logic
      let matchesDate = true;
      
      if (dateRange) {
        switch(dateRange) {
          case 'today':
            matchesDate = bookingDate.toDateString() === today.toDateString();
            break;
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            matchesDate = bookingDate.toDateString() === yesterday.toDateString();
            break;
          case 'this-week':
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            matchesDate = bookingDate >= startOfWeek;
            break;
          case 'last-15-days':
            const fifteenDaysAgo = new Date(today);
            fifteenDaysAgo.setDate(today.getDate() - 15);
            matchesDate = bookingDate >= fifteenDaysAgo;
            break;
          case 'this-month':
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            matchesDate = bookingDate >= startOfMonth;
            break;
          case 'custom-range':
            if (customStartDate && customEndDate) {
              const startDate = new Date(customStartDate);
              const endDate = new Date(customEndDate);
              endDate.setHours(23, 59, 59, 999);
              matchesDate = bookingDate >= startDate && bookingDate <= endDate;
            }
            break;
          default:
            matchesDate = true;
        }
      }
      
      const matchesAddress = addressFilter === '' || 
        (item.address && item.address.toLowerCase().includes(addressFilter.toLowerCase()));
      
      const matchesStatus = statusFilter === '' || 
        item.bookingStatus?.toString() === statusFilter;

      return matchesDate && matchesAddress && matchesStatus;
    });
    
    onFilter(filteredData);
  }, [data, dateRange, customStartDate, customEndDate, addressFilter, statusFilter, onFilter]);

  return (
    <div className="row mb-4 g-2">
      {/* Date Range Selector */}
      <div className="col-md-3 mb-2 mb-md-0">
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

      {/* Address Filter */}
      <div className="col-md-3 mb-2 mb-md-0">
        <input
          type="text"
          placeholder="Search by address"
          className="form-control"
          value={addressFilter}
          onChange={(e) => setAddressFilter(e.target.value)}
        />
      </div>
      
      {/* Status Filter */}
      <div className="col-md-3 mb-2 mb-md-0">
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="0">Pending</option>
          <option value="1">Confirmed</option>
          <option value="2">Accepted</option>
          <option value="3">Completed</option>
          <option value="4">Cancelled</option>
        </select>
      </div>
      
      {/* Clear Filters Button */}
      <div className="col-md-3">
        <button 
          className="btn btn-secondary w-100"
          onClick={() => {
            setDateRange('');
            setCustomStartDate('');
            setCustomEndDate('');
            setAddressFilter('');
            setStatusFilter('');
            setShowCustomRange(false);
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default BrahmanBhojFilter;