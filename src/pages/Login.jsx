import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await authAPI.login(formData.email, formData.password);
            toast.success(response.message);
            navigate('/');
        } catch (error) {
            const message = error.response?.data?.detail || 'Login failed. Please try again.';
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

    return (
        <div className="page fade-in">
            <div className="page-content">
                <div className="card card-glass auth-card">
                    <div className="auth-header">
                        <div className="auth-icon">🔐</div>
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            error={errors.email}
                            autoComplete="email"
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.password}
                            autoComplete="current-password"
                        />

                        <div className="text-right mb-0 mt-sm">
                            <Link to="/forgot-password" className="link text-sm">
                                Forgot password?
                            </Link>
                        </div>

                        <div className="mt-lg">
                            <Button type="submit" fullWidth loading={loading}>
                                Sign In
                            </Button>
                        </div>
                    </form>

                    <div className="auth-footer">
                        Don't have an account?{' '}
                        <Link to="/register" className="link">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
