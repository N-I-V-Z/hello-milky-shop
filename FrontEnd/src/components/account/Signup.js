import React, { useEffect, useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { message } from "antd";
import config from "../config/config";
import { useTranslation } from 'react-i18next';

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const { t } = useTranslation();

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",
  });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [isSignupAttempted, setIsSignupAttempted] = useState(false);
  const [confirmOTP, setConfirmOTP] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function initializeRecaptcha() {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              // No need to call onSignup here, it will be called separately
            },
            "expired-callback": () => {
              toast.error("Recaptcha hết hạn. Hãy thử lại.");
              window.recaptchaVerifier.clear();
              initializeRecaptcha();
            },
          },
          auth
        );
      } else {
        window.recaptchaVerifier.render();
      }
    }
    initializeRecaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handlePhoneChange = (phone) => {
    setFormData({
      ...formData,
      phone,
    });
    setErrors({
      ...errors,
      phone: "",
    });
  };

  const handleSendOTP = () => {
    if (loading || isSignupAttempted) return;
    onSignup();
  };

  async function onSignup() {
    if (isSignupAttempted) return;
    setIsSignupAttempted(true);
    setLoading(true);

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + formData.phone;

    await signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success(`${t('sendOTPSuscessfully')}`);
      })
      .catch((error) => {
        console.error(`${t('sendOTPError')}`, error);
        setLoading(false);
        setIsSignupAttempted(false);
        if (error.code === "auth/quota-exceeded") {
          toast.error("Quá lượt gửi OTP. Hãy thử lại vào ngày mai.");
        } else {
          toast.error("Gửi OTP thất bại. Hãy thử lại.");
        }
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async () => {
        setLoading(false);
        setConfirmOTP(true);
        toast.success(`${t('confirmOTPSuccessfully')}`);
        // Proceed with signup after OTP is verified
        await completeSignup();
      })
      .catch(() => {
        setLoading(false);
        toast.error(`${t('OTPConfirmationFailed.TryAgain.')}`);
      });
  }

  const handleSubmit = async () => {
    const newErrors = {};

    // Validate name field
    if (!formData.name.trim()) {
      newErrors.name = "Hãy nhập tên của bạn.";
    }

    // Validate phone number field
    if (!formData.phone.trim()) {
      newErrors.phone = "Hãy nhập số điện thoại.";
    } else if (!/^\d{9,11}$/i.test(formData.phone)) {
      newErrors.phone = `${t('phoneNumberDoesNotMatch')}`;
    }

    // Validate password field
    if (!formData.password.trim()) {
      newErrors.password = "Hãy nhập mật khẩu.";
    } else if (formData.password.length < 6) {
      newErrors.password = `${t('passwordMustContainAtLeast6Characters.')}`;
    }

    // Validate confirm password field
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Hãy xác nhận mật khẩu.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = `${t('confirmationPasswordDoesNotMatch')}`;
    }

    // Validate terms accepted
    if (!formData.termsAccepted) {
      newErrors.termsAccepted =
        "Hãy đọc và đồng ý với điều khoản của chúng tôi.";
    }
    if (
      !formData.name ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.termsAccepted
    ) {
      message.error(`${t('pleaseCompleteAllInformation!')}`);
      setErrors(newErrors);
      return;
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      for (const error in newErrors) {
        message.error(newErrors[error]);
      }
      return;
    }
    const checkPhone = await axios.post(
      `${config.API_ROOT}/api/v1/auth/checkPhoneNumber`,
      {
        PhoneNumber: formData.phone,
      }
    );

    if (checkPhone.data.err === 0) {
      message.warning(`${t('phoneNumberHasBeenSignedUp')}`);
    } else {
      handleSendOTP();
    }
  };

  const completeSignup = async () => {
    try {
      const response = await axios.post(
        `${config.API_ROOT}/api/v1/auth/register`,
        {
          UserName: formData.name,
          PhoneNumber: formData.phone,
          Password: formData.password,
        }
      );

      if (response.data.err === 0) {
        const login = await axios.post(`${config.API_ROOT}/api/v1/auth/login`, {
          PhoneNumber: formData.phone,
          Password: formData.password,
        });
        if (login.data.err === 0) {
          navigate(`/LoginSuccess/${response.data.token}`);
        } else {
          message.error(`${t('unregistered')}`);
        }
      } else {
        message.error(`${t('phoneNumberHasBeenSignedUp')}`);
      }
    } catch (error) {
      console.error(error);
      message.error("Error signing up. Please try again.");
    }
  };

  const loginGoogle = async (response) => {
    try {
      const res = await axios.post(
        `${config.API_ROOT}/api/v1/auth/google-login`,
        {
          token: response.credential,
        }
      );
      const checkEmail = await axios.post(
        `${config.API_ROOT}/api/v1/user/getUserByEmail`,
        {
          Email: res.data.email,
        }
      );
      if (checkEmail.data.data.Status === true) {
        navigate(`/login-email/${res.data.email}`);
      } else {
        message.error(`${t('yourAccountHasBeenLocked')}`);
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleLoginFailure = (response) => {
    console.error("Login Failed:", response);
  };

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center align-items-center h-100 sign-up-container"
    >
      <Toaster toastOptions={{ duration: 4000 }} />

      <div id="recaptcha-container"></div>
      <MDBCard
        className="signup-card mx-auto mb-5 p-5 shadow-5"
        style={{ maxWidth: "550px", marginTop: "50px", marginBottom: "200px" }}
      >
        <MDBCardBody className="p-5">
          <img src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FScreenshot%202024-07-09%20114412.png?alt=media&token=c9c39100-0525-4281-bfe7-b3cbc3783184" alt="LogoMilky" className="logo-sign-up-thinh" />

          <h2 className="fw-bold mb-5 text-center">{t('createANewAccount')}</h2>
          <div className="mb-4">
            <MDBInput
              wrapperClass="input-wrapper-sign"
              placeholder={t('name')}
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <PhoneInput
              country={"vn"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClass="input-wrapper-sign"
              placeholder={t('phoneNumber')}
            />
          </div>

          <div className="mb-4 position-relative">
            <MDBInput
              wrapperClass="input-wrapper-sign"
              placeholder={t('password')}
              id="password"
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <MDBIcon
              icon={passwordVisible ? "eye-slash" : "eye"}
              size="lg"
              className="password-toggle-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </div>

          <div className="mb-4 position-relative">
            <MDBInput
              wrapperClass="input-wrapper-sign"
              placeholder={t('enterThePassword')}
              id="confirmPassword"
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <MDBIcon
              icon={confirmPasswordVisible ? "eye-slash" : "eye"}
              size="lg"
              className="password-toggle-icon"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            />
          </div>

          <div className="checkbox-wrapper mb-4">
            <label htmlFor="flexCheckDefault" className="checkbox-label-tri">
              <input
                type="checkbox"
                id="flexCheckDefault"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="form-check-input"
              />
              {t('agreeWith')}
              <Link to="/termofuse" className="terms-link">
                {t('termsOfUse')}
              </Link>
              {t('atHelloMilkyShop2')}
            </label>
          </div>
          {isSignupAttempted && showOTP && !confirmOTP && (
            <div className="overlay">
              <div className="OTP-box">
                <div className="icon-container">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="otp-label">
                  {t('enterOTP')}
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="otp-container"
                />
                <button
                  onClick={() => {
                    onOTPVerify();
                  }}
                  disabled={loading}
                  className="btn btn-success m-4"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>{t('confirm')}</span>
                </button>
              </div>
            </div>
          )}

          <button
            className="signup-button"
            type="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            <span className="button-text">{t('signUp')}</span>
          </button>

          <div className="text-center social-buttons">
            <p>{t('or')}</p>

            <div className="google-button-signup">
              <GoogleOAuthProvider clientId={config.CLIENT_ID}>
                <GoogleLogin
                  onSuccess={loginGoogle}
                  onError={handleLoginFailure}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
