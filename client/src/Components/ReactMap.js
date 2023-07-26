import React, { useState, useContext, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { UserContext } from "../Context/UserContext";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

const containerStyle = {
  width: "800px",
  height: "600px",
  border: "2px solid black",
  borderRadius: "15px",
};

//this is the map modal form the new walk modal.
// I want this to be able to set a pin for the new walk location, and then move that location into the new walk modal as the location.

const ReactMap = ({
  mapModal,
  setMapModal,
  onUpdateLocation,
  onSaveLocation,
}) => {
  const { loggedInUser } = useContext(UserContext);
  const [locationGeoCode, setLocationGeocode] = useState({
    lat: null,
    lng: null,
  });

  const url = "https://maps.googleapis.com/maps/api/geocode/json";
  const address = loggedInUser?.location;
  const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const request_url = `${url}?address=${address}&key=${api_key}`;

  const handleMarkerDragEnd = (e) => {
    const { lat, lng } = e.latLng.toJSON();
    setLocationGeocode({ lat, lng }); // Update locationGeoCode state for centering the map
    onUpdateLocation({ lat, lng }); // Send the updated location back to NewWalk.js
  };

  useEffect(() => {
    if (loggedInUser) {
      fetch(request_url)
        .then((response) => response.json())
        .then((data) => {
          const { lat, lng } = data.results[0].geometry.location;
          setLocationGeocode({ lat, lng });
        });
    }
  }, [loggedInUser, request_url]);

  const handleExit = (e) => {
    e.preventDefault();
    setMapModal(!mapModal);
  };

  const center = {
    lat: Number(locationGeoCode.lat),
    lng: Number(locationGeoCode.lng),
  };

  const position = {
    lat: Number(locationGeoCode.lat),
    lng: Number(locationGeoCode.lng),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Function to handle saving the location
  const handleSaveLocation = () => {
    // Call the parent component's callback to save the location
    onSaveLocation({ lat: locationGeoCode.lat, lng: locationGeoCode.lng });
    setMapModal(false);
  };

  return isLoaded ? (
    <MapContainer>
      <ExitDiv>
        <FiX
          onClick={(e) => {
            handleExit(e);
          }}
        />
      </ExitDiv>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <>
          <Marker
            position={position}
            draggable={true}
            onLoad={onLoad}
            onDragEnd={(e) => handleMarkerDragEnd(e)}
          />
        </>
      </GoogleMap>
      <button onClick={handleSaveLocation}>Save Location</button>
    </MapContainer>
  ) : (
    <MapContainer></MapContainer>
  );
};

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 900px;
  height: 700px;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  position: fixed;
  top: 10%;
  right: 20%;
  bottom: 20%;
  left: 20%;
  z-index: 1;
`;

const ExitDiv = styled.div`
  width: 95%;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-end;
  z-index: 2;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default ReactMap;
