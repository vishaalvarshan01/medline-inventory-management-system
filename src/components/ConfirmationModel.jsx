import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationModel = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="bg-white text-black border-2 border-solid z-50 p-10 rounded-xl relative"
      >
        <h1 className="mb-10 text-xl">Discard any changes made?</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 mr-4 px-5 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
        >
          <h1 className="text-xl">Yes</h1>
        </button>
        <button
          onClick={onClose}
          className="mt-2 mr-4 px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-md text-white"
        >
          <h1 className="text-xl">Cancel</h1>
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModel;
