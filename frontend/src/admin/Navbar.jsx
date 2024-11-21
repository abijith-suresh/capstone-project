import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/snapserve.svg';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('specialists'); 

  useEffect(() => {
    if (location.pathname.includes('complaints')) {
      setActiveTab('complaints'); 
    } else {
      setActiveTab('specialists'); 
    }
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'specialists') {
      navigate('/admin/dashboard'); 
    } else if (tab === 'complaints') {
      navigate('/admin/complaints'); 
    }
    else if (tab === 'log out') {
      navigate('/admin/logout'); 
    }
   
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-transparent backdrop-blur-lg text-white">
      {/* Logo and Title */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/admin')}>
        <img src={logo} alt="SnapServe Logo" className="h-8 w-8 drop-shadow-lg " />
        <h1 className="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#1F2937] to-[#396455] ">
          Admin Dashboard
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 relative">
        {['specialists', 'complaints','log out'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`relative font-bold px-4 py-2 transition-all ${
              activeTab === tab ? 'text-gray-700' : 'text-gray-700 hover:text-[#10B981]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#10B981] rounded"
              />
            )}
          </button>
          
        ))}
        
      </div>
    </nav>
  );
}
