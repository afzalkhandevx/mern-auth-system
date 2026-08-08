import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { backendUrl } = useContext(AppContext);

    const [step, setStep] = useState(1); // 1 = enter email, 2 = enter otp + new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSendOtp = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });

            if (data.success) {
                toast.success(data.message);
                setStep(2);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const onResetPassword = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
                email, otp, newPassword
            });

            if (data.success) {
                toast.success(data.message);
                navigate('/login');
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
                {step === 1 && (
                    <>
                        <h2>Reset Password</h2>
                        <p>Enter your registered email</p>
                        <form onSubmit={onSendOtp}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                Send OTP
                            </button>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2>Enter OTP & New Password</h2>
                        <p>Check your email for the OTP</p>
                        <form onSubmit={onResetPassword}>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                style={{ width: '100%', padding: '10px', marginBottom: '12px', boxSizing: 'border-box' }}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                                Reset Password
                            </button>
                        </form>
                    </>
                )}

                <p style={{ marginTop: '15px' }}>
                    <span
                        style={{ color: '#4f46e5', cursor: 'pointer' }}
                        onClick={() => navigate('/login')}
                    >
                        Back to Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;