import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";
import AuthBackground from "./AuthBackground";

export default function Login({ onSwitchToSignup }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, googleSignIn } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
        } catch (err) {
            console.error(err);
            setError("Failed to log in: " + err.message);
        }

        setLoading(false);
    }

    async function handleGoogleSignIn() {
        try {
            setError("");
            setLoading(true);
            await googleSignIn();
        } catch (err) {
            console.error(err);
            setError("Failed to log in with Google: " + err.message);
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <AuthBackground />
            <div className="auth-card">
                <div className="auth-header">
                    <h1>TaskFlow</h1>
                    <p>Welcome back! Please enter your details.</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" ref={emailRef} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" ref={passwordRef} placeholder="••••••••" required />
                    </div>
                    <button disabled={loading} type="submit" className="auth-btn primary-btn">
                        Log In
                    </button>
                </form>

                <div className="auth-divider">
                    <span>or continue with</span>
                </div>

                <button
                    disabled={loading}
                    onClick={handleGoogleSignIn}
                    className="auth-btn google-btn"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google logo"
                        className="google-icon"
                    />
                    <span>Sign in with Google</span>
                </button>

                <div className="auth-footer">
                    Don't have an account? <span onClick={onSwitchToSignup}>Sign up for free</span>
                </div>
            </div>
        </div>
    );
}
