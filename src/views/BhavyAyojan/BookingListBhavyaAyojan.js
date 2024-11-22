import React from 'react';

const BookingListBhavyaAyojan = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Booking List for Bhavya Ayojan</h1>
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
        backgroundColor: '#e7f3ff',
        color: '#444',
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#0066cc',
    },
    message: {
        fontSize: '1.2rem',
        color: '#666',
    },
};

export default BookingListBhavyaAyojan;
