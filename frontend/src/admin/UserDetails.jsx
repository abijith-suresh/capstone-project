import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, User, Calendar, Mail, FileText } from 'lucide-react';

const mockUserDetails = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  status: 'pending',
  documents: [
    { 
      type: 'ID Proof', 
      url: 'https://www.pngkey.com/png/detail/233-2332677_ega-png.png',
      uploadDate: '2024-03-10'
    },
    { 
      type: 'Address Proof', 
      url: 'https://www.pngkey.com/png/detail/233-2332677_ega-png.png',
      uploadDate: '2024-03-10'
    },
    { 
      type: 'Certifications', 
      url: 'https://www.pngkey.com/png/detail/233-2332677_ega-png.png',
      uploadDate: '2024-03-10'
    }
  ],
  applicationDate: '2024-03-15',
  additionalInfo: 'Requesting approval for account verification. All required documents have been submitted.'
};

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStatusUpdate = (newStatus) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Application ${newStatus} successfully`);
      navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl bg-gray-100">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="mb-6 text-zinc-600 hover:text-[#191a19]  hover:scale-105 active:scale-95 flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </button>

      <div className="grid gap-6">
        {/* User Details Card */}
        <div className="border-0 shadow-xl rounded-lg bg-white">
          <div className="border-b border-zinc-100 bg-white p-4">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-[#10B981]" />
              <h2 className="text-xl text-zinc-800">User Details</h2>
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
                      <p className="font-medium text-zinc-800">{mockUserDetails.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <Mail className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Email</p>
                      <p className="font-medium text-zinc-800">{mockUserDetails.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Application Date</p>
                      <p className="font-medium text-zinc-800">{mockUserDetails.applicationDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg">
                    <FileText className="h-5 w-5 text-zinc-500" />
                    <div>
                      <p className="text-sm text-zinc-500">Status</p>
                      <p className="font-medium text-zinc-800 capitalize">{mockUserDetails.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200 my-6"></div>

              {/* Uploaded Documents */}
              <div className="grid gap-4">
                <h3 className="font-semibold text-zinc-800">Uploaded Documents</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {mockUserDetails.documents.map((doc, index) => (
                    <div key={index} className="border border-zinc-200 rounded-lg overflow-hidden">
                      <img 
                        src={doc.url} 
                        alt={doc.type}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 bg-white">
                        <h4 className="font-medium text-zinc-800">{doc.type}</h4>
                        <p className="text-sm text-zinc-500">Uploaded on {doc.uploadDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-200 my-6"></div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  disabled={isProcessing}
                  className="border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700  hover:scale-105 active:scale-95 text-sm py-2 px-4 rounded-md flex items-center"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Application
                </button>
                <button
                  onClick={() => handleStatusUpdate('approved')}
                  disabled={isProcessing}
                  className="border border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700  hover:scale-105 active:scale-95 text-sm py-2 px-4 rounded-md flex items-center"
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
