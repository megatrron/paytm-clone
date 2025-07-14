import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState();
  const location = useLocation();
  const { receiverId, receiverName } = location.state || {};
  const moneyTransfer = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_LOCALHOST}:${import.meta.env.VITE_API_PORT}/api/v1/account/transfer`,
      {
        to: receiverId,
        amount: Number(amount),
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    alert("Money transfer successful!");
    navigate("/dashboard");
  };
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">A</span>
              </div>
              <h3 className="text-2xl font-semibold">{receiverName}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white cursor-pointer hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  "
                onClick={moneyTransfer}
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
