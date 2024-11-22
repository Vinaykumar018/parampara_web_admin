import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetTable from './GetTable';

const CountriesData = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const { data } = await axios.get('https://restcountries.com/v3.1/all');
        const processedData = data.map((country) => ({
          name: country.name?.common || "N/A",
          nativeName: country.name?.nativeName ? Object.values(country.name.nativeName)[0]?.common || "N/A" : "N/A",
          capital: country.capital?.[0] || "N/A",
          flag: country.flags?.png || "N/A",
          code: country.cca2 || "N/A",
        }));
        setCountries(processedData);
      } catch (error) {
        console.error("Error fetching country data:", error);
        setCountries([]);
      }
    };

    fetchCountriesData();
  }, []);

  const countryColumns = [
    { name: 'Country Name', selector: (row) => row.name, sortable: true },
    { name: 'Native Name', selector: (row) => row.nativeName },
    { name: 'Capital', selector: (row) => row.capital },
    { name: 'Flag', selector: (row) => <img src={row.flag} alt="flag" width={50} height={30} /> },
    { name: 'Code', selector: (row) => row.code },
  ];

  return (
    <GetTable data={countries} columns={countryColumns} title="Countries Table" />
  );
};

export default CountriesData;
