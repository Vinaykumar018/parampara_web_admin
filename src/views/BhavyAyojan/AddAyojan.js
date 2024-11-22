import React from 'react';

const AddAyojan = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Bhavya Ayojan</h1>
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
        backgroundColor: '#fff5e1',
        color: '#444',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#d17a22',
    },
    message: {
        fontSize: '1.2rem',
        color: '#777',
    },
};

export default AddAyojan;
