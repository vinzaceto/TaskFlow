import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";
import AuthBackground from "./AuthBackground";

export default function Signup({ onSwitchToLogin }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch (err) {
            console.error(err);
            setError("Failed to create an account: " + err.message);
        }

        setLoading(false);
    }

    return (
        <div className="auth-container">
            <AuthBackground />
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Join TaskFlow today to get organized.</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" ref={emailRef} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" ref={passwordRef} placeholder="Create a password" required />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" ref={passwordConfirmRef} placeholder="Confirm your password" required />
                    </div>
                    <button disabled={loading} type="submit" className="auth-btn primary-btn">
                        Sign Up
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <span onClick={onSwitchToLogin}>Log In</span>
                </div>
            </div>
        </div>
    );
}
