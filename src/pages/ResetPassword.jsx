import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    useEffect(() => {
        validateToken();
    }, [token]);

    const validateToken = async () => {
        if (!token) {
            toast.error('Invalid reset link');
            setValidating(false);
            return;
        }

        try {
            const response = await authAPI.validateToken(token);
            if (response.valid) {
                setTokenValid(true);
                setUserEmail(response.email);
            } else {
                toast.error(response.message);
                setTokenValid(false);
            }
        } catch (error) {
            toast.error('Failed to validate reset link');
            setTokenValid(false);
        } finally {
            setValidating(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.newPassword) {
            newErrors.newPassword = 'Password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        const levels = [
            { strength: 0, label: 'Very Weak', color: '#ef4444' },
            { strength: 1, label: 'Weak', color: '#f59e0b' },
            { strength: 2, label: 'Fair', color: '#eab308' },
            { strength: 3, label: 'Good', color: '#84cc16' },
            { strength: 4, label: 'Strong', color: '#22c55e' },
            { strength: 5, label: 'Very Strong', color: '#10b981' },
        ];

        return levels[strength];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await authAPI.resetPassword(token, formData.newPassword);
            toast.success(response.message);
            setResetSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            const message = error.response?.data?.detail || 'Failed to reset password. Please try again.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: null,
            });
        }
    };

    if (validating) {
        return (
            <div className="page">
                <div className="page-content">
                    <div className="card card-glass auth-card">
                        <div className="text-center">
                            <div className="spinner" style={{ margin: '0 auto', width: '40px', height: '40px' }} />
                            <p className="mt-md text-gray-600">Validating reset link...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!tokenValid) {
        return (
            <div className="page fade-in">
                <div className="page-content">
                    <div className="card card-glass auth-card">
                        <div className="auth-header">
                            <div className="auth-icon" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                                ⚠️
                            </div>
                            <h1 className="auth-title">Invalid Reset Link</h1>
                            <p className="auth-subtitle">
                                This password reset link is invalid or has expired
                            </p>
                        </div>

                        <div className="alert alert-error">
                            <div>
                                <p className="font-medium mb-0">Link expired or already used</p>
                                <p className="text-sm mb-0 mt-sm">
                                    Password reset links expire after 30 minutes. Please request a new one.
                                </p>
                            </div>
                        </div>

                        <Link to="/forgot-password">
                            <Button fullWidth>Request New Reset Link</Button>
                        </Link>

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

    if (resetSuccess) {
        return (
            <div className="page fade-in">
                <div className="page-content">
                    <div className="card card-glass auth-card">
                        <div className="auth-header">
                            <div className="auth-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                                ✓
                            </div>
                            <h1 className="auth-title">Password Reset Successful!</h1>
                            <p className="auth-subtitle">
                                Your password has been changed successfully
                            </p>
                        </div>

                        <div className="alert alert-success">
                            <div>
                                <p className="font-medium mb-0">All set!</p>
                                <p className="text-sm mb-0 mt-sm">
                                    Redirecting you to login page...
                                </p>
                            </div>
                        </div>

                        <Link to="/login">
                            <Button fullWidth>Go to Login</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const passwordStrength = getPasswordStrength(formData.newPassword);

    return (
        <div className="page fade-in">
            <div className="page-content">
                <div className="card card-glass auth-card">
                    <div className="auth-header">
                        <div className="auth-icon">🔒</div>
                        <h1 className="auth-title">Reset Password</h1>
                        <p className="auth-subtitle">
                            Setting new password for <strong>{userEmail}</strong>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.newPassword}
                            autoComplete="new-password"
                        />

                        {formData.newPassword && (
                            <div className="mb-lg" style={{ marginTop: '-0.75rem' }}>
                                <div style={{
                                    height: '4px',
                                    background: '#e5e7eb',
                                    borderRadius: '2px',
                                    overflow: 'hidden',
                                    marginBottom: '0.5rem'
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${(passwordStrength.strength / 5) * 100}%`,
                                        background: passwordStrength.color,
                                        transition: 'all 0.3s ease'
                                    }} />
                                </div>
                                <p className="text-sm" style={{ color: passwordStrength.color, margin: 0 }}>
                                    Strength: {passwordStrength.label}
                                </p>
                            </div>
                        )}

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.confirmPassword}
                            autoComplete="new-password"
                        />

                        <Button type="submit" fullWidth loading={loading}>
                            Reset Password
                        </Button>
                    </form>

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
