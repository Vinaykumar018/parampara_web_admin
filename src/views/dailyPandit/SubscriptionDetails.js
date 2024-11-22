import React from 'react';

const SubscriptionDetails = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Subscription Details</h1>
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
        backgroundColor: '#e8f5e9',
        color: '#333',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#388e3c',
    },
    message: {
        fontSize: '1.2rem',
        color: '#555',
    },
};

export default SubscriptionDetails;
