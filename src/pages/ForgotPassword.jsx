import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = () => {
        if (!email) {
            setError('Email is required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail()) return;

        setLoading(true);
        try {
            const response = await authAPI.forgotPassword(email);
            toast.success('Password reset link sent!');
            setSubmitted(true);
        } catch (error) {
            const message = error.response?.data?.detail || 'Failed to send reset link. Please try again.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    if (submitted) {
        return (
            <div className="page fade-in">
                <div className="page-content">
                    <div className="card card-glass auth-card">
                        <div className="auth-header">
                            <div className="auth-icon">✉️</div>
                            <h1 className="auth-title">Check Your Email</h1>
                            <p className="auth-subtitle">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                        </div>

                        <div className="alert alert-success">
                            <div>
                                <p className="font-medium mb-0">Email sent successfully!</p>
                                <p className="text-sm mb-0 mt-sm">
                                    Please check your inbox and click the reset link. The link will expire in 30 minutes.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-0">
                                Didn't receive the email?{' '}
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setEmail('');
                                    }}
                                    className="link"
                                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                >
                                    Try again
                                </button>
                            </p>
                        </div>

                        <div className="auth-footer">
                            <Link to="/login" className="link">
                                ← Back to login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page fade-in">
            <div className="page-content">
                <div className="card card-glass auth-card">
                    <div className="auth-header">
                        <div className="auth-icon">🔑</div>
                        <h1 className="auth-title">Forgot Password?</h1>
                        <p className="auth-subtitle">
                            No worries! Enter your email and we'll send you a reset link
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            error={error}
                            helpText="We'll send a password reset link to this email"
                            autoComplete="email"
                        />

                        <Button type="submit" fullWidth loading={loading}>
                            Send Reset Link
                        </Button>
                    </form>

                    <div className="auth-footer">
                        Remember your password?{' '}
                        <Link to="/login" className="link">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
