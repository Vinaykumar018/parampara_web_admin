import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
// const BASE_URL='http://34.131.41.101:3005/api/pooja'
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

export const useBhavyaAyojan = () => {
  const [bhavyaAyojanData, setBhavyaAyojanData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Regular async function to fetch data
  const fetchBhavyaAyojanData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/bhavya-ayojan/all`, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      setBhavyaAyojanData(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error('Error fetching Bhavya Ayojan data:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchBhavyaAyojanData();
  }, []); // Empty dependency array means runs once on mount

  return {
    bhavyaAyojanData,      // The actual bhavya ayojan data array
    setBhavyaAyojanData,   // Function to update data
    loading,               // true/false loading state
    error,                 // Error object if request failed
    fetchBhavyaAyojanData, // Function to manually refresh data
    isEmpty: bhavyaAyojanData.length === 0 && !loading // Helper flag
  };
};