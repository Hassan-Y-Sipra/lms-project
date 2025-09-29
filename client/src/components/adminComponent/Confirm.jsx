import React from "react";

const Confirm = ({ isOpen, onConfirm, onClose, message = "are you sure for delete this data" }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opicity-40 z-50 ">
        <div className="w-full max-w-md  bg-white p-6 rounded-2xl shadow-lg text-center  ">
          <button
            onClick={onClose}
            className="relative left-50  bottom-5 tetx-red text-3xl cursor-pointer"
          >
            &times;
          </button>
          <p className="text-2xl text-gray -mt-7">{message}</p>
          <div className="flex justify-center gap-4 pt-7">
            <button
              onClick={onConfirm}
              className="px-7 h-10  bg-red-800 text-white rounded-2xl cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-7 h-10  bg-green-700 text-white rounded-2xl cursor-pointer"
            >
              Cancle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
