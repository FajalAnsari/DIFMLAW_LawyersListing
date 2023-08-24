import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const LawyerLocationMap = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    handleSearch();
  }, [props.city]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${props.city}&key=AIzaSyAsS5A6zN5BFeOd6x-aTeIB88pxczDv2vI`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setSelectedLocation({ lat, lng });
      }
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  const containerStyle = {
    height: "170px",
    width: "100%",
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAsS5A6zN5BFeOd6x-aTeIB88pxczDv2vI",
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedLocation}
      zoom={13}
      onLoad={onMapLoad}
    >
      {selectedLocation && <Marker position={selectedLocation} />}
    </GoogleMap>
  );
};

export default LawyerLocationMap;
