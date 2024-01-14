import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="border-2 w-[100px] py-2 px-2 rounded-xl hover:bg-gray-200 cursor-pointer">
      <button onClick={() => navigate(-1)} className="mr-1">
        <div className="flex items-center gap-x-2">
          <img
            width="20"
            height="5"
            src="https://img.icons8.com/metro/26/back.png"
            alt="back"
            className="h-5 ml-1"
          />

          <h1 className="text-xl">Back</h1>
        </div>
      </button>
    </div>
  );
};

export default BackButton;
