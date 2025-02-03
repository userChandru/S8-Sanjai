import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthenticationButton = ({ name, type, isSubmitting, icon, iconr }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    flow: "implicit",
  });

  const handleClick = () => {
    if (name.includes("Student Authentication")) {
      login();
    }
    if (name.includes("Admin Authentication")) {
      navigate("/auth");
    }
  };

  return (
    <button
      type={type}
      disabled={isSubmitting}
      onClick={handleClick}
      className="w-full text-lg flex items-center font-semibold justify-between 
        cursor-pointer rounded-xl bg-[#e8eef6] p-4 px-8 text-gray-700
        shadow-[6px_6px_12px_#c4c9d1,-6px_-6px_12px_#ffffff]
        active:shadow-[inset_6px_6px_12px_#c4c9d1,inset_-6px_-6px_12px_#ffffff]
        transition-all duration-200 hover:bg-[#e3e9f1]"
    >
      <div className="flex items-center justify-center space-x-4">
        <div>{icon}</div>
        <p className="font-medium">{isSubmitting ? "loading" : name}</p>
      </div>
      <div>{iconr}</div>
    </button>
  );
};

AuthenticationButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  isSubmitting: PropTypes.bool,
  icon: PropTypes.node,
  iconr: PropTypes.node,
};

export default AuthenticationButton;
