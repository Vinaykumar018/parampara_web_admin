import React, { useEffect, useState } from 'react';
import { GiPathDistance } from 'react-icons/gi';
import axios from 'axios';

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
        'http://localhost:3000/api/commission',
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
      alert('Failed to fetch commission data.');
    }
  };

  const handleSubmit = async () => {
    if (!comission.commision) {
      alert('Please enter a valid commission value.');
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
        alert('Commission created successfully!');
        fetchCommission(); // Refresh data
      } else if (action === 'PUT') {
        const commissionId = comission.target === 'pandit' ? panditComissionID : mandaliComissionID;
        const updatedComission = {
          ...comission,
          comissionId: commissionId
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
        alert('Commission updated successfully!');
        fetchCommission(); // Refresh data
      }
    } catch (error) {
      console.error('Error submitting commission:', error);
      alert('Failed to submit commission data.');
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
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-6 col-12 mb-4">
          <div className="card shadow-sm rounded-3 hover-shadow-lg">
            <div className="card-body text-white rounded-3">
              <div className="d-flex justify-content-center mb-3">
                <GiPathDistance size={40} className="text-dark" />
              </div>

              <h5 className="card-title text-center text-dark" style={{ fontSize: '14px' }}>
                {action === 'POST' ? 'Add' : 'Update'} Commission
              </h5>

              <div className="d-flex flex-column gap-3">
                <select
                  name="target"
                  onChange={handleChange}
                  value={comission.target}
                  className="form-control"
                >
                  <option value="mandali">Mandali Commission</option>
                  <option value="pandit">Pandit Commission</option>
                </select>

                <input
                  type="number"
                  placeholder="Enter commission"
                  name="commision"
                  value={comission.commision}
                  onChange={handleChange}
                  className="form-control"
                />

                <select
                  name="commision_type"
                  onChange={handleChange}
                  value={comission.commision_type}
                  className="form-control"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>

                <button
                  className="btn btn-danger"
                  onClick={handleSubmit}
                >
                  {action === 'POST' ? 'Create' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Display current commissions */}
        <div className="col-xl-8 col-lg-8 col-md-6 col-12 mb-4">
          <div className="card shadow-sm rounded-3">
            <div className="card-body">
              <h5 className="card-title text-dark">Current Commissions</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">Pandit Commission</h6>
                      {panditData ? (
                        <>
                          <p>Value: {panditData.commision}</p>
                          <p>Type: {panditData.commision_type}</p>
                        </>
                      ) : (
                        <p>No pandit commission set</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">Mandali Commission</h6>
                      {mandaliData ? (
                        <>
                          <p>Value: {mandaliData.commision}</p>
                          <p>Type: {mandaliData.commision_type}</p>
                        </>
                      ) : (
                        <p>No mandali commission set</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComissionRange;