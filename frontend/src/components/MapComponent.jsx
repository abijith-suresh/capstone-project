import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapComponent = ({ address }) => {
  const [mapCenter, setMapCenter] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const API_KEY = "AIzaSyDNE3q1dLpNaw3iLJfKlltX7eSJsVZRqsg"; // Replace with your actual API key
  const GOOGLE_MAPS_LIBRARIES = ["places"];

  // Geocode address to get latitude and longitude
  useEffect(() => {
    const loadGeocoder = () => {
      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            setMapCenter(location); // Set the center of the map
            setMarkerPosition(location); // Set the marker position
          } else {
            console.error("Geocode was not successful: " + status);
          }
        });
      }
    };

    if (isLoaded && address) {
      loadGeocoder();
    }
  }, [address, isLoaded]);

  // Handle map click to open Google Maps at the clicked location
  const handleMapClick = (e) => {
    const { lat, lng } = e.latLng;
    const googleMapsUrl = `https://www.google.com/maps?q=${lat()},${lng()}`;
    window.open(googleMapsUrl, "_blank"); // Opens in a new tab
  };

  // Handle marker click to open Google Maps at the marker location
  const handleMarkerClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${markerPosition.lat()},${markerPosition.lng()}`;
    window.open(googleMapsUrl, "_blank"); // Opens in a new tab
  };

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
      onLoad={() => setIsLoaded(true)}
    >
      <div style={{ width: "100%", height: "400px" }}>
        {mapCenter && markerPosition ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: mapCenter.lat(),
              lng: mapCenter.lng(),
            }}
            zoom={15}
            onClick={handleMapClick} // Add click handler
            options={{
              zoomControl: false, // Disable zoom in/out
              mapTypeControl: false, // Disable satellite/street map toggle
              streetViewControl: false, // Disable street view toggle
              fullscreenControl: false, // Disable fullscreen button
            }}
          >
            {/* Display a marker at the geocoded position */}
            <Marker
              position={{
                lat: markerPosition.lat(),
                lng: markerPosition.lng(),
              }}
              onClick={handleMarkerClick} // Marker click opens Google Maps
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom pin image
                scaledSize: new window.google.maps.Size(40, 40), // Scale the icon
              }}
            />
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </LoadScript>
  );
};

export default MapComponent;
