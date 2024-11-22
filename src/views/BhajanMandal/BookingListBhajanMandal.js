import React from 'react';

const BookingListBhajanMandal = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Booking List for Bhajan Mandal</h1>
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
        backgroundColor: '#f7e0a5',
        color: '#444',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#d1923d',
    },
    message: {
        fontSize: '1.2rem',
        color: '#666',
    },
};

export default BookingListBhajanMandal;
