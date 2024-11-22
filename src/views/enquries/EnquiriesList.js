import React from 'react';

const EnquiriesList = () => {
  return (
    <div style={styles.container}>
        <h1 style={styles.heading}>Daily Pandit</h1>
        <p style={styles.message}>This service is under development. Stay tuned for updates!</p>
    </div>
);
};

const styles = {
container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff3e0',
    color: '#333',
},
heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#f57c00',
},
message: {
    fontSize: '1.2rem',
    color: '#555',
},
};

export default EnquiriesList;
