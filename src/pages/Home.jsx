import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="page fade-in">
            <div className="page-content" style={{ maxWidth: '800px' }}>
                <div className="card card-glass" style={{ padding: 'var(--spacing-2xl)' }}>
                    <div className="text-center">
                        <div className="auth-icon" style={{ margin: '0 auto var(--spacing-lg)' }}>
                            🔐
                        </div>
                        <h1 className="auth-title" style={{ fontSize: 'var(--font-size-3xl)' }}>
                            Password Reset Service
                        </h1>
                        <p className="auth-subtitle" style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-2xl)' }}>
                            Secure and easy password management for your account
                        </p>
                    </div>

                    <div style={{ display: 'grid', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)' }}>
                        <div className="card" style={{ padding: 'var(--spacing-lg)', background: 'var(--gray-50)' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>✨ Features</h3>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                <li>Secure password reset via email</li>
                                <li>Time-limited reset tokens (30 minutes)</li>
                                <li>Password strength indicator</li>
                                <li>Email notifications</li>
                                <li>Modern, responsive design</li>
                            </ul>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <div className="card" style={{
                                    padding: 'var(--spacing-lg)',
                                    background: 'var(--gradient-primary)',
                                    color: 'white',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>👤</div>
                                    <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>Register</h3>
                                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                                        Create a new account
                                    </p>
                                </div>
                            </Link>

                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <div className="card" style={{
                                    padding: 'var(--spacing-lg)',
                                    background: 'var(--gradient-primary)',
                                    color: 'white',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>🔓</div>
                                    <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>Login</h3>
                                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                                        Sign in to your account
                                    </p>
                                </div>
                            </Link>

                            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                                <div className="card" style={{
                                    padding: 'var(--spacing-lg)',
                                    background: 'var(--gradient-primary)',
                                    color: 'white',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>🔑</div>
                                    <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>Forgot Password</h3>
                                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', opacity: 0.9 }}>
                                        Reset your password
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="text-center mt-lg" style={{ paddingTop: 'var(--spacing-xl)', borderTop: '1px solid var(--gray-200)' }}>
                        <p className="text-sm text-gray-600">
                            Test User: <strong>test@example.com</strong> | Password: <strong>Test@1234</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
