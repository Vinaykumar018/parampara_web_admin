import React, { useEffect, useState } from 'react';
import { GiPathDistance } from 'react-icons/gi';
import axios from 'axios';

const PanditRequestRange = () => {
  
  const [action, setAction] = useState('POST');
  const [rangeId, setRangeID] = useState(null);
  const [range, setRange] = useState({
    range: '',  
  });

  // Handle input change
  const handleChange = (e) => {
    setRange({ ...range, [e.target.name]: e.target.value });
  };

  console.log('Current Method:', action);

  // Fetch the current range on component mount
  useEffect(() => {
    handleFetch();
  }, []);

  // Fetch Range Data
  const handleFetch = async () => {
    try {
      const response = await axios.get(
        'http://192.168.1.35:3000/api/setting/pandit-range',
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8',
          },
        }
      );

      if (response.data.data.length > 0) {
        const fetchedRange = response.data.data[0];
        setRangeID(fetchedRange._id);
        setRange({ range: fetchedRange.range });
        setAction('PUT');
      }
    } catch (error) {
      console.error('Error fetching range:', error);
    }
  };

  // Handle submit with error handling
  const handleSubmit = async () => {
    if (!range.range) {
      alert('Please enter a valid range before submitting.');
      return;
    }

    try {
      const url =
        action === 'POST'
          ? 'http://192.168.1.35:3000/api/setting/create-range'
          : 'http://192.168.1.35:3000/api/setting/update-range';

      const payload =
        action === 'POST'
          ? { range: range.range }
          : { rangeId, range: range.range };

      const response = await axios({
        method: action === 'POST' ? 'post' : 'put',
        url: url,
        data: payload,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8',
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response.data);
      alert('Range submitted successfully!');
    } catch (error) {
      console.error('Error submitting range:', error);
      alert('Failed to submit range. Please try again.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-6 col-12 mb-4">
          <div className="card shadow-sm rounded-3 hover-shadow-lg">
            <div className="card-body text-white rounded-3">
              <div className="d-flex justify-content-center mb-3">
                <GiPathDistance size={40} className="text-dark" />
              </div>

              <h5
                className="card-title text-center text-dark"
                style={{ fontSize: '14px' }}
              >
                Pandit Request Range
              </h5>

              <div className="d-flex justify-content-between align-items-center">
                <input
                  type="number"
                  placeholder="Enter distance"
                  name="range"
                  value={range.range}
                  onChange={handleChange}
                  className="form-control me-2"
                />
                <button className="btn btn-danger" onClick={handleSubmit}>
                  {action === 'POST' ? 'Create' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditRequestRange;
