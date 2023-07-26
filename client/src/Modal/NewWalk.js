import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { UserContext } from "../Context/UserContext";
import ReactMap from "../Components/ReactMap";
import axios from "axios";

//this is the new walk modal, from the home page. it opens a modal with a form that submits to the DB.

const NewWalk = ({ modal, setModal }) => {
  const { loggedInUser } = useContext(UserContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [walk, setWalk] = useState(false);
  const [map, setMap] = useState(false);
  // New state variable to hold the location data from the marker
  const [markerLocation, setMarkerLocation] = useState({
    lat: null,
    lng: null,
  });

  const [formInformation, setFormInformation] = useState({
    userName: loggedInUser.userName,
    image: loggedInUser.image,
    location: "",
    startTime: "",
    duration: "",
    dateTime: new Date().toLocaleString(),
  });
  // Callback function to update the location when the marker changes

  const handleUpdateLocation = (location) => {
    setMarkerLocation(location);
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  //this opens up the new walk modal
  const handleClick = (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  //this opens up the map modal from the new walk modal
  const handleMap = (e) => {
    e.preventDefault();
    setMap(!map);
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    // This is for validation, ensuring that there isn't excess whitespace in our input field
    const value = e.target.value.trim();

    if (value.length > 1) {
      setFormIsValid(true);
      if (name === "startTime") {
        setFormInformation({
          ...formInformation,
          startTime: value,
        });
      } else if (name === "endTime") {
        setFormInformation({
          ...formInformation,
          endTime: value,
        });
      } else if (name === "userName") {
        setFormInformation({
          ...formInformation,
          userName: loggedInUser.userName,
        });
      } else if (name === "image") {
        setFormInformation({
          ...formInformation,
          image: loggedInUser.image,
        });
      }
    }
  };

  // this function is to put a new walk in the DB, and it closes the modal once the form is submitted.
  // const handleNewWalk = (e) => {
  //   e.preventDefault();
  //   const finalLocation =
  //     markerLocation.lat && markerLocation.lng
  //       ? `${markerLocation.lat},${markerLocation.lng}`
  //       : formInformation.location;

  //   const newData = { ...formInformation, location: finalLocation };
  //   console.log("click");
  //   fetch("/walks/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(newData),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Something went wrong!");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status === 201) {
  //         setWalk(!walk);
  //         setModal(!modal);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error: ", error);
  //     });
  // };

  //chatgpt test

  const handleNewWalk = async (e) => {
    e.preventDefault();

    // Get the location address using reverse geocoding
    let locationAddress = await reverseGeocode(
      markerLocation.lat,
      markerLocation.lng,
      apiKey
    );

    // Perform the necessary actions to save the new walk in the database
    // and handle the form submission logic
    fetch("/walks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formInformation,
        location: locationAddress, // Use the location address instead of lat and lng
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 201) {
          setWalk(!walk);
          setModal(!modal);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // Function to handle saving the location in the form
  const handleSaveLocation = (location) => {
    setFormInformation({
      ...formInformation,
      location: `${location.lat},${location.lng}`,
    });
  };

  console.log(markerLocation);

  //reverse geocoding happening here:
  const reverseGeocode = async (lat, lng, apiKey) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        return formattedAddress;
      }
      return "Location not found";
    } catch (error) {
      console.log("Error in reverse geocoding: ", error);
      return "Error in reverse geocoding";
    }
  };

  return (
    <Container>
      <InnerContainer>
        <ExitDiv>
          <FiX onClick={(e) => handleClick(e)} />
        </ExitDiv>
        <LocationInputDiv>
          <LocationInputField
            type="text"
            name="location"
            placeholder="Check the map!"
            onChange={(e) => handleInputChange(e)}
          />
          <MapButton
            onClick={(e) => {
              handleMap(e);
            }}
          >
            Map
          </MapButton>
          {map && (
            <ReactMap
              mapModal={map}
              setMapModal={setMap}
              //for updating location via marker
              onUpdateLocation={handleUpdateLocation}
              onSaveLocation={handleSaveLocation}
            />
          )}
        </LocationInputDiv>
        <Info>
          <InputReqs>Start time: </InputReqs>
          <InputField
            type="time"
            name="startTime"
            placeholder="Start time"
            onChange={(e) => handleInputChange(e)}
          />
        </Info>
        <Info>
          <InputReqs>Duration:</InputReqs>
          <select>
            <option value={0.5}>.5</option>
            <option value={1}>1</option>
            <option value={1.5}>1.5</option>
            <option value={2}>2</option>
            <option value={2.5}>2.5</option>
            <option value={3}>3</option>
            <option value={3.5}>3.5</option>
            <option value={4}>4</option>
          </select>
          <InputReqs>Hours</InputReqs>
        </Info>
        <ExitDiv>
          <button onClick={(e) => handleNewWalk(e)} disabled={!formIsValid}>
            Create Walk
          </button>
        </ExitDiv>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 33.5%;
  border-radius: 10px;
  background-color: whitesmoke;
  z-index: 100;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 10%;
  right: 10%;
  bottom: 10%;
  left: 20%;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin: 1.5;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 10px;
`;
const LocationInputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MapButton = styled.button`
  width: 7rem;
`;

const InputReqs = styled.div`
  font-weight: bold;
`;

const LocationInputField = styled.input`
  padding: 0.3rem;
`;

const InputField = styled.input`
  border-radius: 5px;
`;
const ExitDiv = styled.div`
  width: 95%;
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-end;
  &:hover {
    cursor: pointer;
  }
`;

export default NewWalk;
