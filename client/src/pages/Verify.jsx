import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");

      if (!orderId) return;

      try {
        const res = await axios.get(
          `${backendUrl}/api/order/verify?success=${success}&orderId=${orderId}`
        );

        // ✅ ONLY on success
        if (res.data.success) {
          navigate("/orderdetail");
        }
      } catch (error) {
        // ❌ no navigation on error
        console.log("Verification failed");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-medium">Verifying payment...</p>
    </div>
  );
};

export default Verify;
