import React, { useEffect, useState } from 'react';
import { GiPathDistance } from 'react-icons/gi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';


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
      toast.error('Please enter a valid range before submitting.');
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
      toast.success('Range submitted successfully!');
    } catch (error) {
      console.error('Error submitting range:', error);
      toast.error('Failed to submit range. Please try again.');
    }
  };

  return (
    <div className="container-fluid">
    <ToastContainer />
    <div className="row">
      <div className="col-12 mb-4">
        <div className="card shadow-sm rounded-3 hover-shadow-lg transition-all" style={{
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }
        }}>
          <div className="card-body text-white rounded-3" style={{ 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
            padding: '1.5rem'
          }}>
            <div className="d-flex justify-content-center mb-4">
              <div className="range-icon" style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff'
              }}>
                <GiPathDistance size={30} className="text-primary" />
              </div>
            </div>
  
            <h5 className="card-title text-center mb-4" style={{ 
              fontSize: '18px',
              color: '#2c3e50',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Pandit Request Range
            </h5>
  
            <div className="d-flex flex-column gap-3">
              <div className="form-group">
                <label htmlFor="range" className="form-label" style={{
                  color: '#4a5568',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>Distance (in km)</label>
                <input
                  id="range"
                  type="number"
                  placeholder="Enter distance in kilometers"
                  name="range"
                  value={range.range}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    padding: '12px 15px',
                    boxShadow: 'inset 2px 2px 5px #e2e8f0, inset -2px -2px 5px #ffffff',
                    fontSize: '16px'
                  }}
                />
              </div>
  
              <button
                className="btn submit-btn"
                onClick={handleSubmit}
                style={{
                  background: 'linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '12px 0',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 7px 14px rgba(0, 0, 0, 0.1)',
                    background: 'linear-gradient(to right, #ff7eb3 0%, #ff758c 100%)'
                  }
                }}
              >
                {action === 'POST' ? (
                  <>
                    <FaPlusCircle size={18} />
                    Set Range
                  </>
                ) : (
                  <>
                    <FaEdit size={16} />
                    Update Range
                  </>
                )}
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