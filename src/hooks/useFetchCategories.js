import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCategories = (panditIds) => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!panditIds || panditIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

        // Make API calls one by one using Promise.all
        const responses = await Promise.all(
          panditIds.map(async (id) => {
            const res = await axios.get(`http://192.168.1.35:3000/api/pandit/get-category/${id}`, {
              headers: { Authorization: token },
               // Pass individual ID
            });


            return { id, data: res.data.data };
          })
        );

        // Transform the response into a map by pandit_id
        const categoriesMap = responses.reduce((acc, { id, data }) => {
          acc[id] = data.map((cat) => ({
            pooja_name: cat.pooja_name || 'N/A',
            status: cat.status || 'N/A' // Include status
          }));
          return acc;
        }, {});
       
        setCategories(categoriesMap);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [panditIds]);

  return { categories, loading, error };
};

export default useFetchCategories;



