import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Home = () => {
    const navigate = useNavigate();
    const { userData, isLoggedin, setIsLoggedin, setUserData, backendUrl, getUserData } = useContext(AppContext);

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            if (data.success) {
                setIsLoggedin(false);
                setUserData(null);
                toast.success('Logged out');
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
            if (data.success) {
                toast.success(data.message);
                navigate('/verify-email');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (!isLoggedin) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>You are not logged in.</p>
                <button onClick={() => navigate('/login')}>Go to Login</button>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#f3f4f6'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                width: '400px',
                textAlign: 'center'
            }}>
                <h2>Welcome, {userData ? userData.name : 'User'} 👋</h2>
                <p>Email: {userData ? userData.email : '...'}</p>
                <p>
                    Status: {userData && userData.isAccountVerified ? (
                        <span style={{ color: 'green' }}>Verified ✅</span>
                    ) : (
                        <span style={{ color: 'orange' }}>Not Verified ⚠️</span>
                    )}
                </p>

                {userData && !userData.isAccountVerified && (
                    <button onClick={sendVerificationOtp} style={{
                        margin: '10px 0',
                        padding: '8px 16px',
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}>
                        Verify Email
                    </button>
                )}

                <br />

                <button onClick={logout} style={{
                    marginTop: '15px',
                    padding: '8px 16px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;