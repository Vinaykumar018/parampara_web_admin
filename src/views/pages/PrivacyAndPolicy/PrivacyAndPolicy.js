import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { FaBell } from 'react-icons/fa';

const socket = io('http://34.131.10.8:3000'); // Connect to backend WebSocket server

const PrivacyAndPolicy = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        // Listen for notifications
        socket.on('notification', (data) => {
            setNotifications((prev) => [...prev, data.message]);
        });

        return () => {
            socket.disconnect(); // Cleanup on unmount
        };
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Privacy and Policy</h1>
            <p style={styles.message}>This page is under development. Stay tuned for updates!</p>

            {/* Notification Button */}
            <div 
                style={styles.notificationContainer} 
                onClick={() => setShowNotifications(!showNotifications)}
            >
                <FaBell style={styles.icon} />
                {notifications.length > 0 && (
                    <span style={styles.badge}>{notifications.length}</span>
                )}
            </div>

            {/* Notification Dropdown */}
            {showNotifications && (
                <div style={styles.notificationBox}>
                    <h3 style={styles.notificationTitle}>Notifications</h3>
                    {notifications.length === 0 ? (
                        <p style={styles.noNotifications}>No new notifications</p>
                    ) : (
                        <ul style={styles.notificationList}>
                            {notifications.map((msg, index) => (
                                <li key={index} style={styles.notificationItem}>{msg}</li>
                            ))}
                        </ul>
                    )}
                    <button 
                        style={styles.clearButton} 
                        onClick={() => {
                            setNotifications([]);
                            setShowNotifications(false);
                        }}
                    >
                        Clear All
                    </button>
                </div>
            )}
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
        position: 'relative',
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
    notificationContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: '24px',
        color: '#ff5722',
    },
    badge: {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: 'red',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        borderRadius: '50%',
        padding: '5px 8px',
    },
    notificationBox: {
        position: 'fixed',
        bottom: '70px',
        right: '20px',
        width: '250px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        padding: '10px',
    },
    notificationTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
    },
    notificationList: {
        listStyle: 'none',
        padding: '0',
        maxHeight: '150px',
        overflowY: 'auto',
    },
    notificationItem: {
        padding: '5px 10px',
        borderBottom: '1px solid #ddd',
    },
    noNotifications: {
        textAlign: 'center',
        color: '#777',
    },
    clearButton: {
        width: '100%',
        backgroundColor: '#ff5722',
        color: '#fff',
        padding: '8px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default PrivacyAndPolicy;
