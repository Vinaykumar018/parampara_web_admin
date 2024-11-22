import React from 'react';

const VirtualServices = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Virtual Service</h1>
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
        backgroundColor: '#e3f2fd',
        color: '#333',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1976d2',
    },
    message: {
        fontSize: '1.2rem',
        color: '#555',
    },
};

export default VirtualServices;
