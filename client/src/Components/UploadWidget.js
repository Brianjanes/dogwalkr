// import React from "react";
// import { useEffect, useRef } from "react";
// import styled from "styled-components";

// const UploadWidget = ({userName}) => {
//   const cloudinaryRef = useRef();
//   const widgetRef = useRef();

//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;
//     widgetRef.current = cloudinaryRef.current.createUploadWidget(
//       {
//         cloud_name: "dddop4rit",
//         upload_preset: "zgis0gma",
//       },
//       function (error, result) {
//         console.log(result);
//         if (result.success === true) {
//           fetch(`/updateProfile/${userName}`, {
//             method: "Patch",
//             headers: {
//                 Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(result.info.),
//           });
//         }
//       }
//     );
//   }, []);

//   return <Button onClick={() => widgetRef.current.open()}>Upload photo</Button>;
// };

// const Button = styled.button`
// `;

// export default UploadWidget;
