import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${backendUrl}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.log("PROFILE ERROR 👉", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No user data found
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="bg-white shadow rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          My Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joined On</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/orderdetail")}
            className="flex-1 border py-2 rounded hover:bg-gray-100"
          >
            My Orders
          </button>

          <button
            onClick={logoutHandler}
            className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
