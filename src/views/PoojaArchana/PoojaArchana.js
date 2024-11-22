import React from 'react';

const PoojaArchana = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Pooja & Archana</h1>
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
        backgroundColor: '#f0f4f8',
        color: '#222',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1.2rem',
        color: '#666',
    },
};

export default PoojaArchana;
