import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GetTable.css'

const GetTable = ({ data, columns, title }) => {
  const [searchedData, setSearchedData] = useState("");

  const notify = () => toast("Data copied to clipboard!");

  const filteredData = data.filter((item) => 
    Object.values(item).some((value) => 
      value?.toString().toLowerCase().includes(searchedData.toLowerCase())
    )
  );

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

  return (
      <div className="card-body bg-white">
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        className="border border-1"
        fixedHeaderScrollHeight="100%"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <div className="d-flex justify-content-between w-100">
            <div className='gap-1 d-flex'>
              <CSVLink data={csvData} filename={`${title}.csv`} className="btn btn-info btn-sm ml-2 ">
           CSV
              </CSVLink>
              <button className="btn btn-primary btn-sm ml-2" onClick={printToPDF}>PDF</button>
              <button className="btn btn-success btn-sm ml-2" onClick={exportToExcel}>Excel</button>
              <CopyToClipboard text={JSON.stringify(filteredData, null, 2)} onCopy={notify}>
                <button className="btn btn-warning btn-sm ml-2">Copy</button>
              </CopyToClipboard>
            </div>
            <input
              type="text"
              placeholder="Search here"
              className="form-control w-25"
              value={searchedData}
              onChange={(e) => setSearchedData(e.target.value)}
            />
          </div>
        }
      />
      <ToastContainer />
      </div>
  );
};

export default GetTable;



