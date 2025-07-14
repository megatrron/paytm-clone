/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Appbar = ({ name }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <div className="shadow-md h-14 flex justify-between">
      <div className="font-medium flex flex-col justify-center h-full ml-8 text-lg cursor-pointer">
        PayTM App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello {name}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
        <div className="mt-2">
          <Button
            text="Logout"
            variant="tertiary"
            size="mdmd"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};
