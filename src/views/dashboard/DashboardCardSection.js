import React from 'react';
import { FaShoppingCart, FaUsers, FaTicketAlt, FaDollarSign, FaClipboardList, FaMapMarkerAlt, FaCalendarCheck, FaExclamationTriangle } from 'react-icons/fa'; // React icons
import PanditRequestRange from '../dashboardCards/PanditRequestRange'; // Dashboard card section component
import ComissionRange from '../dashboardCards/ComissionCard';
const DashboardCardSection = () => {
  const data = [
    {
      id: 1,
      title: '3,243',
      description: 'New Orders',
      icon: <FaShoppingCart size={40} />, // Reduced icon size
      progress: 25,
      progressColor: 'bg-info',
      percentage: '12.5%',
      trendIcon: 'fa-arrow-up',
    },
    {
      id: 2,
      title: '15.07k',
      description: 'Customers',
      icon: <FaUsers size={40} />, // Reduced icon size
      progress: 50,
      progressColor: 'bg-success',
      percentage: '9.23%',
      trendIcon: 'fa-arrow-up',
    },
    {
      id: 3,
      title: '578',
      description: 'Ticket Resolved',
      icon: <FaTicketAlt size={40} />, // Reduced icon size
      progress: 40,
      progressColor: 'bg-warning',
      percentage: '10%',
      trendIcon: 'fa-arrow-up',
    },
    {
      id: 4,
      title: '$11.61k',
      description: 'Revenue Today',
      icon: <FaDollarSign size={40} />, // Reduced icon size
      progress: 20,
      progressColor: 'bg-info',
      percentage: '2.5%',
      trendIcon: 'fa-arrow-up',
    },
    // New added cards
    {
      id: 5,
      title: '10',
      description: 'Total Categories',
      icon: <FaClipboardList size={40} />, // Reduced icon size
      progress: 0,
      progressColor: 'bg-primary',
      percentage: '0%',
      trendIcon: 'fa-arrow-right',
    },
    {
      id: 6,
      title: '1234',
      description: 'Booking Count',
      icon: <FaCalendarCheck size={40} />, // Reduced icon size
      progress: 50,
      progressColor: 'bg-danger',
      percentage: '20%',
      trendIcon: 'fa-arrow-up',
    },
    {
      id: 7,
      title: '50km',
      description: 'Location Range',
      icon: <FaMapMarkerAlt size={40} />, // Reduced icon size
      progress: 80,
      progressColor: 'bg-warning',
      percentage: '10%',
      trendIcon: 'fa-arrow-up',
    },
    {
      id: 8,
      title: '78',
      description: 'Pending Orders',
      icon: <FaExclamationTriangle size={40} />, // Reduced icon size
      progress: 30,
      progressColor: 'bg-secondary',
      percentage: '15%',
      trendIcon: 'fa-arrow-down',
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {data.map((item) => (
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4" key={item.id}>
            <div className={`card shadow-sm rounded-3 hover-shadow-lg`}>
              <div className={`card-body ${item.progressColor} text-white rounded-3`}>
                <div className="d-flex justify-content-center mb-3">
                  <div className="card-icon">{item.icon}</div>
                </div>
                {/* Title with smaller font size */}
                <h5 className="card-title text-center" style={{ fontSize: '14px' }}>
                  {item.description}
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 style={{ fontSize: '18px' }}>{item.title}</h2> {/* Reduced title size */}
                  <span className="text-right" style={{ fontSize: '12px' }}>
                    {item.percentage} <i className={`fa ${item.trendIcon}`}></i>
                  </span>
                </div>
                <div className="progress mt-3" style={{ height: '8px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${item.progress}%` }}
                    aria-valuenow={item.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default DashboardCardSection;