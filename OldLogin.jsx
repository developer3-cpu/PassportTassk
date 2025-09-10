// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Login = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleMobileNumberChange = (e) => {
//     const value = e.target.value;
//     // Only allow digits
//     if (value === '' || /^\d+$/.test(value)) {
//       setMobileNumber(value);
//       setError('');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate mobile number (exactly 10 digits)
//     if (mobileNumber.length !== 10) {
//       setError('Please enter a valid 10-digit mobile number');
//       return;
//     }
    
//     // Navigate to OTP verification page
//     navigate('/verify-otp', { state: { mobileNumber } });
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h4 className="mb-0">Login Screen</h4>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
//                   <input
//                     type="text"
//                     className={`form-control ${error ? 'is-invalid' : ''}`}
//                     id="mobileNumber"
//                     placeholder="Enter 10-digit mobile number"
//                     value={mobileNumber}
//                     onChange={handleMobileNumberChange}
//                     maxLength={10}
//                   />
//                   {error && <div className="invalid-feedback">{error}</div>}
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">Send OTP</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;