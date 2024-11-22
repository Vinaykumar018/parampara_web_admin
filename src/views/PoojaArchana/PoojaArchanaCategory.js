import React from 'react';

const PoojaArchanaCategory = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Pooja & Archana Categories</h1>
            <p style={styles.message}>We're working on this page. Stay tuned!</p>
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
        backgroundColor: '#f8f9fa',
        color: '#333',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1.2rem',
        color: '#555',
    },
};

export default PoojaArchanaCategory;
