import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Calendar, Grid } from 'lucide-react';
import '../../styles/auth/Auth.css';

const years = [1, 2, 3, 4];
const classes = ['CSA','CSB','CSC','CSBS','ECA','ECB','EEE','EB','EV','ME'];

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    year: '',
    class: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'College email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.year) newErrors.year = 'Please select your year';
    if (!formData.class) newErrors.class = 'Please select your class';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // enforce college domain on client as well
    const allowedDomain = '@mec.ac.in';
    if (!formData.email.toLowerCase().endsWith(allowedDomain)) {
      setErrors({ email: `Only ${allowedDomain} email addresses are allowed` });
      return;
    }

    setIsLoading(true);
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          year: formData.year,
          class: formData.class,
          password: formData.password
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ submit: data.error || 'Sign up failed. Please try again.' });
        return;
      }

      // success
      const { user, token } = data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role || 'student');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/homepage');
    } catch (err) {
      console.error(err);
      setErrors({ submit: 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1>Create Account</h1>
            <p>Register for MECalendar with your college credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className={errors.fullName ? 'error' : ''}
                />
              </div>
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">College Email / ID</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your college email or ID"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="year">Year</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" size={20} />
                  <select id="year" name="year" value={formData.year} onChange={handleInputChange} className={`signup-select ${errors.year ? 'error' : ''}`}>
                    <option value="">Select year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                {errors.year && <span className="error-message">{errors.year}</span>}
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="class">Class</label>
                <div className="input-wrapper">
                  <Grid className="input-icon" size={20} />
                  <select id="class" name="class" value={formData.class} onChange={handleInputChange} className={`signup-select ${errors.class ? 'error' : ''}`}>
                    <option value="">Select class</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {errors.class && <span className="error-message">{errors.class}</span>}
              </div>
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className={errors.password ? 'error' : ''}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repeat your password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            {errors.submit && <div className="submit-error">{errors.submit}</div>}

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? <div className="loading-spinner"></div> : 'Sign Up'}
            </button>

            <div className="signup-link">
              <span>Already have an account? </span>
              <Link to="/login">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
