import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  // label should float if field is focused OR has a value
  const isActive = isFocused || password.length > 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthChecked(true);
      if (user) {
        if (window.location.pathname === '/login') {
          navigate('/home');
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email || !password) {
      setError('Please enter email and password');
      setIsSubmitting(false);
      return;
    }

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError(
        error.code === 'auth/wrong-password'
          ? 'Incorrect password'
          : error.code === 'auth/user-not-found'
          ? 'No user found with this email'
          : error.code === 'auth/invalid-email'
          ? 'Invalid email address'
          : error.code === 'auth/too-many-requests'
          ? 'Account temporarily locked - reset password or try later'
          : 'Failed to sign in. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authChecked) {
    return <div className="loading">Checking authentication status...</div>;
  }

  return (
    <div className="app-container">
      <div className="left-panel">
        
      </div>
      <div className="right-panel">
        <div className="page-container">
          <h1><b>K4 Service Portal</b></h1>
          <p>Login</p>
          <form onSubmit={handleEmailLogin}>
            <div className="form-group" >
  <label htmlFor="email">Username</label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value.trim())}
    placeholder="Username"
    autoComplete="username"
  />
</div>
      <div className="form-group">
      <div className="password-input-wrapper">
        <label 
          htmlFor="password"
          className={`floating-label ${isActive ? "active" : ""}`}
        >
          PASSWORD
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="current-password"
          disabled={isSubmitting}
        />
   <button
  type="button"
  className="password-toggle"
  tabIndex={-1}
  onClick={() => setShowPassword((v) => !v)}
  aria-label={showPassword ? "Hide password" : "Show password"}
  disabled={isSubmitting}
>
  {showPassword ? (
    <svg width="28" height="26" viewBox="0 0 24 24" fill="none" stroke="#616161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Eye shape - filled with grey, matching the image */}
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" fill="#616161" stroke="#616161"/>

      {/* Larger inner circle - White fill for the iris area */}
      <circle cx="12" cy="12" r="5.5" fill="white" stroke="none" />

      {/* Smaller circle inside - Dark grey/black pupil to match the image */}
      <circle cx="12" cy="12" r="2.5" fill="#616161" stroke="#616161" />
</svg>

  ) : (
    <svg width="28" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" fill="#616161" stroke="#616161"/>
  <circle cx="12" cy="12" r="5.5" fill="white" stroke="none" />

      {/* Smaller circle inside - Dark grey/black pupil to match the image */}
      <circle cx="12" cy="12" r="2.5" fill="#616161" stroke="#616161" />
  
  <line x1="4" y1="4" x2="20" y2="20" stroke="#424242" stroke-width="2" stroke-linecap="round"/>
  <line x1="5.4" y1="4" x2="21.4" y2="20" stroke="white" stroke-width="2" stroke-linecap="round"/>
  
</svg>


  )}
</button>
  </div>
</div>

            <div className="form-row">
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isSubmitting}
                  />
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="forgot-password"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Logging in..' : 'LOGIN'}
            </button>

            {error && <p className="error" role="alert">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
