import React from 'react';

export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    loading = false,
    fullWidth = false,
    disabled = false,
    onClick,
    ...props
}) {
    const baseClass = 'btn';
    const variantClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';
    const widthClass = fullWidth ? 'btn-full' : '';

    const className = [baseClass, variantClass, widthClass].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={className}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <div className="spinner" />}
            {children}
        </button>
    );
}
