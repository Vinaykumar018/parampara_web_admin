import React, { useEffect, useState } from 'react';
import { GiPathDistance } from 'react-icons/gi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit, FaPlusCircle, FaRupeeSign } from "react-icons/fa";


const ComissionRange = () => {
  const [action, setAction] = useState('POST');
  const [comission, setComission] = useState({
    target: 'mandali',
    commision: '',
    commision_type: 'percentage',
  });
  const [panditComissionID, setPanditComissionId] = useState(null);
  const [mandaliComissionID, setMandaliComissionID] = useState(null);
  const [panditData, setPanditData] = useState(null);
  const [mandaliData, setMandaliData] = useState(null);

  const handleChange = (e) => {
    setComission((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    fetchCommission();
  }, []);

  const fetchCommission = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/setting/commission',
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.data.length > 0) {
        const fetchedCommissions = response.data.data;
        
        // Find and set pandit and mandali commissions
        const panditCommission = fetchedCommissions.find(item => item.target === 'pandit');
        const mandaliCommission = fetchedCommissions.find(item => item.target === 'mandali');

        if (panditCommission) {
          setPanditComissionId(panditCommission._id);
          setPanditData({
            commision: panditCommission.commision,
            commision_type: panditCommission.commision_type
          });
        }

        if (mandaliCommission) {
          setMandaliComissionID(mandaliCommission._id);
          setMandaliData({
            commision: mandaliCommission.commision,
            commision_type: mandaliCommission.commision_type
          });
          // Set initial form values to mandali data
          setComission({
            target: 'mandali',
            commision: mandaliCommission.commision,
            commision_type: mandaliCommission.commision_type
          });
        }

        setAction('PUT'); // Switch to update mode
      }
    } catch (error) {
      console.error('Error fetching commission:', error);
      toast.error('Failed to fetch commission data.');
    }
  };

  const handleSubmit = async () => {
    if (!comission.commision) {
      toast.error('Please enter a valid commission value.');
      return;
    }

    try {
      if (action === 'POST') {
        await axios.post(
          'http://localhost:3000/api/update-commission',
          comission,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8'
            }
          }
        );
        toast.success('Commission created successfully!');
        fetchCommission(); // Refresh data
      } else if (action === 'PUT') {
        const commissionId = comission.target === 'pandit' ? panditComissionID : mandaliComissionID;
        const updatedComission = {
          ...comission,
          commissionId: commissionId
        };
        
        await axios.put(
          'http://localhost:3000/api/update-commission',
          { ...updatedComission },
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8',
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Commission updated successfully!');
        fetchCommission(); // Refresh data
      }
    } catch (error) {
      console.error('Error submitting commission:', error);
      toast.error('Failed to submit commission data.');
    }
  };

  // Update form values when target changes
  useEffect(() => {
    if (comission.target === 'pandit' && panditData) {
      setComission({
        target: 'pandit',
        commision: panditData.commision,
        commision_type: panditData.commision_type
      });
    } else if (comission.target === 'mandali' && mandaliData) {
      setComission({
        target: 'mandali',
        commision: mandaliData.commision,
        commision_type: mandaliData.commision_type
      });
    }
  }, [comission.target, panditData, mandaliData]);

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
          <div className="card-body text-white rounded-3" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)' }}>
            <div className="d-flex justify-content-center mb-3">
              <div className="commission-icon" style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff'
              }}>
                <FaRupeeSign size={30} className="text-primary" />
              </div>
            </div>
  
            <h5 className="card-title text-center mb-4" style={{ 
              fontSize: '18px',
              color: '#2c3e50',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {action === 'POST' ? 'Add New' : 'Update Existing'} Commission
            </h5>
  
            <div className="d-flex flex-column gap-3">
              <div className="form-group">
                <label htmlFor="target" className="form-label" style={{
                  color: '#4a5568',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>Commission Target</label>
                <select
                  id="target"
                  name="target"
                  onChange={handleChange}
                  value={comission.target}
                  className="form-control select-input"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    padding: '10px 15px',
                    boxShadow: 'inset 2px 2px 5px #e2e8f0, inset -2px -2px 5px #ffffff'
                  }}
                >
                  <option value="mandali">Mandali Commission</option>
                  <option value="pandit">Pandit Commission</option>
                </select>
              </div>
  
              <div className="form-group">
                <label htmlFor="commission" className="form-label" style={{
                  color: '#4a5568',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>Commission Value</label>
                <input
                  id="commission"
                  type="number"
                  placeholder="Enter commission value"
                  name="commision"
                  value={comission.commision}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    padding: '10px 15px',
                    boxShadow: 'inset 2px 2px 5px #e2e8f0, inset -2px -2px 5px #ffffff'
                  }}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="type" className="form-label" style={{
                  color: '#4a5568',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>Commission Type</label>
                <select
                  id="type"
                  name="commision_type"
                  onChange={handleChange}
                  value={comission.commision_type}
                  className="form-control select-input"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    padding: '10px 15px',
                    boxShadow: 'inset 2px 2px 5px #e2e8f0, inset -2px -2px 5px #ffffff'
                  }}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
                </select>
              </div>
  
              <button
                className="btn submit-btn"
                onClick={handleSubmit}
                style={{
                  background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '12px 0',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 7px 14px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                {action === 'POST' ? (
                  <span>
                    <FaPlusCircle className="me-2" />
                    Create Commission
                  </span>
                ) : (
                  <span>
                    <FaEdit className="me-2" />
                    Update Commission
                  </span>
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

export default ComissionRange;