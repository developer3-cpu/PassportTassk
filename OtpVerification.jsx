import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const mobileNumber = location.state?.mobileNumber || '';
  
  // Hardcoded OTP as per requirement
  const CORRECT_OTP = '121212';

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    if (value === '' || /^\d+$/.test(value)) {
      setOtp(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate OTP
    if (otp !== CORRECT_OTP) {
      setError('Invalid OTP. Please try again.');
      return;
    }
    
    // Navigate to passport upload page
    navigate('/upload-passport', { state: { mobileNumber, verified: true } });
  };

  // Resend OTP functionality removed as requested

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Verify OTP</h4>
            </div>
            <div className="card-body">
              <p className="mb-3">We've sent an OTP to <strong>{mobileNumber}</strong></p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">Enter OTP</label>
                  <input
                    type="text"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                  />
                  {/* <div className="form-text">Use 121212 as the OTP (hardcoded)</div> */}
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;