import { useState, useEffect } from 'react';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, User, Mail, Phone, Calendar, FileText, Star } from 'lucide-react';

export default function SpecialistDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:9005/api/specialists/id/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  // Handle status update (approve/reject)
  const handleStatusUpdate = async (newStatus) => {
    setIsProcessing(true);
  
    try {
      const response = await fetch(`http://localhost:9005/api/specialists/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }
  
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (newStatus === 'approved') {
        toast.success(`Application approved successfully`, { 
          position: "top-center",
          duration: 3000,
          style: {
            background: "#fff", 
            color: "#000",          
            borderRadius: "10px",   
            padding: "16px",        
            fontSize: "16px",      
          },
        });
      } else if (newStatus === 'rejected') {
        toast.success(`Application rejected successfully`, { 
          position: "top-center",
          duration: 3000,
          style: {
            background: "#fff", 
            color: "#D32F2F",          
            borderRadius: "10px",  
            padding: "16px",        
            fontSize: "16px",       
          },
        });
      }

      
  
      setUser(prevUser => ({
        ...prevUser,
        status: newStatus,
      }));
    } catch (error) {
      toast.error(`Failed to update application status`, { 
        position: "top-center",
        duration: 3000,
        style: {
          background: "#D32F2F",  
          color: "#fff",          
          borderRadius: "10px",   
          padding: "16px",         
          fontSize: "16px",        
        },
      });
      
    } finally {
      setIsProcessing(false);
      navigate('/admin/dashboard');
    }
  };
  

  // Show loading or error messages
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-xl text-gray-500">Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-xl text-red-500">An error occurred: {error}</p>
      </div>
    );
  }

  // Render the user details page
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl bg-gray-100">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="mb-6 text-zinc-600 hover:text-[#191a19] hover:scale-105 active:scale-95 flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </button>

      <div className="grid gap-6">
        {/* Specialist Details Card */}
        <div className="border-0 shadow-xl rounded-lg bg-white">
          <div className="border-b border-zinc-100 bg-white p-4">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-[#10B981]" />
              <h2 className="text-xl text-zinc-800">Specialist Details</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-6">
              {/* Basic Information */}
              <div className="grid gap-4">
                <h3 className="font-semibold text-zinc-800">Basic Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <User className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Full Name</p>
                      <p className="font-medium text-zinc-800">{user.name || "No name available"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <Mail className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Email</p>
                      <p className="font-medium text-zinc-800">{user.email || "No email available"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <Phone className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Phone Number</p>
                      <p className="font-medium text-zinc-800">{user.phoneNumber || "No phone available"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Experience</p>
                      <p className="font-medium text-zinc-800">{user.experience} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <FileText className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Price</p>
                      <p className="font-medium text-zinc-800">{user.price || "No price available"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <Star className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Rating</p>
                      <p className="font-medium text-zinc-800">{user.rating || "No rating available"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200 my-6"></div>

              {/* Bio and Title */}
              <div className="grid gap-4">
                <h3 className="font-semibold text-zinc-800">Bio & Title</h3>
                <div className="p-4 bg-zinc-50 rounded-lg">
                  <p className="font-medium text-zinc-800">{user.title || "No title available"}</p>
                  <p className="text-sm text-zinc-500 mt-2">{user.bio || "No bio available"}</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 my-6"></div>

              {/* Services */}
              <div className="grid gap-4">
                <h3 className="font-semibold text-zinc-800">Services</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {user.services?.map((service) => (
                    <div key={service.id || service} className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                      <p className="text-sm text-zinc-500">{service}</p>
                    </div>
                  )) || <p>No services available</p>}
                </div>
              </div>

              <div className="border-t border-zinc-200 my-6"></div>

              {/* Photos */}
              <div className="grid gap-4">
                <h3 className="font-semibold text-zinc-800">Photos</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {user.photos?.map((photo, index) => (
                    <div key={`${photo}-${index}`} className="border border-zinc-200 rounded-lg overflow-hidden">
                      <img
                        src={photo}
                        alt={`photo-${index}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )) || <p>No photos available</p>}

                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  disabled={isProcessing}
                  className="border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:scale-105 active:scale-95 text-sm py-2 px-4 rounded-md flex items-center"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Application
                </button>
                <button
                  onClick={() => handleStatusUpdate('approved')}
                  disabled={isProcessing}
                  className="border border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:scale-105 active:scale-95 text-sm py-2 px-4 rounded-md flex items-center"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Application
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
