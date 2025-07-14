import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(`${import.meta.env.VITE_API_LOCALHOST}:${import.meta.env.VITE_API_PORT}/api/v1/user/me`, {
          headers: {
            token: token,
          },
        });
        setBalance(result.data.balance);
        setName(result.data.name);
        setUserId(result.data._id);
        localStorage.setItem("userId", result.data._id); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Appbar name={name} />
      <Balance value={balance} id={userId} />
      <Users />
    </div>
  );
};
