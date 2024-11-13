const ContactPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl bg-white shadow-xl rounded-lg">
      <div className="text-center">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-indigo-900 mb-4">Contact Us</h1>
        <p className="text-lg text-zinc-600 mb-8">
          We are here to help! 
          <br/>If you have any questions or need assistance, feel free to reach out to us.
        </p>
        
        {/* Contact Information */}
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-8 rounded-lg">
          <h2 className="text-xl font-semibold text-indigo-800">Administrator Contact</h2>
          <p className="text-md text-zinc-600 mt-2">
            For assistance, please reach out to our administrator:
          </p>
          <p className="text-lg font-medium text-indigo-700 mt-2">admin@gmail.com</p>
        </div>

        
       
      </div>
    </div>
  );
};

export default ContactPage;
