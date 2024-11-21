import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setLoading(true);
        let url = "http://localhost:9005/api/specialists";

       
        if (activeTab !== "all") {
          url = `http://localhost:9005/api/specialists?status=${activeTab}`;
        }

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched specialists data:", data); 
          setUsers(data); 
        } else {
          setErrorMessage("Failed to fetch specialists");
        }
      } catch (error) {
        console.error("Error fetching specialists:", error);
        setErrorMessage("Error fetching specialists");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, [activeTab]); 

  
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:9005/api/specialists/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
       
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
          )
        );
      } else {
        setErrorMessage("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setErrorMessage("Error updating status");
    }
  };

  // Filter users based on activeTab (this is just for rendering the filtered list)
  const filteredUsers = users.filter((user) => {
    return activeTab === "all" || user.status === activeTab;
  });

  console.log("Active Tab:", activeTab); 
  console.log("Filtered Users:", filteredUsers); 

  const handleViewDetails = (id) => {
    navigate(`/admin/specialist-details/${id}`);
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-t from-[#F8FAFC] to-[#E8E8EB] mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl border border-gray-200 rounded-lg p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-wrap justify-start md:space-x-4 bg-[#F8FAFC] p-2 rounded-md w-full md:w-auto">
              {["pending", "approved", "rejected", "all"].map((status) => (
                <button
                  key={status}
                  className={`w-full md:w-auto py-2.5 px-4 text-sm font-medium rounded-lg text-[#1b1b1b] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F2937] 
                    ${activeTab === status
                      ? "bg-gradient-to-r from-[#1F2937] to-[#222c2a] text-[#f1f3f5] shadow-lg hover:bg-gray-100 hover:scale-105 active:scale-95"
                      : "bg-gray-300 text-[#1F2937] hover:bg-gray-400 hover:text-[#27302d] hover:scale-105 active:scale-95"
                    }`}
                  onClick={() => setActiveTab(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} Specialists
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-center py-4 text-gray-500">Loading specialists...</p>
          ) : errorMessage ? (
            <p className="text-center py-4 text-red-500">{errorMessage}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-sm font-medium text-gray-500 text-left">
                      Sr. No
                    </th>
                    <th className="py-4 px-4 text-sm font-medium text-gray-500 text-left">
                      Name
                    </th>
                    <th className="py-4 px-4 text-sm font-medium text-gray-500 text-left">
                      Status
                    </th>
                    <th className="py-4 px-4 text-sm font-medium text-gray-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-[#F8FAFC]"
                    >
                      <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-700">
                        {user.name}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block text-sm font-medium py-1 px-2 rounded-full ${
                            user.status === "approved"
                              ? "bg-[#10B981] text-white"
                              : user.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : user.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              :"bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {user.status
                            ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
                            : "Pending"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          className="text-[#0f0f0f] border border-[#191a19] hover:bg-[#0000]/10 hover:text-[#020202] hover:scale-105 active:scale-95 text-sm py-1 px-3 rounded-md"
                          onClick={() => handleViewDetails(user.id)}
                        >
                          View Details
                        </button>
                       
                        
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
