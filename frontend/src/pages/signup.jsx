import { useState } from "react";
import axios from "axios";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const signUpFunction = async () => {
    setError("");
    setSuccess("");
    try {
      console.log(import.meta.env.VITE_API_LOCALHOST);
      console.log(import.meta.env.VITE_API_PORT);
      await axios.post(`${import.meta.env.VITE_API_LOCALHOST}:${import.meta.env.VITE_API_PORT}/api/v1/user/signup`, { name, email, password });
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center bg-gray-300 h-screen">
      <div className="bg-white w-96 h-140 mt-60 rounded-xl pt-12 pl-1.5 flex flex-col gap-1.5">
        <div className="pl-28 -translate-y-3 font-bold text-4xl">Sign Up</div>
        <div className="px-7 text-gray-600 -translate-y-2 text-lg text-center">
          Enter your information to create an account
        </div>
        <div>
          <InputBox
            placeholder="John Doe"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            text="Signup"
            size="lg"
            onClick={signUpFunction}
          />
        </div>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        {success && (
          <div className="text-green-500 text-center mt-2">{success}</div>
        )}
        <div className="text-center mt-2 -translate-x-3">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};
