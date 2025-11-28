import React from 'react';

export default function Input({
    label,
    error,
    helpText,
    type = 'text',
    ...props
}) {
    return (
        <div className="form-group">
            {label && <label className="form-label">{label}</label>}
            <input
                type={type}
                className={`form-input ${error ? 'error' : ''}`}
                {...props}
            />
            {error && <div className="form-error">⚠️ {error}</div>}
            {helpText && !error && <div className="form-help">{helpText}</div>}
        </div>
    );
}
