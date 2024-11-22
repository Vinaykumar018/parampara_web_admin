import React, { useState } from 'react';
import GetTable from './GetTable';

const CommissionList = () => {
  // Sample Commission Data
  const [commissionData, setCommissionData] = useState([
    { id: 1, name: "Order Commission", commission: "3%" },
    { id: 2, name: "Pandit Commission", commission: "10%" },
    { id: 3, name: "Vendor Commission", commission: "5%" },
    { id: 4, name: "Referral Commission", commission: "8%" },
    { id: 5, name: "Sales Commission", commission: "4%" },
    { id: 6, name: "Affiliate Commission", commission: "6%" },
    { id: 7, name: "Order Processing Commission", commission: "7%" },
    { id: 8, name: "Customer Service Commission", commission: "9%" },
    { id: 9, name: "Shipping Commission", commission: "2%" },
    { id: 10, name: "Subscription Commission", commission: "12%" },
    { id: 11, name: "Marketing Commission", commission: "15%" },
    { id: 12, name: "Promotional Commission", commission: "11%" },
  ]);

  // Table columns for Commission List
  const columns = [
    { name: "ID", selector: row => row.id },
    { name: "Name", selector: row => row.name },
    { name: "Commission", selector: row => row.commission },
  ];

  return (
    <GetTable
      data={commissionData.slice(0, 10)}  // Displaying only the first 10 entries
      columns={columns}
      title="Commission List"
    />
  );
};

export default CommissionList;
