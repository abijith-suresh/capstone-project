import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import logo from '../images/snapserve.svg';

// Mock data - in real app this would come from an API
const mockUsers = [
  { id: 1, name: 'John Doe', status: 'pending' },
  { id: 2, name: 'Jane Smith', status: 'approved' },
  { id: 3, name: 'Mike Johnson', status: 'pending' },
  { id: 4, name: 'Sarah Williams', status: 'approved' },
  { id: 5, name: 'Alex Brown', status: 'pending' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate('/admin/user-details'); 
  };

  const [activeTab, setActiveTab] = useState('all');

  const filteredUsers = mockUsers.filter(user => 
    activeTab === 'all' || user.status === activeTab
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} className="h-8 w-8" />
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Card Container */}
      <div className="bg-white shadow-xl border border-gray-200 rounded-lg">
        <div className="p-6">
          {/* Tabs Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex flex-wrap justify-start md:space-x-4 bg-blue-50 p-2 rounded-md">
              <button
                className={`py-2 px-4 text-sm font-medium text-gray-700 rounded-lg ${
                  activeTab === 'all' ? 'bg-white' : 'hover:bg-indigo-200'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All Users
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium text-gray-700 rounded-lg ${
                  activeTab === 'pending' ? 'bg-white' : 'hover:bg-indigo-200'
                }`}
                onClick={() => setActiveTab('pending')}
              >
                Pending
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium text-gray-700 rounded-lg ${
                  activeTab === 'approved' ? 'bg-white' : 'hover:bg-indigo-200'
                }`}
                onClick={() => setActiveTab('approved')}
              >
                Approved
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Users className="h-5 w-5 text-indigo-400" />
              <span className="text-sm font-medium text-gray-600">
                Total Users: {filteredUsers.length}
              </span>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
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
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-blue-50">
                    <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-700">{user.name}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block text-sm font-medium py-1 px-2 rounded-full ${
                          user.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        className="text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 text-sm py-1 px-3 rounded-md"
                        onClick={handleViewDetails}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
