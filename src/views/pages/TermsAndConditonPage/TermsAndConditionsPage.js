import React from 'react';

const TermsAndConditions = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Terms and Conditions</h1>
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
        backgroundColor: '#f5f5f5',
        color: '#333',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#3f51b5',
    },
    message: {
        fontSize: '1.2rem',
        color: '#555',
    },
};

export default TermsAndConditions;
