import React from 'react';

const AddMandal = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Bhajan Mandal</h1>
            <p style={styles.message}>This page is under development. Stay tuned for updates!</p>
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
        backgroundColor: '#f1e0c6',
        color: '#333',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#a57c4b',
    },
    message: {
        fontSize: '1.2rem',
        color: '#777',
    },
};

export default AddMandal;
