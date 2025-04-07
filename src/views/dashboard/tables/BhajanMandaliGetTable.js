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
import BhajanMandaliFilter from '../filters/BhajanMandaliFilter';

const BhajanMandaliGetTable = ({ 
  data, 
  columns, 
  title, 
  onEdit, 
  onDelete, 
  onAddVideo, 
  onPreview 
}) => {
  const [filteredData, setFilteredData] = useState(data);

  const notify = () => toast("Data copied to clipboard!");

  const transformData = (data) => {
    return data.map(item => {
      const transformedItem = {};
      columns.forEach(column => {
        if (typeof column.selector === 'function') {
          transformedItem[column.name] = column.selector(item);
        }
      });
      return transformedItem;
    });
  };

  const csvData = transformData(filteredData);

  const printToPDF = () => {
    const doc = new jsPDF();
    const tableContent = transformData(filteredData).map(item =>
      columns.map(({ name }) => item[name] || "N/A")
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

  const preparedColumns = [
    ...columns,
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex align-items-center gap-2">
  <span className="me-2">{row.title}</span> {/* or whatever text you want in the same row */}
  <button 
    className="btn btn-sm btn-primary"
    onClick={() => onEdit(row._id)}
  >
    Edit
  </button>
  <button 
    className="btn btn-sm btn-danger"
    onClick={() => onDelete(row._id)}
  >
    Delete
  </button>
  <button 
    className="btn btn-sm btn-info"
    onClick={() => onAddVideo(row._id)}
  >
    Add Video
  </button>
  <button 
    className="btn btn-sm btn-secondary"
    onClick={() => onPreview(row._id)}
  >
    View
  </button>
</div>

      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width:"300px"
    }
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="row g-2 mb-3">
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

          <div className="col-12 col-md-6 col-lg-8">
            <BhajanMandaliFilter 
              data={data} 
              onFilter={setFilteredData}
            />
          </div>
        </div>

        <DataTable
          columns={preparedColumns}
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

export default BhajanMandaliGetTable;