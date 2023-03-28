import React from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

const LocationPin = () => (
  <div className="pin">
    <p className="pin-text">🚩</p>
  </div>
);

const location = {
  address: "St John's, NL",
  lat: 47.5548731,
  lng: -52.7551276,
};

const Map = () => (
  <div className="map">
    <GoogleMap>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA0aJNWbCSoHUarXg8v5cZO3SrBr7IOrVI" }}
        defaultCenter={location}
        defaultZoom={13}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </GoogleMap>
  </div>
);

const GoogleMap = styled.div`
  width: 100%;
  height: 70vh;
  border-radius: 20px;
`;

export default Map;
