import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const EmailVerify = () => {
    const navigate = useNavigate();
    const { backendUrl, getUserData } = useContext(AppContext);
    const [otp, setOtp] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

            if (data.success) {
                toast.success(data.message);
                getUserData();
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div style={{
            display: 'flex',
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
                width: '350px',
                textAlign: 'center'
            }}>
                <h2>Verify Your Email</h2>
                <p>Enter the 6-digit OTP sent to your email</p>
                <form onSubmit={onSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginBottom: '12px', boxSizing: 'border-box' }}
                    />
                    <button type="submit" style={{
                        width: '100%',
                        padding: '10px',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}>
                        Verify Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailVerify;