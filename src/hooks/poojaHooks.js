import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL=`${import.meta.env.VITE_BASE_URL}/pooja`;
// const BASE_URL='http://34.131.41.101:3005/api/pooja'
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

export const usePooja = () => {
  const [poojaData, setPoojaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Regular async function to fetch data
  const fetchPoojaData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/all-pooja`, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      setPoojaData(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error('Error fetching Pooja data:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchPoojaData();
  }, []); // Empty dependency array means runs once on mount

  return {
    poojaData,      // The actual pooja data array
    setPoojaData,   // Function to update pooja data
    loading,        // true/false loading state
    error,          // Error object if request failed
    fetchPoojaData, // Function to manually refresh data
    isEmpty: poojaData.length === 0 && !loading // Helper flag
  };
};