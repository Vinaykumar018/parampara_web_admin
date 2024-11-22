

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import { CSVLink } from 'react-csv';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CountriesTables = () => {
//   const [countries, setCountries] = useState([]);
//   const [searchedData, setSearchedData] = useState("");

//   // Fetch countries data
//   const getCountries = async () => {
//     try {
//       const { data } = await axios.get('https://restcountries.com/v3.1/all');
//       setCountries(data);
//     } catch (error) {
//       console.error("Error fetching country data:", error);
//     }
//   };

//   useEffect(() => {
//     getCountries();
//   }, []);

//   // Notify copy success
//   const notify = () => toast("Data copied to clipboard!");

//   // Filtered countries based on search input
//   const filteredCountries = countries.filter(({ name }) =>
//     name?.common?.toLowerCase().includes(searchedData.toLowerCase())
//   );

//   // Columns for DataTable
//   const columns = [
//     { name: 'Country Name', selector: row => row.name?.common || 'N/A', sortable: true },
//     { name: 'Country Native Name', selector: row => row.name?.nativeName ? Object.values(row.name.nativeName)[0]?.common || 'N/A' : 'N/A' },
//     { name: 'Country Capital', selector: row => row.capital?.[0] || 'N/A' },
//     { name: 'Country Flag', selector: row => <img width={50} height={30} src={row.flags?.png || row.flags?.svg} alt={`${row.name?.common} flag`} /> },
//     { name: 'Action', cell: row => <button className="btn btn-primary" onClick={() => alert(`Country Code: ${row.cca2}`)}>Edit</button> }
//   ];

//   // CSV data
//   const csvHeaders = [
//     { label: "Country Name", key: "name" },
//     { label: "Country Native Name", key: "nativeName" },
//     { label: "Country Capital", key: "capital" },
//     { label: "Country Code", key: "cca2" },
//   ];

//   const csvData = filteredCountries.map(({ name, capital, cca2 }) => ({
//     name: name?.common || "N/A",
//     nativeName: name?.nativeName ? Object.values(name.nativeName)[0]?.common || "N/A" : "N/A",
//     capital: capital?.[0] || "N/A",
//     cca2: cca2 || "N/A",
//   }));

//   // Export to PDF
//   const printToPDF = () => {
//     const doc = new jsPDF();
//     const tableContent = filteredCountries.map(({ name, capital, cca2 }) => [
//       name?.common || 'N/A',
//       name?.nativeName ? Object.values(name.nativeName)[0]?.common || 'N/A' : 'N/A',
//       capital?.[0] || 'N/A',
//       cca2 || 'N/A',
//     ]);

//     doc.autoTable({
//       head: [['Country Name', 'Country Native Name', 'Country Capital', 'Country Code']],
//       body: tableContent,
//     });

//     doc.save('countries_data.pdf');
//   };

//   // Export to Excel
//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(csvData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Countries Data");
//     XLSX.writeFile(wb, "countries_data.xlsx");
//   };

//   return (
//     <div>
//       <DataTable
//         title="Country List"
//         columns={columns}
//         data={filteredCountries}
//         pagination
//         fixedHeader
//         fixedHeaderScrollHeight="400px"
//         selectableRows
//         selectableRowsHighlight
//         highlightOnHover
//         subHeader
//         subHeaderComponent={
//           <div className="d-flex justify-content-between w-100">
//             {/* Action Buttons on the Left */}
//             <div>
//               <CSVLink data={csvData} headers={csvHeaders} filename="countries_data.csv" className="btn btn-info btn-sm ml-2">
//                 Export to CSV
//               </CSVLink>
//               <button className="btn btn-primary btn-sm ml-2" onClick={printToPDF}>Print to PDF</button>
//               <button className="btn btn-success btn-sm ml-2" onClick={exportToExcel}>Export to Excel</button>
//               <CopyToClipboard text={JSON.stringify(filteredCountries, null, 2)} onCopy={notify}>
//                 <button className="btn btn-warning btn-sm ml-2">Copy to Clipboard</button>
//               </CopyToClipboard>
//             </div>

//             {/* Search Input on the Right */}
//             <input
//               type="text"
//               placeholder="Search here"
//               className="form-control w-25"
//               value={searchedData}
//               onChange={(e) => setSearchedData(e.target.value)} 
//             />
//           </div>
//         }
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// export default CountriesTables;



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
    <div>
      <DataTable
 title={
  <div className="bg-warning text-white text-center p-2 rounded-lg fw-bold" style={{ fontFamily: "'Arial', sans-serif" }}>
  {title} {/* Dynamic Title */}
</div>
}
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
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
