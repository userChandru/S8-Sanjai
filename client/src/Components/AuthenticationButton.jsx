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
  };

  return (
    <button
      type={type}
      disabled={isSubmitting}
      onClick={handleClick}
      className="w-full text-lg flex items-center font-semibold justify-between cursor-pointer rounded-2xl bg-indigo-600 p-3 px-10 text-white transition-all duration-200 ease-in-out hover:scale-[0.99]"
    >
      <div className="flex items-center justify-center space-x-2">
        <div>{icon && icon}</div>
        <p>{isSubmitting ? "loading" : name}</p>
      </div>
      <div>{iconr && iconr}</div>
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
