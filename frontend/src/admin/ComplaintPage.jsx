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
        console.log('Fetched complaints:', data);
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
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-3xl font-semibold text-gray-800">Complaint Details</h3>
        <button onClick={closeModal} className="text-gray-600 hover:text-gray-800 text-3xl">
          <span>&times;</span>
        </button>
      </div>
      
      <div className="mt-6 space-y-4">
        <p className="text-lg text-gray-800 font-medium">Name: <span className="font-semibold">{selectedComplaint.name}</span></p>

        <p className="text-lg text-gray-700 font-medium">Booking ID: <span className="font-semibold">{selectedComplaint.booking.bookingId}</span></p>

        <div className="p-4 mt-4 border border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-700 text-lg font-serif">
            <strong className="font-semibold">Message:</strong> {selectedComplaint.message}
          </p>
        </div>

        <p className="text-gray-600 text-sm"><strong>Email:</strong> {selectedComplaint.email}</p>
        <p className="text-gray-600 text-sm"><strong>Customer Name:</strong> {selectedComplaint.booking.customer.name}</p>
        <p className="text-gray-600 text-sm"><strong>Specialist Name:</strong> {selectedComplaint.booking.specialist.name}</p>
        <p className="text-gray-600 text-sm"><strong>Appointment Time:</strong> {selectedComplaint.booking.appointmentTime}</p>
        <p className="text-gray-600 text-sm"><strong>Service:</strong> {selectedComplaint.booking.service}</p>
        <p className="text-gray-600 text-sm"><strong>Price:</strong> ${selectedComplaint.booking.price}</p>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
