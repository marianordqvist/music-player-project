interface SliderProps {
  percentage: number;
}

function Slider({ percentage }: SliderProps) {
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
          width: `${percentage}%`,
          height: "5px",
          backgroundColor: "#6ee7b7",
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
          left: `${percentage}%`,
          transform: "translateX(-50%) translateY(-50%)",
          width: "10px",
          height: "10px",
          backgroundColor: "#e4e4e7",
          borderRadius: "50%",
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
          zIndex: 1, 
          background: "transparent", 
        }}
      /> */}
    </div>
  );
}

export default Slider;
