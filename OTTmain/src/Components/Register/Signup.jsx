import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios
import style from "./signup.module.css";

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [inputType, setInputType] = useState('phone'); // Default to 'phone'
  const [inputValue, setInputValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResending, setIsResending] = useState(false); // State to handle resend OTP

  const handleInputChange = (e) => {
    let value = e.target.value;

    // For phone number, restrict input to digits and 10 characters max
    if (inputType === 'phone') {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setInputValue(value);
      }
    } else {
      setInputValue(value); // No restrictions for email
    }
  };

  const sendOtp = async () => {
    if (inputValue) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/resend-otp/', {
          [inputType]: inputValue, // Either phone or email
        });

        if (response.status === 200) {
          setOtpSent(true);
          console.log(`OTP sent to ${inputValue}`);
        } else {
          alert('Failed to send OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error during OTP sending:', error);
        alert('Error occurred while sending OTP. Please check the entered information and try again.');
      }
    } else {
      alert('Please enter a valid phone number or email address');
    }
  };

  const handleOtpChange = (value, index) => {
    // Allow only digits in the OTP input fields
    if (/^\d*$/.test(value)) {
      let otpArray = [...otp];
      otpArray[index] = value;
      setOtp(otpArray);
    }
  };

  const verifyOtp = async () => {
    if (otp.join('').length === 4) {
      console.log('Verifying OTP...');

      // Prepare data to send for OTP verification
      const verificationData = {
        inputType,  // Either 'phone' or 'email'
        inputValue, // The phone number or email address entered
        otp: otp.join(''), // The 4-digit OTP entered
      };

      try {
        setIsRegistering(true);
        // Call the OTP verification API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/verify-otp/', verificationData);
        
        if (response.status === 200) {
          alert('OTP verified successfully!'); // Notify the user
          console.log('OTP verified successfully:', response.data);

          // Now proceed with the registration using the same data
          const registrationResponse = await axios.post('http://127.0.0.1:8000/api/register/', {
            inputType,
            inputValue,
          });

          if (registrationResponse.status === 201) {
            alert('Registration successful!'); // Notify the user
            console.log('Registration successful:', registrationResponse.data);

            // Redirect to the home page
            navigate('/'); // Redirect to the home page (adjust the route as necessary)
          } else {
            alert('Failed to register. Please try again.');
          }
        } else {
          alert('Failed to verify OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error during OTP verification:', error);
        alert(error.response?.data?.message || 'Error occurred during OTP verification. Please try again later.');
      } finally {
        setIsRegistering(false);
      }
    } else {
      alert('Please enter the full OTP');
    }
  };

  const resendOtp = async () => {
    if (inputValue) {
      try {
        setIsResending(true);
        const response = await axios.post('http://127.0.0.1:8000/api/resend-otp/', {
          [inputType]: inputValue, // Either phone or email
        });

        if (response.status === 200) {
          alert('OTP resent successfully!');
          console.log(`OTP resent to ${inputValue}`);
        } else {
          alert('Failed to resend OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error during OTP resending:', error);
        alert('Error occurred while resending OTP. Please check the entered information and try again.');
      } finally {
        setIsResending(false);
      }
    } else {
      alert('Please enter a valid phone number or email address');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.signupContainer}>
        <div className={style.formSection}>
          <h2>Sign Up</h2>
          {!otpSent ? (
            <div>
              <label>Enter your Phone Number or Email</label>
              <div className={style.inputWrapper}>
                <input
                  type={inputType === 'phone' ? 'tel' : 'email'}
                  placeholder={inputType === 'phone' ? 'Phone Number' : 'Email Address'}
                  value={inputValue}
                  onChange={handleInputChange}
                  className={style.inputField}
                />
                <button
                  onClick={() => setInputType(inputType === 'phone' ? 'email' : 'phone')}
                  className={style.toggleBtn}
                >
                  {inputType === 'phone' ? 'Switch to Email' : 'Switch to Phone'}
                </button>
              </div>
              <button onClick={sendOtp} className={style.otpBtn}>
                Send OTP
              </button>
            </div>
          ) : (
            <div>
              <h3>Enter OTP</h3>
              <div className={style.otpInputs}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className={style.otpField}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                ))}
              </div>
              <button onClick={verifyOtp} className={style.loginBtn} disabled={isRegistering}>
                {isRegistering ? 'Registering...' : 'Verify & Register'}
              </button>
              <button onClick={resendOtp} className={style.resendBtn} disabled={isResending}>
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>
          )}
        </div>

        <div className={style.welcomeSection}>
          <h2>WELCOME BACK!</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
