import { useNavigate } from "react-router-dom";
import { resetApi, resetPasswordApi, verifyOtpApi } from "./api/TodoApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import toast from "react-hot-toast";

const ResetComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    // console.log("Success");
    if (!isOtpSent) {
      const user = {
        email: email,
      };
      resetApi(user)
        .then(() => {
          toast.success("OTP sent to your email");
          setIsOtpSent(true);
        })
        .catch((error) => {
          toast.error("Email not found");
          console.log(error);
        });
    } else if (isOtpSent && !isOtpVerified) {
      const user = {
        email: email,
        otp: otp,
      };
      verifyOtpApi(user)
        .then(() => {
          toast.success("OTP verified");
          setIsOtpVerified(true);
        })
        .catch((error) => {
          toast.error("OTP not found or expired");
          console.log(error);
        });
    } else {
      const user = {
        email: email,
        password: password,
      };
      resetPasswordApi(user)
        .then(() => {
          toast.success("Password changed successfully");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("Something went wrong");
          console.log(error);
        });
    }
  }
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh" }}
    >
      <form className="form" onSubmit={submitHandler}>
        <div className="title">Welcome</div>
        <div className="subtitle mb-3">Let's reset your account!</div>
        <div className="form-group mb-4">
          <input
            className="form-control"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        {isOtpSent && (
          <div className="form-group mb-4">
            <input
              className="form-control"
              name="otp"
              type="password"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}
        {isOtpSent && isOtpVerified && (
          <div className="form-group mb-4">
            <input
              className="form-control"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
          </div>
        )}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ResetComponent;
