import { useState } from "react";
import axios from "axios";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const signInFunction = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_LOCALHOST}:${import.meta.env.VITE_API_PORT}/api/v1/user/signin`, { email, password });
      setSuccess("Signin successful! Redirecting...");
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Signin failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center bg-gray-300 h-screen">
      <div className="bg-white w-96 h-120 mt-60 rounded-xl pt-12 pl-1.5 flex flex-col gap-1.5">
        <div className="pl-28 -translate-y-3 font-bold text-4xl">Sign In</div>
        <div className="px-7 text-gray-600 -translate-y-2 text-lg text-center">
          Enter your credentials to access your account
        </div>
        <div>
          <InputBox
            placeholder="johndoe@example.com"
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <InputBox
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="px-8 translate-y-2">
          <Button
            variant="primary"
            text="Signin"
            size="lg"
            onClick={signInFunction}
          />
        </div>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        {success && (
          <div className="text-green-500 text-center mt-2">{success}</div>
        )}
        <div className="text-center mt-2 -translate-x-3">
          Don&apos;t have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
      </div>
    </div>
  );
};
