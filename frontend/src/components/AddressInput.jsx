import { useState } from "react";

const AddressInput = ({ formData, setFormData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change, trigger suggestions
  const handleInputChange = (e) => {
    const query = e.target.value;

    // Update the formData with the input value
    setFormData((prev) => ({
      ...prev,
      address: query, // update address as user types
    }));

    // If query length is at least 3, fetch predictions
    if (query.length >= 3) {
      setIsLoading(true);

      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: query, types: ["address"] },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
          setIsLoading(false);
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  // Handle selection from suggestions
  const handleSelectAddress = (address) => {
    setFormData((prev) => ({
      ...prev,
      address: address.description, // Set the full address from the selected suggestion
    }));
    setSuggestions([]); // Clear the suggestions after selection
  };

  return (
    <div className="md:col-span-2">
      <label
        htmlFor="address"
        className="block text-sm font-medium text-gray-900"
      >
        Address
      </label>
      <div className="mt-2 relative">
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
        />
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto z-10 shadow-lg">
            {isLoading ? (
              <li className="p-2 text-gray-500">Loading...</li>
            ) : (
              suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectAddress(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.description}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddressInput;
