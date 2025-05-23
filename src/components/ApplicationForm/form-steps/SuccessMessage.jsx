import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <IoMdCheckmarkCircleOutline className="text-6xl text-cyan-600 mb-4" />
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">
        Application Submitted!
      </h2>
      <p className="mb-6">
        Thank you for applying. We will get back to you soon.
      </p>
      <Button
        className="bg-cyan-800 hover:bg-cyan-700 text-white text-lg mt-6"
        onClick={() => navigate("/dashboard")}
      >
        Go to MyDashboard
      </Button>
    </div>
  );
};

export default SuccessMessage;
