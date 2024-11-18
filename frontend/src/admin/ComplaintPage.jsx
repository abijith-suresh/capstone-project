import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function ComplaintPage() {
  const [complaints, setComplaints] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchComplaints = async () => {
    try {
      setIsFetching(true);
      const response = await fetch('http://localhost:9007/api/complaints/all-complaints');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched complaints:', data); // Check data structure in the console
        setComplaints(data);
      } else {
        setErrorMessage('Failed to fetch complaints');
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setErrorMessage('Error fetching complaints');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-t from-[#F8FAFC] to-[#E8E8EB] py-6 sm:py-8 lg:py-12 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">

          {errorMessage && (
            <div className="text-red-500 mb-4 font-semibold animate-pulse">
              {errorMessage}
            </div>
          )}

          <div className="overflow-hidden bg-[#F8FAFC] shadow-xl rounded-xl border min-h-screen border-gray-200">
            <div className="px-6 py-5 sm:px-8 bg-gradient-to-r from-[#1F2937] to-gray-800 rounded-t-xl">
              <h3 className="text-2xl font-bold text-[#F8FAFC]">Complaints Dashboard</h3>
              <p className="mt-1 text-sm text-gray-300">
                Review all submitted complaints here.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <ul role="list" className="divide-y divide-gray-200">
                {isFetching ? (
                  <li className="px-4 py-4 text-center text-gray-600 animate-pulse">Loading complaints...</li>
                ) : complaints.length === 0 ? (
                  <li className="px-4 py-4 text-center text-gray-600">No complaints available.</li>
                ) : (
                  complaints.map((complaint) => (
                    <li key={complaint.id} className="px-6 py-4 sm:px-8 transition-all duration-200">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex-shrink-0">
                          <span className="h-12 w-12 rounded-full bg-gray-200 text-black flex items-center justify-center text-lg font-semibold">
                            {complaint.name[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-lg font-medium text-gray-800">{complaint.name}</p>
                          <p className="text-sm text-gray-500">Booking ID: {complaint.booking.bookingId || 'N/A'}</p>
                        </div>
                        <button
                          onClick={() => handleViewDetails(complaint)}
                          className="text-[#1F2937] border border-[#1F2937] hover:bg-[#464948] hover:text-white  hover:scale-105 active:scale-95 text-sm py-1 px-3 rounded-lg transition-all duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal for Viewing Full Booking Details */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-[#F8FAFC] rounded-lg shadow-lg max-w-lg w-full p-6 animate-scale-up">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">Complaint Details</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="mt-4">
                <p className="text-lg font-medium text-gray-800">Name: {selectedComplaint.name}</p>
                <p className="mt-2 font-semibold text-gray-700">Message: {selectedComplaint.message}</p>  
                <p className="mt-2 font-semibold text-gray-700">Booking ID: {selectedComplaint.booking.bookingId}</p>
                <p className="mt-2 text-gray-500">Email: {selectedComplaint.email}</p> 
                <p className="mt-2 text-gray-500">Customer Name: {selectedComplaint.booking.customer.name}</p>
                <p className="mt-2 text-gray-500">Specialist Name: {selectedComplaint.booking.specialist.name}</p>
                <p className="mt-2 text-gray-500">Appointment Time: {selectedComplaint.booking.appointmentTime}</p>
                <p className="mt-2 text-gray-500">Service: {selectedComplaint.booking.service}</p>
                <p className="mt-2 text-gray-500">Price: {selectedComplaint.booking.price}</p>
               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
