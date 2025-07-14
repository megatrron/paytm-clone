/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip on mount
    }
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_LOCALHOST}:${import.meta.env.VITE_API_PORT}/api/v1/user/bulk`,
        {
          params: { filter },
          headers: {
            token: token,
          },
        }
      );
      setUsers(response.data.users);
    };
    fetchUsers();
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {filter && users.map((user) => <User key={user._id} user={user} />)}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate(); 
  const redirectToSendMoney = () => {
    navigate("/send", {
      state: {
        receiverId: user._id,
        receiverName: user.name
      }
    });
  };
  return (
    <div className="flex justify-between py-2 border-b">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.name[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div className="font-semibold">{user.name}</div>
          <div className="text-xs text-gray-500">{user._id}</div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full mr-24">
        <Button
          text="Send Money"
          variant="tertiary"
          size="mdmd"
          onClick={redirectToSendMoney}
        />
      </div>
    </div>
  );
}
