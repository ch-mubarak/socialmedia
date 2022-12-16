import "./Verify.css";
import email from "../../img/email.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { useEffect } from "react";
import { resendVerification, verify } from "../../api/AuthRequest";
import { useState } from "react";
import { useSelector } from "react-redux";

const override = {
  display: "block",
  margin: "0 auto",
};
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);
  const userId = searchParams.get("account");
  const token = searchParams.get("token");

  async function verifyUser() {
    setLoading(true);
    try {
      const response = await verify(userId, token);
      setLoading(false);
      setIsVerified(response.data.isVerified);
      setMessage(response.data.message);
    } catch (err) {
      setLoading(false);
      setMessage(err.response.data.message);
    }
  }
  const handleResendVerification = async () => {
    try {
      setLoading(true);
      await resendVerification(user._id);
      setLoading(false);
      navigate("/verify");
    } catch (err) {
      setLoading(false);
      console.log(err);
      setMessage(err.response.data.message);
    }
  };
  useEffect(() => {
    if (userId && token) {
    //   verifyUser();
    }
  }, []);
  return (
    <div className="mail-verify">
      <img src={email} alt="" />
      {!(userId || token) && (
        <p>
          A verification link has been sent to you mail. Please check your mail
          and verify your account
        </p>
      )}
      {message && <p>{message}</p>}
      {userId && token && (
        <FadeLoader color="orange" cssOverride={override} loading={loading} />
      )}

      <div>
        {isVerified && <button className="button button-logout">Login</button>}
        <button
          className="button button-verify"
          onClick={handleResendVerification}
        >
          send again
        </button>
      </div>
    </div>
  );
};

export default Verify;
