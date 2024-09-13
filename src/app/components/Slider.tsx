import { useRef } from "react";

function Slider({ percentage }) {
  // const rangeRef = useRef();

  return (
    <div
      className="slider-container"
      style={{ position: "relative", width: "100%" }}
    >
      {/* Progress bar */}
      <div
        className="progress-bar-cover"
        style={{
          width: `${percentage}%`, // Directly set the width to the percentage
          height: "5px", // Example height
          backgroundColor: "#6ee7b7", // Example color for the progress bar
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          borderRadius: "10px",
        }}
      ></div>

      {/* Thumb */}
      <div
        className="thumb"
        style={{
          position: "absolute",
          left: `${percentage}%`, // Set thumb's position to percentage
          transform: "translateX(-50%) translateY(-50%)", // Center the thumb
          width: "10px", // Example size
          height: "10px",
          backgroundColor: "#e4e4e7", // Example thumb color
          borderRadius: "50%", // Make the thumb circular
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.753)",
        }}
      ></div>

      {/* Range input */}
      {/* <input
        type="range"
        ref={rangeRef}
        step="0.01"
        className="range"
        value={percentage}
        onChange={onChange}
        style={{
          width: "100%",
          position: "relative",
          zIndex: 1, // Ensure the input is above the progress bar
          background: "transparent", // Hide the default range styling
        }}
      /> */}
    </div>
  );
}

export default Slider;
