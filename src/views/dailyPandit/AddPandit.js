import React from 'react';

const AddPandit = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Add Pandit</h1>
            <p style={styles.message}>This feature is under development. Stay tuned for updates!</p>
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
        backgroundColor: '#fce4ec',
        color: '#333',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#e91e63',
    },
    message: {
        fontSize: '1.2rem',
        color: '#555',
    },
};

export default AddPandit;
