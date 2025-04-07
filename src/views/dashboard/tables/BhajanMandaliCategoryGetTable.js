import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GetTable.css';
import BhajanMandaliCategoryFilter from '../filters/BhajanMandaliCategoryFilter'; // Make sure to import the filter component

const BhajanMandaliCategoryGetTable = ({ data, columns, title }) => {
  const [searchedData, setSearchedData] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState(data); // Add state for filtered data

  const notify = () => toast("Data copied to clipboard!");

  // Extract unique locations and categories from the data
  const locations = [...new Set(data.map((item) => item.location))];
  const categories = [...new Set(data.map((item) => item.category))];

  // Filter data based on search, location, and category
  const filteredDataLocal = data.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchedData.toLowerCase())
    );
    const matchesLocation = selectedLocation ? item.location === selectedLocation : true;
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const csvData = filteredData.map((item) => {
    const newObj = {};
    columns.forEach(({ name, selector }) => {
      newObj[name] = selector(item);
    });
    return newObj;
  });

  const printToPDF = () => {
    const doc = new jsPDF();
    const tableContent = filteredData.map((item) =>
      columns.map(({ selector }) => selector(item) || "N/A")
    );

    doc.autoTable({
      head: [columns.map(({ name }) => name)],
      body: tableContent,
    });

    doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${title.replace(/\s+/g, '_').toLowerCase()}.xlsx`);
  };

  // Custom Bootstrap styling for the DataTable
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #dee2e6',
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        borderBottom: '1px solid #dee2e6',
        borderLeft: '1px solid #dee2e6',
        borderRight: '1px solid #dee2e6',
        '&:hover': {
          backgroundColor: '#f1f3f5',
        },
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #dee2e6',
        padding: '10px 0',
      },
    },
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* Responsive Row for Buttons and Filters */}
        <div className="row g-2 mb-3">
          {/* Buttons Column */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex flex-wrap gap-2">
              <CSVLink data={csvData} filename={`${title}.csv`} className="btn btn-info btn-sm">
                CSV
              </CSVLink>
              <button className="btn btn-primary btn-sm" onClick={printToPDF}>
                PDF
              </button>
              <button className="btn btn-success btn-sm" onClick={exportToExcel}>
                Excel
              </button>
              <CopyToClipboard text={JSON.stringify(filteredData, null, 2)} onCopy={notify}>
                <button className="btn btn-warning btn-sm">Copy</button>
              </CopyToClipboard>
            </div>
          </div>

          {/* Filters Column */}
          <div className="col-12 col-md-6 col-lg-8">
            <BhajanMandaliCategoryFilter 
              data={data} 
              onFilter={setFilteredData}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          highlightOnHover
          customStyles={customStyles}
          className='border'
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default BhajanMandaliCategoryGetTable;