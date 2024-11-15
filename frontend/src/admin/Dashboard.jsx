import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

// Mock data
const mockUsers = [
  { id: 1, name: 'John Doe', status: 'pending' },
  { id: 2, name: 'Jane Smith', status: 'approved' },
  { id: 3, name: 'Mike Johnson', status: 'pending' },
  { id: 4, name: 'Sarah Williams', status: 'approved' },
  { id: 5, name: 'Alex Brown', status: 'pending' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const filteredUsers = mockUsers.filter(
    (user) => activeTab === 'all' || user.status === activeTab
  );

  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/admin/user-details/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl border border-gray-200 rounded-lg p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-wrap justify-start md:space-x-4 bg-[#F8FAFC] p-2 rounded-md w-full md:w-auto">
              {['all', 'pending', 'approved'].map((status) => (
                <button
                  key={status}
                  className={`w-full md:w-auto py-2.5 px-4 text-sm font-medium rounded-lg text-[#1b1b1b] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F2937] 
          ${activeTab === status
                      ? 'bg-gradient-to-r from-[#1F2937] to-[#222c2a] text-[#f1f3f5] shadow-lg hover:bg-gray-100 hover:scale-105 active:scale-95'
                      : 'bg-gray-300 text-[#1F2937] hover:bg-gray-400 hover:text-[#27302d] hover:scale-105 active:scale-95'}`}
                  onClick={() => setActiveTab(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} Specialists
                </button>
              ))}
            </div>
          </div>


          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-4 text-sm font-medium text-gray-500 text-left">Sr. No</th>
                  <th className="py-4 px-4 text-sm font-medium text-gray-500 text-left">Name</th>
                  <th className="py-4 px-4 text-sm font-medium text-gray-500 text-left">Status</th>
                  <th className="py-4 px-4 text-sm font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-100 hover:bg-[#F8FAFC]"
                  >
                    <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-700">{user.name}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block text-sm font-medium py-1 px-2 rounded-full ${user.status === 'approved'
                            ? 'bg-[#10B981] text-white'
                            : user.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        className="text-[#0f0f0f] border border-[#191a19] hover:bg-[#0000]/10 hover:text-[#020202]  hover:scale-105 active:scale-95 text-sm py-1 px-3 rounded-md"
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
        </motion.div>
      </div>
    </div>
  );
}
