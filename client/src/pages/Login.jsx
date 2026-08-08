import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Login = () => {
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

    const [state, setState] = useState('Sign Up'); // 'Sign Up' or 'Login'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            axios.defaults.withCredentials = true;

            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/auth/register', {
                    name, email, password
                });

                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/auth/login', {
                    email, password
                });

                if (data.success) {
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/');
                } else {
                    toast.error(data.message);
                }
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
                width: '350px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </h2>

                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div style={{ marginBottom: '12px' }}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '12px' }}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                        />
                    </div>

                    {state === 'Login' && (
                        <p style={{ textAlign: 'right', marginBottom: '12px', fontSize: '14px' }}>
                            <span
                                style={{ color: '#4f46e5', cursor: 'pointer' }}
                                onClick={() => navigate('/reset-password')}
                            >
                                Forgot Password?
                            </span>
                        </p>
                    )}

                    <button type="submit" style={{
                        width: '100%',
                        padding: '10px',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}>
                        {state === 'Sign Up' ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    {state === 'Sign Up' ? (
                        <>Already have an account?{' '}
                            <span
                                style={{ color: '#4f46e5', cursor: 'pointer' }}
                                onClick={() => setState('Login')}
                            >
                                Login here
                            </span>
                        </>
                    ) : (
                        <>Don't have an account?{' '}
                            <span
                                style={{ color: '#4f46e5', cursor: 'pointer' }}
                                onClick={() => setState('Sign Up')}
                            >
                                Sign up
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Login;