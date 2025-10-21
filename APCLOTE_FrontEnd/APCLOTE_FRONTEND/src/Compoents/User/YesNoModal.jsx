import { useState } from "react";
import { createRoot } from "react-dom/client";

export function YesNoModal({ question, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent  bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        <p className="text-lg font-medium mb-4">{question}</p>
        <div className="flex justify-around gap-4">
          <button
            onClick={() => onClose(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
          >
            Yes
          </button>
          <button
            onClick={() => onClose(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

// Utility function to show modal and wait for answer
export function askYesNo(question) {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const handleClose = (answer) => {
      root.unmount(); // unmount the modal
      div.remove();   // remove the container div
      resolve(answer);
    };

    const root = createRoot(div); // React 18+ way
    root.render(<YesNoModal question={question} onClose={handleClose} />);
  });
}
